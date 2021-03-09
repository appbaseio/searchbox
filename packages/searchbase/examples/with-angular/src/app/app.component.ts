import { Component } from '@angular/core';
import { SearchBase } from '@appbaseio/searchbase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  index = 'gitxplore-app';
  url = 'https://appbase-demo-ansible-abxiydt-arc.searchbase.io';
  credentials = 'a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61';


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
