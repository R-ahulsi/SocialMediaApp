import { Component } from '@angular/core';
import { Album } from 'app/dto/Album';
import { SocialMediaService } from 'app/social-media.service';
import { Photo } from 'app/dto/Photo';
import { User } from 'app/dto/User';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  albums: Album[] = [];
  username: string = "";
  firstPhotos: Photo[] = [];
  recommendedFriends: User[] = [];

  constructor(private socialMediaService: SocialMediaService,
              private cookie: CookieService) {}

  ngOnInit(): void {
    this.getAlbums();
    this.getUsername();
  }

  getAlbums(): void {
    this.socialMediaService.getAlbums().then(albums=>this.albums=albums);
  }

  getUsername(): void {
    this.username = this.cookie.get("username")
  }

  getFirstPhotos(): void {
    //this.socialMediaService.getFirstPhotos()
    // .subscribe(firstPhotos => this.firstPhotos = firstPhotos);
  }

  getRecommendedFriends(): void {
    //this.socialMediaService.getRecommendedFriends()
    //  .subscribe(recommendedFriends => this.recommendedFriends = recommendedFriends);
  }
}

