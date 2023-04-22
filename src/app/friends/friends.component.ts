import { Component, Input } from '@angular/core';
import { SocialMediaService } from 'app/social-media.service';
import { User } from 'app/dto/User';
import { Friendship } from 'app/dto/Friend';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {

  @Input() username?: string;

  friending: Friendship[] = [];
  friended: Friendship[] = [];

  constructor( private socialMediaService: SocialMediaService,
                private cookie: CookieService) {}

  ngOnInit(): void {
    this.getFriending();
    this.getFriended();
  }

  getFriending(): void {
    // if (userid!=undefined) {
    // //this.socialMediaService.getFriends(userid)
    // //  .subscribe(friends => this.friends = friends);
    // }
    this.socialMediaService.getFriends(this.cookie.get('user_id')).then(res => {
        this.friending = res
    })
  }

  getFriended(): void {
    // const userid = this.username;
    // if (userid!=undefined) {
    // //this.socialMediaService.getFriended()
    // //  .subscribe(friended => this.friended = friended);
    // }
    this.socialMediaService.getFriended(this.cookie.get('user_id')).then(res => {
        this.friended = res
    })
  }


}
