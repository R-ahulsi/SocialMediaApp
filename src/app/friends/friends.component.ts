import { Component } from '@angular/core';
import { SocialMediaService } from 'app/social-media.service';
import { User } from 'app/dto/User';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  friends: User[] = [];
  friended: User[] = [];

  constructor( private socialMediaService: SocialMediaService) {}

  ngOnInit(): void {
    this.getFriends();
    this.getFriended();
  }

  getFriends(): void {
    //this.socialMediaService.getFriends()
    //  .subscribe(friends => this.friends = friends);
  }

  getFriended(): void {
    //this.socialMediaService.getFriended()
    //  .subscribe(friended => this.friended = friended);
  }


}
