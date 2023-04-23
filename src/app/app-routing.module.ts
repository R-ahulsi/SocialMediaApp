import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { LoginComponent } from './login/login.component';
import { OtherUserProfileComponent } from './other-user-profile/other-user-profile.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SettingsComponent } from './settings/settings.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SinglePhotoComponent } from './single-photo/single-photo.component';
import { SiteLeaderboardComponent } from './site-leaderboard/site-leaderboard.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  {path: 'scoreboard', component: SiteLeaderboardComponent, canActivate: [AuthGuard] },
  {path: 'upload', component: UploadPhotoComponent, canActivate: [AuthGuard] },
  {path: 'friend/:username', component: OtherUserProfileComponent, canActivate: [AuthGuard] },
  {path: 'search', component: SearchPageComponent, canActivate: [AuthGuard] },
  {path: 'singlephoto/:photo_id', component: SinglePhotoComponent, canActivate: [AuthGuard] },
  {path: 'album/:album_id', component: AlbumComponent, canActivate: [AuthGuard] },
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
