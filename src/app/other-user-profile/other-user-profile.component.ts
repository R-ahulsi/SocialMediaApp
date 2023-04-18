import { Component } from '@angular/core';
import { Album } from 'app/dto/Album';
import { SocialMediaService } from 'app/social-media.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-other-user-profile',
  templateUrl: './other-user-profile.component.html',
  styleUrls: ['./other-user-profile.component.css']
})
export class OtherUserProfileComponent {

  albums: Album[] = [];
  username: string = "";

  constructor(
    private socialMediaService: SocialMediaService,
    private route: ActivatedRoute,
    private location: Location) {}

  ngOnInit(): void {
    this.getAlbums();
    this.getUsername();

    
  }

  getAlbums(): void {
    const username  = String(this.route.snapshot.paramMap.get('username'));
    //this.socialMediaService.getAlbums(username)
    //  .subscribe(albums => this.albums = albums);
  }

  getUsername(): void {
    const username  = String(this.route.snapshot.paramMap.get('username'));
    this.username = username;
    //this.username = this.socialMediaService.getUsername();
  }

  addFriend(username: string): void {
    //get User with username
    //check if user is in friended list if not
    //add to logged in users friended list
  }
}
