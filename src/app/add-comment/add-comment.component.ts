import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LikesDialogComponent } from 'app/likes-dialog/likes-dialog.component';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent {
    comment:string = ""

    constructor(public dialogRef:MatDialogRef<AddCommentComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: any) {}

    submitComment() {
        // save comment to database
        console.log(this.comment)
        this.dialogRef.close()
    }
}
