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
  leaderboardData = [
    { name: 'John', score: 100 },
    { name: 'Jane', score: 75 },
    { name: 'Bob', score: 50 },
  ];
}
