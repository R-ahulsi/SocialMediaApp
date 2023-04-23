import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from './dto/User';
import { Album } from './dto/Album';
import { Photo } from './dto/Photo';
import { Comment } from './dto/Comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { Friend, Friendship } from './dto/Friend';

import { getStorage, ref, listAll } from 'firebase/storage';
import { getApp, initializeApp } from '@firebase/app';
import { Tag } from './dto/Tag';
import { Like } from './dto/Like';
import { getDownloadURL } from '@angular/fire/storage';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { CookieService } from 'ngx-cookie-service';
import * as uuid from 'uuid';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  private username = this.cookie.get('user_id');

  db = getFirestore();
  usersTable = collection(this.db, 'Users');
  friendsTable = collection(this.db, 'Friends');
  albumsTable = collection(this.db, 'Albums');
  commentsTable = collection(this.db, 'Comments');
  likesTable = collection(this.db, 'Likes');
  tagsTable = collection(this.db, 'Tags');
  photosTable = collection(this.db, 'Photos');

  constructor(
    private http: HttpClient,
    private store: AngularFirestore,
    private storage: AngularFireStorage,
    private firebase: AngularFireDatabase,
    private cookie: CookieService
  ) {}

  //setting username
  setUsername(username: string): void {
    this.username = this.cookie.get('user_id');
  }

  async getUsername(email: string): Promise<string> {
    console.log('getUsername function called');
    const username = query(this.usersTable, where('email', '==', email));

    const querySnapshot = await getDocs(username);

    var usernameString = '';
    querySnapshot.forEach((doc) => {
      usernameString = doc.get('user_id');
    });

    return usernameString;
  }

  /**
   *
   * CREATING USER QUERIES
   *
   */

  async emailExists(email: string): Promise<boolean> {
    // const usernameTableRef = query(this.usersTable, where("email", "==", email))

    // const querySnapshot = await getDocs(usernameTableRef);

    // if (querySnapshot.empty) {
    //     return false;
    // }

    // return true;
    const q = query(this.usersTable, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    var retValue = false;
    querySnapshot.forEach((doc) => {
      retValue = true;
    });
    return retValue;
  }

  async usernameExists(username: string): Promise<boolean> {
    const usernameTableRef = query(
      this.usersTable,
      where('user_id', '==', username)
    );

    const querySnapshot = await getDocs(usernameTableRef);

    // if (querySnapshot.empty) {
    //     return false;
    // }

    var retValue: boolean = false;
    querySnapshot.forEach((doc) => {
      retValue = true;
    });
    return retValue;
  }

  createUser(newUser: User, hash: string) {
    this.store.collection('Users').add({
      DOB: newUser.dob,
      email: newUser.email,
      first_name: newUser.first_name,
      gender: newUser.gender,
      hometown: newUser.hometown,
      last_name: newUser.last_name,
      password: hash,
      user_id: newUser.user_id,
      contribution: newUser.contribution,
    });
  }

  /**
   *
   * ADDING AND LISTING FRIENDS QUERIES
   *
   */

  async searchUser(user_id: string): Promise<User> {
    var user: User = {
      user_id: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      dob: '',
      gender: '',
      hometown: '',
      contribution: 0,
    };

    const username = query(this.usersTable, where('user_id', '==', user_id));

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
        hometown: doc.get('hometown'),
        contribution: doc.get('contribution'),
      };
    });

    return user;
  }

  addFriend(newFriend: Friend) {
    this.store.collection('Friends').add({
      formation_date: newFriend.formation_date,
      friended_user: newFriend.friended_user,
      friending_user: newFriend.friending_user,
    });
  }

  async getFriends(friending_user: string): Promise<Friendship[]> {
    const q = query(
      this.friendsTable,
      where('friending_user', '==', friending_user)
    );

    const querySnapshot = await getDocs(q);

    var friends: Friendship[] = [];

    querySnapshot.forEach((doc) => {
      friends.push({
        friended_user: doc.get('friended_user'),
        friending_user: doc.get('friending_user'),
      });
    });

    return friends;
  }

  async getFriended(friended_user: string): Promise<Friendship[]> {
    const q = query(
      this.friendsTable,
      where('friended_user', '==', friended_user)
    );

    const querySnapshot = await getDocs(q);

    var friends: Friendship[] = [];

    querySnapshot.forEach((doc) => {
      friends.push({
        friended_user: doc.get('friended_user'),
        friending_user: doc.get('friending_user'),
      });
    });

    return friends;
  }

  /**
   *
   * User Activity
   *
   */

  async topUsers() {
    var topUsers: string[] = [];

    const q = query(this.usersTable);

    const querySnapshot = await getDocs(q);

    var user_ids: string[] = [];
    var contribution: number[] = [];
    querySnapshot.forEach((doc) => {
      user_ids.push(doc.get('user_id'));
      contribution.push(doc.get('contribution'));
    });

    let combinedArray = this.sortArrays(contribution, user_ids);

    for (let i = 0; i < 10; i++) {
      // get top 10 users contribution score
      topUsers.push(combinedArray[i].user_id);
    }

    return topUsers;
  }

  /**
   *
   * Logging in/out
   *
   */
  async login(email: string, password: string): Promise<boolean> {
    const querySnapshot = await getDocs(
      query(this.usersTable, where('email', '==', email))
    );

    if (querySnapshot.empty) {
      console.log(`No documents found with email ${email}`);
      return false;
    }

    const user = querySnapshot.docs[0].data();
    const storedHashedPassword = user['password'];

    const isPasswordMatch = await bcrypt.compare(
      password,
      storedHashedPassword
    );

    /*
    if (isPasswordMatch) {
      console.log('Login successful!');
      return true;
    } else {
      console.log('Incorrect password');
      return false;
      
    }
    */
    return isPasswordMatch;
  }

  /**
   *
   * Photo and Album Browsing
   *
   */

  async getAllPhotos(): Promise<Photo[]> {
    var photos: Photo[] = [];

    const q = query(this.photosTable);

    const querySnapshot = await getDocs(q);

    var singlePhoto: Photo = {
      photo_id: '',
      data: '',
      user_id: '',
      caption: '',
      album_id: '',
      date_posted: '',
    };

    querySnapshot.forEach((doc) => {
      singlePhoto.album_id = doc.get('album_id');
      singlePhoto.caption = doc.get('caption');
      singlePhoto.data = doc.get('data');
      singlePhoto.date_posted = doc.get('data_posted');
      singlePhoto.photo_id = doc.get('photo_id');
      singlePhoto.user_id = doc.get('user_id');
      photos.push(singlePhoto);
    });

    return photos;
  }

  async getPhotosByAlbumId(album_id: string) {
    const q = query(this.photosTable, where('album_id', '==', album_id));
    const querySnapshot = await getDocs(q);

    var photos: Photo[] = [];

    var photo: Photo = {
      photo_id: '',
      data: '',
      user_id: '',
      caption: '',
      album_id: '',
      date_posted: '',
    };
    querySnapshot.forEach((doc) => {
      photo.photo_id = doc.get('photo_id');
      photo.data = doc.get('data');
      photo.user_id = doc.get('user_id');
      photo.caption = doc.get('caption');
      photo.album_id = doc.get('album_id');
      photo.date_posted = doc.get('date_posted');
      photos.push(photo);

      photo = {
        photo_id: '',
        data: '',
        user_id: '',
        caption: '',
        album_id: '',
        date_posted: '',
      };
    });

    return photos;
  }

  async getAlbums(user_id: string): Promise<Album[]> {
    var albums: Album[] = [];

    const q = query(this.albumsTable, where('user_id', '==', user_id));

    const querySnapshot = await getDocs(q);

    var singleAlbum: Album = {
      album_id: '',
      name: '',
      user_id: '',
      creation_date: '',
    };

    querySnapshot.forEach((doc) => {
      singleAlbum.user_id = doc.get('user_id');
      singleAlbum.album_id = doc.get('album_id');
      singleAlbum.creation_date = doc.get('creation_date');
      singleAlbum.name = doc.get('name');
      albums.push(singleAlbum);

      singleAlbum = {
        album_id: '',
        name: '',
        user_id: '',
        creation_date: '',
      };
    });

    return albums;
  }

  async getOtherAlbums(username: string): Promise<Album[]> {
    var albums: Album[] = [];

    const q = query(this.albumsTable, where('user_id', '==', username));

    const querySnapshot = await getDocs(q);

    var singleAlbum: Album = {
      album_id: '',
      name: '',
      user_id: '',
      creation_date: '',
    };

    querySnapshot.forEach(
      (doc) => (singleAlbum.user_id = doc.get('user_id')),
      albums.push(singleAlbum)
    );

    return albums;
  }

  async getAlbumUserID(album_id: string): Promise<string> {
    const q = query(this.albumsTable, where('album_id', '==', album_id));

    let querySnapshot = await getDocs(q);

    var user_id: string = '';
    querySnapshot.forEach((res) => {
      user_id = res.get('user_id');
    });

    return user_id;
  }

  async getPhotoData(photo_id: string) {
    const q = query(this.photosTable, where('photo_id', '==', photo_id));

    let querySnapshot = await getDocs(q);

    var url: string = '';
    querySnapshot.forEach((res) => {
      url = res.get('data');
    });

    console.log(this.storage.ref('images/mountains.jpg').getDownloadURL());
    return url;
  }

  /**
   *
   * Photo and Album Creating
   *
   */

  async getCaption(photo_id: string) {
    const q = query(this.photosTable, where('photo_id', '==', photo_id));
    const querySnapshot = await getDocs(q);

    var caption: string = '';
    querySnapshot.forEach((doc) => {
      caption = doc.get('caption');
    });

    return caption;
  }

  createAlbum(album: Album) {
    this.store.collection('Albums').add({
      album_id: album.album_id,
      creation_date: album.creation_date,
      name: album.name,
      user_id: album.user_id,
    });
  }

  async postPhoto(
    path: string,
    file: any,
    caption: string,
    album: string,
    tags: string
  ) {
    let reader = new FileReader();
    const upload = await this.storage.upload(path, file); // second param is the image file

    var album_id: string = '';
    this.getAlbumId(album).then((res) => (album_id = res));

    upload.ref.getDownloadURL().then((res) => {
      this.createPhoto({
        photo_id: uuid.v4().toString(),
        data: res,
        user_id: this.username,
        caption: caption,
        album_id: album_id,
        date_posted: new Date().toISOString(),
      });
    });

    // increase contribution
    this.increaseContributionScore(this.username);
  }

  async getAlbumId(name: string) {
    const q = query(this.albumsTable, where('name', '==', name));

    let querySnapshot = await getDocs(q);

    var albumId: string = '';
    querySnapshot.forEach((res) => {
      albumId = res.get('album_id');
    });

    return albumId;
  }

  async getAlbumName(album_id: string) {
    const q = query(this.albumsTable, where('album_id', '==', album_id));

    let querySnapshot = await getDocs(q);

    var name: string = '';
    querySnapshot.forEach((res) => {
      name = res.get('name');
    });

    return name;
  }

  createTag(tag: Tag) {
    this.store.collection('Tags').add({
      photo_id: tag.photo_id,
      word: tag.word,
    });
  }

  async updatePhotosAlbum(photo_id: string, album_id: string) {
    const q = query(this.photosTable, where('photo_id', '==', photo_id));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((photo) =>
      updateDoc(doc(this.db, 'Photos', photo.id), {
        album_id: album_id,
      })
    );
  }

  async updateAlbumName(album_id: string, name: string) {
    const q = query(this.albumsTable, where('album_id', '==', album_id));

    let querySnapshot = await getDocs(q);

    querySnapshot.forEach((album) =>
      updateDoc(doc(this.db, 'Album', album.id), {
        name: name,
      })
    );
  }

  async deleteAlbum(album_id: string) {
    const q = query(this.albumsTable, where('album_id', '==', album_id));

    let querySnapshot = await getDocs(q);

    querySnapshot.forEach((album) => {
      this.deletePhotosInAlbum(album.get('album_id'));
      this.store.collection('Albums').doc(album.id.toString()).delete();
    });
  }

  async deletePhoto(photo_id: string) {
    const q = query(this.photosTable, where('photo_id', '==', photo_id));

    let querySnapshot = await getDocs(q);

    querySnapshot.forEach((photo) =>
      deleteDoc(doc(this.db, 'Photo', photo.id))
    );
  }

  /**
   *
   * Viewing photos by album
   *
   */

  async selectPhotosFromAlbum(album_id: string) {
    const q = query(this.photosTable, where('album_id', '==', album_id));

    const querySnapshot = await getDocs(q);

    var urls: string[] = [];
    querySnapshot.forEach((res) => {
      urls.push(res.get('data'));
    });

    return urls;
  }

  /**
   *
   * Viewing photos by tag
   *
   */

  async getTagsForPhoto(photo_id: string) {
    const q = query(this.tagsTable, where('photo_id', '==', photo_id));
    const querySnapshot = await getDocs(q);

    var tags: string[] = [];
    querySnapshot.forEach((doc) => {
      tags.push(doc.get('word'));
    });

    return tags;
  }

  async selectAllPhotosWithTag(tag: string) {
    var photoIds: string[] = [];
    const q = query(this.tagsTable, where('word', '==', tag));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((res) => {
      photoIds.push(res.get('photo_id'));
    });

    var imageUrls: string[] = [];
    photoIds.forEach(async (ele) => {
      const q = query(this.photosTable, where('photo_id', '==', ele));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((res) => {
        imageUrls.push(res.get('data'));
      });
    });

    return imageUrls;
  }

  async selectUsersPhotosWithTag(user_id: string, tag: string) {
    var photoIds: string[] = [];
    const q = query(this.tagsTable, where('word', '==', tag));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((res) => {
      photoIds.push(res.get('photo_id'));
    });

    var imageUrls: string[] = [];
    photoIds.forEach(async (ele) => {
      const q = query(
        this.photosTable,
        where('photo_id', '==', ele),
        where('user_id', '==', user_id)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((res) => {
        imageUrls.push(res.get('data'));
      });
    });

    return imageUrls;
  }

  /**
   *
   * Viewing most popular tags
   *
   */

  async selectMostPopularTags() {
    var popularTags: string[] = [];

    const q = query(this.tagsTable);
    const querySnapshot = await getDocs(q);

    var tagWords: string[] = [];
    querySnapshot.forEach((doc) => {
      tagWords.push(doc.get('word'));
    });

    const tagsMap = tagWords.reduce((map, currentValue) => {
      if (map.has(currentValue)) {
        map.set(currentValue, map.get(currentValue) ? +1 : 1);
      } else {
        map.set(currentValue, 1);
      }
      return map;
    }, new Map<string, number>());

    return tagsMap; // returns a map of <string, number>. It should be sorted from the highest to lowest so grab first elements first.
  }

  /**
   *
   * Leaving Comments
   *
   */

  newComment(comment: Comment) {
    this.store.collection('Comments').add({
      comment_date: comment.comment_date,
      comment_id: comment.comment_id,
      photo_id: comment.photo_id,
      text: comment.text,
      user_id: comment.user_id,
    });

    this.increaseContributionScore(comment.user_id);
  }

  async getCommentsForPhoto(photo_id: string) {
    const q = query(this.commentsTable, where('photo_id', '==', photo_id));
    const querySnapshot = await getDocs(q);

    var comments: Comment[] = [];
    querySnapshot.forEach((ele) => {
      comments.push({
        comment_date: ele.get('comment_date'),
        comment_id: ele.get('comment_id'),
        photo_id: ele.get('photo_id'),
        text: ele.get('text'),
        user_id: ele.get('user_id'),
      });
    });

    return comments;
  }

  /**
   *
   * Like Functionality
   *
   */

  likePhoto(like: Like) {
    this.store.collection('Likes').add({
      photo_id: like.photo_id,
      user_id: like.user_id,
    });
  }

  async getLikesOnPhoto(photo_id: string): Promise<string[]> {
    const q = query(this.likesTable, where('photo_id', '==', photo_id));

    let querySnapshot = await getDocs(q);

    var likes: string[] = [];

    querySnapshot.forEach((like) => likes.push(like.get('user_id')));

    return likes;
  }

  async getNumberOfLikes(photo_id: string): Promise<number> {
    const q = query(this.likesTable, where('photo_id', '==', photo_id));

    let querySnapshot = await getDocs(q);

    var likes: number = 0;
    querySnapshot.forEach((doc) => likes++);

    return likes;
  }

  /**
   *
   * Like Functionality
   *
   */

  async searchComments(comment: string) {
    const q = query(this.commentsTable, where('text', '==', comment));

    let querySnapshot = await getDocs(q);

    var commentCountNames: string[] = [];
    var commentCount: number[] = [];
    var index: number;

    querySnapshot.forEach((doc) => {
      index = this.searchArray(commentCountNames, doc.get('user_id'));

      if (index != -1) {
        commentCount[index]++;
      } else {
        commentCountNames.push(doc.get('user_id'));
        commentCount.push(0);
      }
    });

    return this.sortArrays(commentCount, commentCountNames); // TOP 10 elements in array give 10 top user_ids that commented this comment
  }

  /**
   *
   * Friend Recommendations
   *
   */

  async getFriendRecommendations(user_id: string) {
    const q = query(this.friendsTable, where('friending_user', '==', user_id));
    const querySnapshot = await getDocs(q);

    var friends: string[] = [];
    querySnapshot.forEach((res) => {
      friends.push(res.get('friended_user'));
    });

    var friendsOfFriend: string[] = [];
    friends.forEach(async (ele) => {
      const q = query(this.friendsTable, where('friending_user', '==', ele));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((res) => {
        if (res.get('friended_user') === user_id) {
          // friend of friend cant be yourself.
          return;
        }

        friendsOfFriend.push(res.get('friended_user'));
      });
    });

    return friendsOfFriend; // Sort array?
  }

  /**
   *
   * You may also like functionality
   *
   */

  async getRecommendedPhotos(user_id: string) {
    var photoUrls: string[] = [];

    const q = query(this.photosTable, where('user_id', '==', user_id));
    const querySnapshot = await getDocs(q);

    var usersPhotos: number[] = [];
    querySnapshot.forEach((res) => {
      usersPhotos.push(res.get('photo_id'));
    });

    var tagsOfInterest: string[] = [];
    usersPhotos.forEach(async (photo) => {
      const q = query(this.tagsTable, where('photo_id', '==', photo));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((ele) => {
        tagsOfInterest.push(ele.get('word'));
      });
    });

    var photoIdsOfInterest: string[] = [];
    tagsOfInterest.forEach(async (ele) => {
      const q = query(this.tagsTable, where('word', '==', ele));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((res) => {
        photoIdsOfInterest.push(res.get('photo_id'));
      });
    });

    photoIdsOfInterest.forEach(async (ele) => {
      const q = query(this.photosTable, where('photo_id', '==', ele));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((res) => {
        photoUrls.push(res.get('data'));
      });
    });

    return photoUrls; // Need to sort??? Nahhhh
  }

  /*******************************************************************
   *
   * Private methods
   *
   ********************************************************************/

  private searchArray<T>(list: T[], item: T): number {
    for (let i = 0; i < list.length; i++) {
      if (list[i] == item) {
        return i;
      }
    }
    return -1;
  }

  private async increaseContributionScore(user_id: string) {
    const q = query(this.usersTable, where('user_id', '==', user_id));

    let querySnapshot = await getDocs(q);

    querySnapshot.forEach((user) => {
      var con = user.get('contribution');
      updateDoc(doc(this.db, 'Users', user.id), {
        contribution: con++,
      });
    });
  }

  private sortArrays(array1: number[], array2: string[]) {
    let combinedArray = array1.map((value, index) => ({
      count: value,
      user_id: array2[index],
    }));

    combinedArray.sort((a, b) => {
      if (a.count === b.count) {
        return a.user_id.localeCompare(b.user_id);
      } else {
        return a.count - b.count;
      }
    });

    return combinedArray;
  }

  private createPhoto(photo: Photo) {
    this.store.collection('Photos').add({
      album_id: photo.album_id,
      caption: photo.caption,
      data: photo.data,
      date_posted: photo.date_posted,
      photo_id: photo.photo_id,
      user_id: photo.user_id,
    });
  }

  private async deletePhotosInAlbum(album_id: string) {
    const q = query(this.photosTable, where('album_id', '==', album_id));

    let querySnapshot = await getDocs(q);

    querySnapshot.forEach(
      async (photo) => await deleteDoc(doc(this.db, 'Album', photo.id))
    );
  }
}
