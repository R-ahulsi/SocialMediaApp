import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LikesDialogComponent } from 'app/likes-dialog/likes-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { AddCommentComponent } from 'app/add-comment/add-comment.component';
import { SocialMediaService } from 'app/social-media.service';
import { Observable } from 'rxjs';
import { Photo } from 'app/dto/Photo';
import { Comment } from 'app/dto/Comment';
import { Tag } from 'app/dto/Tag';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.css']
})
export class SinglePhotoComponent {

    image:Blob | undefined;
    comments:Comment[] = []; // will probably need a comment object with commenter name and comment
    tags:string[] = [];
    likes:number = -1;
    userAccess:boolean = true;
    imagePath:string = "";

    imageUrl: string | undefined;
    @Input() photo_id: string = ""; // TODO: verify photo_id is passed in
    @Input() user_id: string = ""; //TODO: verify user_id is passed in


    constructor(public dialog:MatDialog,
                private service: SocialMediaService) {}

    ngOnInit() {
        // check if the photo is yours before you get access to delete
        // this.userAccess = false;
        this.getImage()
        this.getComments()
        this.getTags()
        this.getLikes()
    }

    // potential methods to get data from database
    getImage() {
        this.service.getPhotoData(this.photo_id).then(
            res => this.imageUrl = res
        )
    }

    getComments() {
        this.service.getCommentsForPhoto(this.photo_id).then(res =>
            this.comments = res
        )
    }

    getTags() {
        this.service.getTagsForPhoto(this.photo_id).then(res =>
            this.tags = res
        )
    }

    getLikes() {
        this.service.getNumberOfLikes(this.photo_id).then(res =>
            this.likes = res
        )
    }

    deletePost() {
        this.service.deletePhoto(this.photo_id)
    }

    showLikes(): void {
        const dialogRef = this.dialog.open(LikesDialogComponent, {
          width: '300px',
          height: '300px',
          data: {
            photo_id: this.photo_id
          }
        });
    }

    addComment(): void {
        const dialogRef = this.dialog.open(AddCommentComponent, {
          width: '500px',
          height: '500px',
          data: {
            photo_id: this.photo_id,
            user_id: this.user_id
          }
        });
    }

    getPhoto() {
        // use sanitizer to locally host image
        // https://stackblitz.com/edit/angular-display-base-64-image-url-domsanitizer?file=src%2Fapp%2Fapp.component.ts
    }
}
