import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SocialMediaService } from "app/social-media.service";

@Component({
    selector: 'app-upload-photo',
    templateUrl: './upload-photo.component.html',
    styleUrls: ['./upload-photo.component.css']
})

export class UploadPhotoComponent {
    file: any;
    caption = '';
    albumId = '';
    tags = '';
  
    constructor(private service: SocialMediaService,
                private router: Router) {}
  
    setFile(event: any){
      this.file = event;
    }
  
    async onPost(){
      const file = this.file.target.files[0];

      if (file){
        const path = `images/${file.name}`;
        await this.service.postPhoto(path, file, this.caption, this.albumId, this.tags);
        this.caption = '';
        this.albumId = '';
        this.tags = '';
      }

      this.router.navigate(['profile']);
    }
  }

// export class UploadPhotoComponent {

//     file:any;
//     caption:string = "";
//     albumId:string = "";
//     tags:string = "";

//     constructor(private service: SocialMediaService){}

//     onSubmit() {
//         // const photoInput = document.getElementById('photo') as HTMLInputElement;
//         // const file = photoInput.files[0];
//         // console.log(file);
//     }

//     setFile(event:any) {
//         this.file = event
//     }

//     onPost() {
//         const file = this.file.target.files[0];
//         if(file) {
//             const path = `images/${file.name}`
//             this.service.postPhoto(path, file, this.caption, this.albumId, this.tags)
//         }
//     }
// }