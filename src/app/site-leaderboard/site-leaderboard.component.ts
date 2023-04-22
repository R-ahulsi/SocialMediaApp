import { Component } from '@angular/core';
import { SocialMediaService } from 'app/social-media.service';
import { User } from 'app/dto/User';

@Component({
  selector: 'app-site-leaderboard',
  templateUrl: './site-leaderboard.component.html',
  styleUrls: ['./site-leaderboard.component.css'],
})
export class SiteLeaderboardComponent {
  title = 'Site Leaderboard';
  leaderboardData: User[] = [];

  ngOnInit(): void {
    this.socialMediaService
      .topUsers()
      .then((userIds) => {
        const promises = userIds.map((userId) => {
          return this.socialMediaService.getUser(userId).then((user) => {
            this.leaderboardData.push(user);
          });
        });
        Promise.all(promises).catch((error) => {
          console.error('Error getting user data', error);
        });
      })
      .catch((error) => {
        console.error('Error getting top users', error);
      });
  }

}
