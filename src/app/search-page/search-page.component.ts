import { Component } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  //searchQuery: string;
  //searchCategory: string;

  popularTags = [
    'Tag 1',
    'Tag 2',
    'Tag 3',
    'Tag 4',
    'Tag 5'
  ];

  recommendedContent = [
    // Add recommended content here
  ];

  onSearch() {
    // Handle search action here
  }
}
