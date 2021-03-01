import { Component, AfterContentInit } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { distinctUntilChanged, switchMap, startWith, map } from 'rxjs/operators';
import { SearchBase, SearchComponent } from '@appbaseio/searchbase';
import { MatSelectionListChange } from '@angular/material/list';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterContentInit {
  index = 'gitxplore-app';
  url = 'https://@arc-cluster-appbase-demo-6pjy6z.searchbase.io';
  credentials = 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61';

  suggestions: Observable<any[]>;

  searchBase: SearchBase;
  searchComponent: SearchComponent;
  filterComponent: SearchComponent;
  resultComponent: SearchComponent;



  constructor() {
    // Create searchbase instance
    this.searchBase = new SearchBase({
      index: this.index,
      url: this.url,
      credentials: this.credentials
    });


   // Register search component => To render the suggestions
    this.searchComponent = this.searchBase.register('search-component', {
      dataField: ['name', 'description', 'name.raw', 'fullname', 'owner', 'topics']
    });

    // Register a component to filter languages with empty value
    this.searchBase.register('filter-languages', {
      dataField: 'language',
      value: [],
      customQuery: () => ({
        query: {
          bool: {
            must_not: [
              {
                match: {
                  'language.keyword': ""
                }
              }
            ]
          }
        },
      })
    })

    // Register filter component with dependency on search component
    this.filterComponent = this.searchBase.register('language-filter', {
      type: 'term',
      dataField: 'language.keyword',
      aggregationSize: 10,
      size: 0,
      react: {
        and: ['filter-languages', 'search-component']
      },
    });

    // Register result component with react dependency on search and filter component => To render the results
    this.resultComponent = this.searchBase.register('result-component', {
      dataField: 'name',
      react: {
        and: ['search-component', 'language-filter']
      },
      defaultQuery: () => ({
        track_total_hits: true
      })
    });
  }



  ngAfterContentInit() {
    // Fetch initial results
    this.resultComponent.triggerDefaultQuery();
    // Fetch initial filter options
    this.filterComponent.triggerDefaultQuery();
  }
  handleInput(e) {
    // Set the value to fetch the suggestions
    this.setSuggestions(e.target.value);
  };

  handleKeyDown(e) {
    // Fetch the results
    if (e.key === 'Enter') {
      e.preventDefault();
      this.searchComponent.triggerCustomQuery();
    }
  }
  handleOptionSelect(selectedOption: MatAutocompleteSelectedEvent) {
    this.searchComponent.triggerCustomQuery();
  }
  handleSelection(selectedOptions : MatSelectionListChange) {
    this.filterComponent.setValue(selectedOptions.options.map(o => o.value), {
      triggerCustomQuery: true,
      triggerDefaultQuery: false,
      stateChanges: false,
    });
  }

  setSuggestions(value) {
    if(!value) {
      this.searchComponent.setValue('', {
        triggerDefaultQuery: false,
        triggerCustomQuery: false,
      });
    } else {
        // Update suggestions when value gets changed
        this.suggestions = of(value).pipe(
          startWith(''),
          distinctUntilChanged(),
          switchMap(val => {
            this.searchComponent.setValue(val, {
              triggerDefaultQuery: false,
              triggerCustomQuery: false,
            });
            return from(this.searchComponent.triggerDefaultQuery())
            .pipe(
              map(() => this.searchComponent.suggestions))
          })
        )
      }
  }

}
