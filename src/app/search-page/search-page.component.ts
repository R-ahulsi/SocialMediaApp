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
    popularTags:string[] = []

    photosViaTagSearch:string[] = []
    namesWhoCommented:string[] = []
    recommendedContent:string[] = []

    constructor(private socialMediaService: SocialMediaService,
                private cookieService: CookieService) {}

    ngOnInit() {
        this.fillPopularTags()
        this.getRecommendedContent()
    }

    fillPopularTags(): void {
        this.socialMediaService.selectMostPopularTags().then(res => {
            for (let i = 0; i < 5; i++) { // only get top 5 tags
                this.popularTags.push(res[i])
            }
        })
    }

    submit() {
        //console.log("Search Query:", this.searchQuery);
        //console.log("Search Category:", this.searchCategory);
        console.log(this.socialMediaService.searchComments(this.searchQuery));

        if (this.searchCategory === 'Comments'){
            var names:string[] = []

            var arr: { count: number, user_id: string }[]
            this.socialMediaService.searchComments(this.searchQuery).then(res => {// get array of all the user_ids that have made this comment in order
                arr.forEach(ele => {
                    this.socialMediaService.getFirstAndLastName(ele.user_id).then(name => {
                        names.push(name)
                    })
                })
            })

            this.namesWhoCommented = names
        }

        else if (this.searchCategory === 'Friends'){
            console.log(this.searchQuery);
        }
        else if (this.searchCategory === 'Photos'){
            // console.log(this.searchCategory);
            let tags = this.searchQuery.split(" ")
            this.socialMediaService.selectAllPhotosWithTag(tags).then(res => {
                this.photosViaTagSearch = res
            })
        }
        else if (this.searchCategory === 'Tags'){
            console.log(this.searchCategory);
        }
        else{
        console.log(this.searchCategory);
        }
    }

    getRecommendedContent() {
        this.socialMediaService.getRecommendedPhotos(this.cookieService.get('user_id')).then(res => {
            this.recommendedContent = res
        })
    }
}
