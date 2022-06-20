import { Component } from '@angular/core';
import { SearchBase } from '@appbaseio/searchbase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  index = 'git-explore-2022';
  url = 'https://appbase-demo-ansible-abxiydt-arc.searchbase.io';
  credentials = 'b509481af6df:0708b82a-e98e-4884-935e-2bb0e61a82e1';

  searchBase: SearchBase;

  constructor() {
    // Create searchbase instance
    this.searchBase = new SearchBase({
      index: this.index,
      url: this.url,
      credentials: this.credentials
    });
  }
}
