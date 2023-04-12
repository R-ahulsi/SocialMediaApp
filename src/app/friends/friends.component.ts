import { Component, Input } from '@angular/core';
import { SocialMediaService } from 'app/social-media.service';
import { User } from 'app/User';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {

  @Input() username?: string;

  friends: User[] = [];
  friended: User[] = [];

  constructor( private socialMediaService: SocialMediaService) {}

  ngOnInit(): void {
    this.getFriends();
    this.getFriended();
  }

  getFriends(): void {
    const userid = this.username;
    if (userid!=undefined) {
    //this.socialMediaService.getFriends(userid)
    //  .subscribe(friends => this.friends = friends);
    }
  }

  getFriended(): void {
    const userid = this.username;
    if (userid!=undefined) {
    //this.socialMediaService.getFriended()
    //  .subscribe(friended => this.friended = friended);
    }
  }


}
