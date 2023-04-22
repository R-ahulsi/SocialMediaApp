import { Component, OnInit } from '@angular/core';
import { Photo } from 'app/dto/Photo';
import { SocialMediaService } from '../social-media.service';


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent {
    photos: Photo[] = [];

    constructor(private socialMediaService: SocialMediaService) {}
  
    ngOnInit(): void {
      this.getImages();
    }
  
    getImages(): void {
      this.socialMediaService.getAllPhotos()
    }
}
