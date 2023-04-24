import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Photo } from 'app/dto/Photo';
import { SearchPageComponent } from 'app/search-page/search-page.component';
import { SocialMediaService } from 'app/social-media.service';

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.css']
})
export class AllPhotosComponent {
  photos: Photo[] = [];

  constructor (
    private service: SocialMediaService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getAllPhotos();
  }

  getAllPhotos() : void {
    this.service.getAllPhotos().then(res=>{
      this.photos=res;
    })
  }

  routeToPhotoPage(photo:Photo) {
    this.router.navigate([`/singlephoto/${photo.photo_id}`])
  }
}
