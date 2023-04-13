import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteLeaderboardComponent } from './site-leaderboard/site-leaderboard.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AlbumComponent } from './album/album.component';
import { UploadPhotoComponent } from './upload-photo/upload-photo.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FriendsComponent } from './friends/friends.component';
import { SinglePhotoComponent } from './single-photo/single-photo.component';
import { LikesDialogComponent } from './likes-dialog/likes-dialog.component';
import { AddCommentComponent } from './add-comment/add-comment.component';

import { HttpClientModule  } from '@angular/common/http';
import { SearchPageComponent } from './search-page/search-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteLeaderboardComponent,
    NavigationBarComponent,
    SignUpComponent,
    LoginComponent,
    AlbumComponent,
    UploadPhotoComponent,
    UserProfileComponent,
    FriendsComponent,
    SinglePhotoComponent,
    LikesDialogComponent,
    AddCommentComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
