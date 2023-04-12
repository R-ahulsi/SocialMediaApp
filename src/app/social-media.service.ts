import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from './dto/User';
import { Album } from './dto/Album';
import { Photo } from './dto/Photo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { collection, getFirestore, query, where, getDocs } from "firebase/firestore";
import { Friend } from './dto/Friend';


@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  private username = "";
  db = getFirestore();
  userTable = collection(this.db, 'Users');
  friendTable = collection(this.db, 'Friends');


  constructor(
    private http: HttpClient,
    private store: AngularFirestore
  ) {  }

  //setting username
  setUsername(username: string): void {
    this.username = username;
  }

  async getUsername(): Promise<string> {
    const username = query(this.userTable, where("user_id", "==", "abc"))

    const querySnapshot = await getDocs(username);

    var usernameString = ""
    querySnapshot.forEach((doc) => {
      usernameString = doc.get('user_id')
    });
    
    return usernameString;
  }

  /**
   * 
   * CREATING USER QUERIES 
   * 
   */

  async emailExists(email:string):Promise<boolean> {
    const usernameTableRef = query(this.userTable, where("email", "==", email))

    const querySnapshot = await getDocs(usernameTableRef);

    if (querySnapshot.empty) {
        return false;
    }
    
    return true;
  }

  async usernameExists(username:string):Promise<boolean> {
    const usernameTableRef = query(this.userTable, where("user_id", "==", username))

    const querySnapshot = await getDocs(usernameTableRef);

    if (querySnapshot.empty) {
        return false;
    }
    
    return true;
  }

  createUser(newUser: User) {
    this.store.collection('Users').add({
        DOB: newUser.dob,
        email: newUser.email,
        first_name: newUser.first_name,
        gender: newUser.gender,
        hometown: newUser.hometown,
        last_name: newUser.last_name,
        password: newUser.password,
        user_id: newUser.user_id
    })
  }


    /**
   * 
   * ADDING AND LISTING FRIENDS QUERIES 
   * 
   */

    async searchUser(user_id:string):Promise<User> {
        var user:User = {
            user_id: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            dob: '',
            gender: '',
            hometown: ''
        };

        const username = query(this.userTable, where("user_id", "==", user_id))

        const querySnapshot = await getDocs(username);

        if (querySnapshot.empty) {
            // throw error in html?
        }

        querySnapshot.forEach((doc) => {
            user = {
                user_id: doc.get('user_id'),
                first_name: doc.get('first_name'),
                last_name: doc.get('last_name'),
                email: doc.get('email'),
                password: doc.get('password'),
                dob: doc.get('DOB'),
                gender: doc.get('gender'),
                hometown: doc.get('hometown')
            }
        });

        return user;
    }

    addFriend(newFriend:Friend) {
        this.store.collection('Friends').add({
            formation_date: newFriend.formation_date,
            friended_user: newFriend.friended_user,
            friending_user: newFriend.friending_user,
        })
    }

    async getFriends(user_id:string) {
        const q = query(this.userTable, where("user_id", "==", user_id))

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            doc.get('friended_user')
            doc.get('friending_user')
        });
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
