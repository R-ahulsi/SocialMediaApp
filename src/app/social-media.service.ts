import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from './User';
import { Album } from './Album';
import { Photo } from './Photo';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  private username = "";

  constructor(
    private http: HttpClient
  ) { }

  //setting username
  setUsername(username: string): void {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  //check if user is in database when signing up
  /*checkIfEmailExists(email: string): boolean {
    return false;
  }*/

  //check if username is taken when signing up
  /*checkIfUsernameExists(username: string): boolean {
    return false;
  }*/

  //get all albums
  /*getAlbums(): Observable<Album[]> {

  }*/

  //get first photo from each album
  /*getFirstPhotos(): Observable<Photo[]> {

  }*/

  //get users friends
  /*getFriends(): Observable<User[]> {

  }*/

  //get users friended
  /*getFriended(): Observable<User[]> {

  } */

  //get recommended friends
  /*getRecommendedFriends(): Observable<User[]> {

  }*/





}
