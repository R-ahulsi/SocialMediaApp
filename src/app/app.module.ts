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
<<<<<<< Updated upstream
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
=======
import { SettingsComponent } from './settings/settings.component';
>>>>>>> Stashed changes

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
    SearchPageComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage())
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
