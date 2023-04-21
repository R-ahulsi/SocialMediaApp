import { Component } from "@angular/core";
import { SocialMediaService } from "app/social-media.service";

@Component({
    selector: 'app-upload-photo',
    templateUrl: './upload-photo.component.html',
    styleUrls: ['./upload-photo.component.css']
})

export class UploadPhotoComponent {

    file:any;
    caption:string = "";
    albumId:string = "";
    tags:string = "";

    constructor(private service: SocialMediaService){}

    onSubmit() {
        // const photoInput = document.getElementById('photo') as HTMLInputElement;
        // const file = photoInput.files[0];
        // console.log(file);
    }

    setFile(event:any) {
        this.file = event
    }

    onPost() {
        const file = this.file.target.files[0];
        if(file) {
            const path = `images/${file.name}`
            this.service.postPhoto(path, file, this.caption, this.albumId, this.tags)
        }
    }
}