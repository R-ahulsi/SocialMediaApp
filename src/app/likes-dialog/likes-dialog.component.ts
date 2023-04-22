import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SocialMediaService } from 'app/social-media.service';

@Component({
  selector: 'app-likes-dialog',
  templateUrl: './likes-dialog.component.html',
  styleUrls: ['./likes-dialog.component.css']
})
export class LikesDialogComponent {

    @Input() likes:string[] = ["someone", "another person", "one more", ]; // input names of likes?

    constructor(public dialogRef:MatDialogRef<LikesDialogComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: any,
                private service: SocialMediaService) {}
        
    ngOnInit() {
        this.service.getLikesOnPhoto(this.data.photo_id).then(res =>
            this.likes = res
        )
    }

    close(): void {
        this.dialogRef.close();
    }
}
