import { Component } from '@angular/core';
import { User } from '../dto/User';
import { SocialMediaService } from 'app/social-media.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  searchQuery: string = "cooool";
  searchCategory: string = 'commentz';
  popularTags:string[] = [];

  constructor(private socialMediaService: SocialMediaService, private cookieService: CookieService) {}

  fillPopularTags(): void {
    //this.socialMediaService.selectMostPopularTags().then(res => {this.popularTags = res})
  }
  

  recommendedContent = [
    // Add recommended content here
  ];

  submit() {
    //console.log("Search Query:", this.searchQuery);
    //console.log("Search Category:", this.searchCategory);
    console.log(this.socialMediaService.searchComments(this.searchQuery));

    if (this.searchCategory === 'Comments'){
      //console.log(this.socialMediaService.searchComments(this.searchQuery));
      //console.log(this.searchQuery);
    } 
    else if (this.searchCategory === 'Friends'){
      console.log(this.searchQuery);
    }
    else if (this.searchCategory === 'Photos'){
      console.log(this.searchCategory);
    }
    else if (this.searchCategory === 'Tags'){
      console.log(this.searchCategory);
    }
    else{
      console.log(this.searchCategory);
    }
  }

  getPopularTags() {
    
  }
}