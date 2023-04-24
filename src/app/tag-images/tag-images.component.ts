import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from 'app/dto/Photo';
import { SocialMediaService } from 'app/social-media.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-tags',
  templateUrl: './tag-images.component.html',
  styleUrls: ['./tag-images.component.css'],
})
export class TagsComponent {
  photos: Photo[] = [];
  tag: string = "";

  constructor(private socialMediaService: SocialMediaService,
              private cookie: CookieService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    // this.getImages();
    this.tag = String(this.route.snapshot.paramMap.get('tag'));
    this.getPhotos()
  }

  getPhotos() {
    this.socialMediaService.getAllPhotosWithTag(this.tag).then(res => {
        this.photos = res
    })
  }

  getUsersPhotos() {
    this.socialMediaService.getUsersPhotosWithTag(this.tag, this.cookie.get('user_id')).then(res => {
        this.photos = res
    })
  }

  routeToPhotoPage(photo:Photo) {
    this.router.navigate([`/singlephoto/${photo.photo_id}`])
  }

}
