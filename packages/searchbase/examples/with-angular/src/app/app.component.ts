import { Component, AfterContentInit } from '@angular/core';
import { SearchBase, SearchComponent } from '@appbaseio/searchbase';
import { of, Observable, from } from 'rxjs';
import { distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  index = 'gitxplore-app';
  url = 'https://appbase-demo-ansible-abxiydt-arc.searchbase.io';
  credentials = 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61';

  showFilters: boolean;
  isMobile: boolean;

  searchBase: SearchBase;

  searchComponent: SearchComponent;
  filterComponent: SearchComponent;
  resultComponent: SearchComponent;
  // A list of suggestions
  suggestions: Observable<any[]>;

  constructor() {
    // Create searchbase instance
    this.searchBase = new SearchBase({
      index: this.index,
      url: this.url,
      credentials: this.credentials
    });

    // Register search component => To render the auto-suggestions
    this.searchComponent = this.searchBase.register('search-component', {
      dataField: [
        {
          field: 'description',
          weight: 1
        },
        {
          field: 'description.keyword',
          weight: 1
        },
        {
          field: 'description.search',
          weight: 0.1
        },
        {
          field: 'language',
          weight: 2
        },
        {
          field: 'language.keyword',
          weight: 2
        },
        {
          field: 'language.search',
          weight: 0.2
        },
        {
          field: 'name',
          weight: 5
        },
        {
          field: 'name.keyword',
          weight: 5
        },
        {
          field: 'name.search',
          weight: 0.5
        },
        {
          field: 'owner',
          weight: 1
        },
        {
          field: 'owner.keyword',
          weight: 1
        },
        {
          field: 'owner.search',
          weight: 0.1
        }
      ],
      includeFields: [
        'name',
        'description',
        'owner',
        'fullname',
        'language',
        'topics'
      ],
      size: 5,
      // To clear the filter values when search query gets changed
      clearOnQueryChange: true
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
      value: '',
      react: {
        and: ['search-component', 'filter-languages']
      }
    });

    // Register result component with react dependency on search and filter components
    this.resultComponent = this.searchBase.register('result-component', {
      dataField: 'name',
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
    // Fetch initial filter options
    this.filterComponent.triggerDefaultQuery();
    // Fetch initial results
    this.resultComponent.triggerDefaultQuery();
  }

  // Method to set the suggestions
  setSuggestions(value) {
    if (!value) {
      this.searchComponent.setValue('', {
        triggerDefaultQuery: true,
        triggerCustomQuery: true
      });
      this.suggestions = of(this.searchComponent.suggestions);
    } else {
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

  // To fetch the suggestions
  handleInput(e) {
    this.setSuggestions(e.target.value);
  }

  handleOptionSelect(selectedOption: MatAutocompleteSelectedEvent) {
    this.searchComponent.setValue(selectedOption.option.value, {
      triggerCustomQuery: true, // to update results
      triggerDefaultQuery: true // to update suggestions
    });
  }

  handleSelection() {
    // Update results when language changes
    this.filterComponent.triggerCustomQuery();
  }

  handleKeyDown(e) {
    // Fetch the results
    e.preventDefault();
    this.searchComponent.triggerCustomQuery();
  }
}
