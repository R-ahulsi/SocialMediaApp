import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { User } from './dto/User';
import { Album } from './dto/Album';
import { Photo } from './dto/Photo';
import { Comment } from './dto/Comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { collection, getFirestore, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Friend, Friendship } from './dto/Friend';

import { getStorage, ref, listAll  } from "firebase/storage";
import { getApp, initializeApp } from '@firebase/app';
import { Tag } from './dto/Tag';
import { Like } from './dto/Like';
import { getDownloadURL } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  private username = '';


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
    private store: AngularFirestore
  ) {  }

  //setting username
  setUsername(username: string): void {
    this.username = username;
  }

  async getUsername(user_id:string): Promise<string> {
    const username = query(this.usersTable, where("user_id", "==", user_id))

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
    const usernameTableRef = query(this.usersTable, where("email", "==", email))

    const querySnapshot = await getDocs(usernameTableRef);

    if (querySnapshot.empty) {
        return false;
    }
    
    return true;
  }

  async usernameExists(username:string):Promise<boolean> {
    const usernameTableRef = query(this.usersTable, where("user_id", "==", username))

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
            hometown: '',
            contribution:0
        };

        const username = query(this.usersTable, where("user_id", "==", user_id))

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
                contribution: doc.get('contribution')
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

    async getFriends(friending_user:string):Promise<Friendship[]> {
        const q = query(this.friendsTable, where("friending_user", "==", friending_user))

        const querySnapshot = await getDocs(q);

        var friends:Friendship[] = []

        querySnapshot.forEach((doc) => {

            friends.push({
                friended_user: doc.get('friended_user'),
                friending_user: doc.get('friending_user')
            });
            
        });

        return friends;
    }

    async getFriended(friended_user:string):Promise<Friendship[]> {
        const q = query(this.friendsTable, where("friended_user", "==", friended_user))

        const querySnapshot = await getDocs(q);

        var friends:Friendship[] = []

        querySnapshot.forEach((doc) => {

            friends.push({
                friended_user: doc.get('friended_user'),
                friending_user: doc.get('friending_user')
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
        var topUsers:string[] = [];

        const q = query(this.usersTable)

        const querySnapshot = await getDocs(q);

        var user_ids:string[] = []
        var contribution:number[] = []
        querySnapshot.forEach(doc => {
            user_ids.push(doc.get('user_id'))
            contribution.push(doc.get('contribution'))
        })

        let combinedArray = this.sortArrays(contribution, user_ids)

        for (let i = 0; i < 10; i++) { // get top 10 users contribution score
            topUsers.push(combinedArray[i].user_id)
        }

        return topUsers;
    }


    /**
   * 
   * Logging in/out
   * 
   */


    async login(email:string, password:string):Promise<boolean> {
        const q = query(this.usersTable, where("email", "==", email), where("password","==",password))

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return false;
        }

        return true;
    }


    /**
   * 
   * Photo and Album Browsing
   * 
   */


    async getAllPhotos():Promise<Photo[]> {
        var photos:Photo[] = []

        const q = query(this.photosTable)

        const querySnapshot = await getDocs(q);

        var singlePhoto : Photo = {
            photo_id: 0,
            data: '',
            user_id: '',
            caption: '',
            album_id: 0,
            date_posted: ''
        }

        querySnapshot.forEach(doc =>
            singlePhoto.album_id = doc.get('album_id'),
            photos.push(singlePhoto)
        )

        return photos;
    }

    async getAlbums():Promise<Album[]> {
        var albums:Album[] = []

        const q = query(this.albumsTable, where("user_id","==",this.username));

        const querySnapshot = await getDocs(q);

        var singleAlbum : Album = {
            album_id: 0,
            name: '',
            user_id: '',
            creation_date: '',
        }

        querySnapshot.forEach(doc =>
            singleAlbum.user_id = doc.get('user_id'),
            albums.push(singleAlbum)
        )

        return albums;
    }

    async getOtherAlbums(username: string):Promise<Album[]> {
        var albums:Album[] = []

        const q = query(this.albumsTable, where("user_id","==",username));

        const querySnapshot = await getDocs(q);

        var singleAlbum : Album = {
            album_id: 0,
            name: '',
            user_id: '',
            creation_date: '',
        }

        querySnapshot.forEach(doc =>
            singleAlbum.user_id = doc.get('user_id'),
            albums.push(singleAlbum)
        )

        return albums;
    }

    getPhotoData(imageName: string):string { // TODO
        // const storage = getStorage();
        // var urlReturn : string = "";
        // getDownloadURL(ref(storage, imageName)).then((url) => {
        //     urlReturn = url;
        // })
        // return urlReturn;

        const storage = getStorage();
        const pathReference = ref(storage, '/images/'+imageName);
        const gsReference = ref(storage, 'gs://socialmediaapp-database.appspot.com/mountains.jpg');
        const httpsReference = ref(storage, imageName);

        var urlReturn : string = "";
        // listAll(pathReference).then(res => {
        //     res.items.forEach(item => console.log(item.root))
        // })
        getDownloadURL(pathReference).then(res => {
            urlReturn = res
        })

        return urlReturn;
    }


    /**
   * 
   * Photo and Album Creating
   * 
   */


    createAlbum(album:Album) {
        this.store.collection('Albums').add({
            album_id: album.album_id,
            creation_date: album.creation_date,
            name: album.name,
            user_id: album.user_id
        })

    }

    postPhoto() { // TODO
        let reader = new FileReader();

        // increase contribution
    }

    createTag(tag:Tag) {
        this.store.collection('Tags').add({
            photo_id: tag.photo_id,
            word: tag.word
        })
    }

    async updatePhotosAlbum(photo_id: string, album_id: string) {
        const q = query(this.photosTable, where("photo_id", "==", photo_id))

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(photo =>
            updateDoc(doc(this.db, 'Photos', photo.id), {
                album_id: album_id
            })
        )
    }

    async updateAlbumName(album_id: string, name: string) {
        const q = query(this.albumsTable, where("album_id", "==", album_id))

        let querySnapshot = await getDocs(q);

        querySnapshot.forEach(album =>
            updateDoc(doc(this.db, 'Album', album.id), {
                name: name
            })
        );
    }

    async deleteAlbum(album_id:string) {
        const q = query(this.albumsTable, where("album_id", "==", album_id))

        let querySnapshot = await getDocs(q);

        // Will have to delete photos in album too (TODO) -> Should this logic be done elsewhere to keep things cleaner?
        
        querySnapshot.forEach(album =>
            deleteDoc(doc(this.db, 'Album', album.id))
        );
    }



    /**
   * 
   * Viewing photos by album
   * 
   */



    selectPhotosFromAlbum() {} // TODO





    /**
   * 
   * Viewing photos by tag
   * 
   */



    selectAllPhotosWithTag(tag: string) {} // TODO

    selectUsersPhotosWithTag(user_id:string, tag:string) {} // TODO



    /**
   * 
   * Viewing most popular tags
   * 
   */




    async selectMostPopularTags() {
        var popularTags:string[] = []

        const q = query(this.tagsTable)
        const querySnapshot = await getDocs(q);

        var tagWords:string[] = []
        querySnapshot.forEach(doc => {
            tagWords.push(doc.get('word'))
        })

        const tagsMap = tagWords.reduce((map, currentValue) => {
            if (map.has(currentValue)) {
              map.set(currentValue, map.get(currentValue)? + 1: 1);
            } else {
              map.set(currentValue, 1);
            }
            return map;
        }, new Map<string, number>());

        return tagsMap // returns a map of <string, number>. It should be sorted from the highest to lowest so grab first elements first.
    }




    /**
   * 
   * Leaving Comments
   * 
   */

    newComment(comment:Comment) {
        this.store.collection('Comments').add({
            comment_date: comment.comment_date,
            comment_id: comment.comment_id,
            photo_id: comment.photo_id,
            text: comment.text,
            user_id: comment.user_id
        })

        this.increaseContributionScore(comment.user_id);
    }



    /**
   * 
   * Like Functionality
   * 
   */



    likePhoto(like:Like) {
        this.store.collection('Likes').add({
            photo_id: like.photo_id,
            user_id: like.user_id
        })
    }

    async getLikesOnPhoto(photo_id:string): Promise<string[]> {
        const q = query(this.likesTable, where("photo_id", "==", photo_id))

        let querySnapshot = await getDocs(q);

        var likes:string[] = [];

        querySnapshot.forEach(like => 
            likes.push(like.get('user_id'))
        )

        return likes;
    }

    async getNumberOfLikes(photo_id:string): Promise<number> {
        const q = query(this.likesTable, where("photo_id", "==", photo_id))

        let querySnapshot = await getDocs(q);

        var likes:number = 0;

        querySnapshot.forEach(doc => 
            likes++
        )

        return likes;
    }




    /**
   * 
   * Like Functionality
   * 
   */


    async searchComments(comment:string) {
        const q = query(this.commentsTable, where("text", "==", comment))

        let querySnapshot = await getDocs(q);

        var commentCountNames:string[] = []
        var commentCount:number[] = []
        var index:number;

        querySnapshot.forEach(doc => {
            index = this.searchArray(commentCountNames, doc.get('user_id'))

            if (index != -1) {
                commentCount[index]++;
            } else {
                commentCountNames.push(doc.get('user_id'));
                commentCount.push(0);
            }
        })

        return this.sortArrays(commentCount, commentCountNames); // TOP 10 elements in array give 10 top user_ids that comments this comment
    }



    /**
   * 
   * Friend Recommendations
   * 
   */



    getFriendRecommendations() {} // TODO



    /**
   * 
   * You may also like functionality
   * 
   */



    getRecommendedPhotos() {} // TODO






    /*******************************************************************
   * 
   * Private methods
   * 
   ********************************************************************/



    private searchArray<T>(list:T[], item:T):number {
        for(let i = 0; i < list.length; i++) {
            if (list[i] == item) {
                return i;
            }
        }
        return -1;
    }

    private async increaseContributionScore(user_id:string) {
        const q = query(this.usersTable, where("user_id", "==", user_id))

        let querySnapshot = await getDocs(q);

        querySnapshot.forEach(user => {
            var con = user.get('contribution');
            updateDoc(doc(this.db, 'Users', user.id), {
                contribution: con++
            })
        });
    }

    private sortArrays(array1:number[], array2:string[]) {
        let combinedArray = array1.map((value, index) => ({ count: value, user_id: array2[index] }));

        combinedArray.sort((a, b) => {
            if (a.count === b.count) {
                return a.user_id.localeCompare(b.user_id);
            } else {
                return a.count - b.count;
            }
        });

        return combinedArray;
    }


}
