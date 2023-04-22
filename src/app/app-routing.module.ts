import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtherUserProfileComponent } from './other-user-profile/other-user-profile.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SiteLeaderboardComponent } from './site-leaderboard/site-leaderboard.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: '', redirectTo: 'signup', pathMatch: 'full'},
  {path: 'profile', component: UserProfileComponent},
  {path: 'scoreboard', component: SiteLeaderboardComponent},
  {path: 'upload', component: UploadPhotoComponent},
  {path: 'friend/:username', component: OtherUserProfileComponent},
  {path: 'search', component: SearchPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
