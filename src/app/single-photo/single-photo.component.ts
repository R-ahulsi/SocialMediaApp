import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LikesDialogComponent } from 'app/likes-dialog/likes-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AddCommentComponent } from 'app/add-comment/add-comment.component';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.css']
})
export class SinglePhotoComponent {

    image:Blob | undefined;
    comments:string[] = []; // will probably need a comment object with commenter name and comment
    tags:string[] = [];
    likes:string[]= [];
    userAccess:boolean = true;

    constructor(public dialog:MatDialog,
                private sanitizer: DomSanitizer) {}

    OnInit() {
        // check if the photo is yours before you get access to delete
        // this.userAccess = false;
    }

    // potential methods to get data from database
    getImage() {}

    getComments() {}

    getTags() {}

    getLikes() {}

    deletePost() {
        console.log("delete photo")
    }

    showLikes(): void {
        const dialogRef = this.dialog.open(LikesDialogComponent, {
          width: '300px',
          height: '300px'
        });
    }

    addComment(): void {
        const dialogRef = this.dialog.open(AddCommentComponent, {
          width: '500px',
          height: '500px'
        });
    }

    getPhoto() {
        // use sanitizer to locally host image
        // https://stackblitz.com/edit/angular-display-base-64-image-url-domsanitizer?file=src%2Fapp%2Fapp.component.ts
    }
}
