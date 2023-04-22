import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comment } from 'app/dto/Comment';
import { LikesDialogComponent } from 'app/likes-dialog/likes-dialog.component';
import { SocialMediaService } from 'app/social-media.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {
    comment:string = ""

    constructor(public dialogRef:MatDialogRef<AddCommentComponent>,
                private service:SocialMediaService,
                @Inject(MAT_DIALOG_DATA) public data: any) {}

    submitComment() {
        var newComment:Comment = {
            comment_date: new Date().toISOString(),
            comment_id: uuid.v4().toString(),
            photo_id: this.data.photo_id,
            text: this.comment,
            user_id: this.data.user_id

        }
        this.service.newComment(newComment)
        this.dialogRef.close()
    }
}
