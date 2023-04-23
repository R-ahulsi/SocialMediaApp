import { Component } from '@angular/core';
import { Album } from 'app/dto/Album';
import { SocialMediaService } from 'app/social-media.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

import { Friend } from 'app/dto/Friend';


@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.css']
})
export class OtherUserProfileComponent {

  albums: Album[] = [];
  username: string = "";

  friendship = new Friend('','','');

  constructor(
    private socialMediaService: SocialMediaService,
    private route: ActivatedRoute,
    private location: Location,
    private cookie: CookieService,
    private router: Router) {
      this.route.paramMap.subscribe(params=> {
        this.ngOnInit();
      });
    }

  ngOnInit(): void {
    this.getUsername();
    this.getAlbums();
    

    
  }

  getAlbums(): void {
    //this.username  = String(this.route.snapshot.paramMap.get('username'));
    this.socialMediaService.getAlbums(this.username)
      .then(albums => this.albums = albums);
  }

  getUsername(): void {
    this.username  = String(this.route.snapshot.paramMap.get('username'));
    if (this.username == this.cookie.get('user_id')) {
      this.router.navigate(['/profile']);
    }
    //this.username = this.username;
  }

  addFriend(username: string): void {
    //get User with username
    //check if user is in friended list if not
    //add to logged in users friended list
    this.socialMediaService.isFriended(this.cookie.get('user_id'),this.username).then(
      r => {
        if (!r) {
          this.friendship.formation_date = new Date().toISOString();
          this.friendship.friending_user = this.cookie.get('user_id');
          this.friendship.friended_user = this.username;
          this.socialMediaService.addFriend(this.friendship);

          this.friendship = new Friend('','','');
        }
      });
    }
    

    
}
