import {
  Component,
  AfterContentInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { SearchBase, SearchComponent } from '@appbaseio/searchbase';
import { PageEvent } from '@angular/material/paginator';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterContentInit {
  index = 'gitxplore-app';
  url = 'https://appbase-demo-ansible-abxiydt-arc.searchbase.io';
  credentials = 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61';

  suggestions: Observable<any[]>;
  searchQuery: string;
  showFilters: boolean;
  isMobile: boolean;

  searchBase: SearchBase;
  searchComponent: SearchComponent;
  filterComponent: SearchComponent;
  resultComponent: SearchComponent;

  @ViewChild('results') results;

  constructor() {
    // Create searchbase instance
    this.searchBase = new SearchBase({
      index: this.index,
      url: this.url,
      credentials: this.credentials
    });

    // Register search component => To render the suggestions
    this.searchComponent = this.searchBase.register('search-component', {
      // Note: we're not using dataField in client because we have set it in appbase.io dashboard
      // dataField: [
      //   {
      //     field: 'description',
      //     weight: 1
      //   },
      //   {
      //     field: 'description.keyword',
      //     weight: 1
      //   },
      //   {
      //     field: 'description.search',
      //     weight: 0.1
      //   },
      //   {
      //     field: 'language',
      //     weight: 2
      //   },
      //   {
      //     field: 'language.keyword',
      //     weight: 2
      //   },
      //   {
      //     field: 'language.search',
      //     weight: 0.2
      //   },
      //   {
      //     field: 'name',
      //     weight: 5
      //   },
      //   {
      //     field: 'name.keyword',
      //     weight: 5
      //   },
      //   {
      //     field: 'name.search',
      //     weight: 0.5
      //   },
      //   {
      //     field: 'owner',
      //     weight: 1
      //   },
      //   {
      //     field: 'owner.keyword',
      //     weight: 1
      //   },
      //   {
      //     field: 'owner.search',
      //     weight: 0.1
      //   }
      // ],
      includeFields: [
        'name',
        'description',
        'owner',
        'fullname',
        'language',
        'topics'
      ],
      clearOnQueryChange: true,
      size: 5
    });

    // Register a component to filter languages with empty value
    this.searchBase.register('filter-languages', {
      dataField: 'language',
      value: '',
      customQuery: () => ({
        query: {
          bool: {
            must_not: [
              {
                match: {
                  'language.keyword': ''
                }
              }
            ]
          }
        }
      })
    });

    // Register filter component with dependency on search component
    this.filterComponent = this.searchBase.register('language-filter', {
      type: 'term',
      dataField: 'language.keyword',
      aggregationSize: 10,
      size: 0,
      value: [],
      react: {
        and: ['filter-languages', 'search-component']
      }
    });

    // Register result component with react dependency on search and filter component => To render the results
    this.resultComponent = this.searchBase.register('result-component', {
      dataField: 'title',
      react: {
        and: ['search-component', 'language-filter']
      },
      from: 0,
      size: 10,
      includeFields: ['name', 'description', 'url', 'avatar', 'stars'],
      defaultQuery: () => ({
        track_total_hits: true
      })
    });

    this.isMobile = window.innerWidth <= 765;
    this.showFilters = !this.isMobile;
  }

  ngAfterContentInit() {
    // Fetch initial results
    this.resultComponent.triggerDefaultQuery();
    // Fetch initial filter options
    this.filterComponent.triggerDefaultQuery();
    // Scroll to top when results change
    this.resultComponent.subscribeToStateChanges(() => {
      this.results.nativeElement.scrollTop = 0;
    }, 'results');
  }

  handleInput(e) {
    // Set the value to fetch the suggestions
    this.setSuggestions(e.target.value);
  }

  handleKeyDown(e) {
    // Fetch the results
    e.preventDefault();
    this.searchQuery = this.searchComponent.value;
    this.searchComponent.triggerCustomQuery();
  }

  handleOptionSelect(selectedOption: MatAutocompleteSelectedEvent) {
    this.searchComponent.setValue(selectedOption.option.value, {
      triggerCustomQuery: true,
      triggerDefaultQuery: true
    });
    this.searchQuery = selectedOption.option.value;
  }

  handleSelection() {
    // Update results when language changes
    this.filterComponent.triggerCustomQuery();
  }

  setSuggestions(value) {
    if (!value) {
      this.searchComponent.setValue('', {
        triggerDefaultQuery: true,
        triggerCustomQuery: true
      });
      this.suggestions = of(this.searchComponent.suggestions);
    }
    // Update suggestions when value gets changed
    this.suggestions = of(value).pipe(
      distinctUntilChanged(),
      switchMap(val => {
        this.searchComponent.setValue(val, {
          triggerDefaultQuery: false,
          triggerCustomQuery: false
        });
        return from(this.searchComponent.triggerDefaultQuery()).pipe(
          map(() => this.searchComponent.suggestions)
        );
      })
    );
  }

  handlePageChange(page: PageEvent) {
    this.resultComponent.setFrom(page.pageIndex * page.pageSize, {
      triggerCustomQuery: false,
      triggerDefaultQuery: true
    });
  }

  clearFilter(type: string) {
    if (type === 'language') {
      this.filterComponent.setValue(undefined, {
        triggerCustomQuery: true,
        triggerDefaultQuery: false
      });
    } else if (type === 'search') {
      this.searchQuery = '';
      this.setSuggestions('');
    }
  }
}
