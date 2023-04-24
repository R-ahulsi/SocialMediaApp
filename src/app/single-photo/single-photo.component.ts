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
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.css']
})
export class SinglePhotoComponent {

    comments:Comment[] = [];
    tags:string[] = [];
    likes:number = -1;
    userAccess:boolean = true;
    imageUrl: string | undefined;
    caption:string = "";

    photo_id: string = "";

    constructor(public dialog:MatDialog,
                private service: SocialMediaService,
                private cookie: CookieService,
                private route: ActivatedRoute) {}

    ngOnInit() {
        // check if the photo is yours before you get access to delete
        // this.userAccess = false;
        this.photo_id = String(this.route.snapshot.paramMap.get('photo_id'))
        this.getImage()
        this.getComments()
        this.getTags()
        this.getLikes()
        this.getCaption()
    }

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

    getCaption() {
        this.service.getCaption(this.photo_id).then(res => 
            this.caption = res
        )
    }

    deletePost() {
        this.service.deletePhoto(this.photo_id)
    }

    like() {
        this.service.alreadyLiked(this.cookie.get('user_id'), this.photo_id).then(res => {
            if(res) {
                // already liked
            }
            else {
                this.service.likePhoto({
                    photo_id: this.photo_id,
                    user_id: this.cookie.get('user_id')
                })
            }
        })
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
            user_id: this.cookie.get('user_id')
          }
        });
    }
}
