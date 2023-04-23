import { Album } from 'app/dto/Album';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from 'app/dto/Photo';
import { SocialMediaService } from '../social-media.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent {
  photos: Photo[] = [];
  album_id:string = ""
  albumName: string = ""
  isOwner:boolean = false;

  constructor(private socialMediaService: SocialMediaService,
              private route: ActivatedRoute,
              private cookie: CookieService,
              private router: Router) {}
  
  ngOnInit(): void {
    this.album_id = String(this.route.snapshot.paramMap.get('album_id'));
    this.socialMediaService.getAlbumName(this.album_id).then(res => {
        this.albumName = res
    })
    this.getImages();
    this.checkOwner();
  }

  getImages(): void {
    // Call the service to get the images
    this.socialMediaService.getPhotosByAlbumId(this.album_id).then(res => {
        this.photos = res
    });
  }

  onDelete() {
    const albumId = this.album_id; // Replace with the actual album ID
    this.socialMediaService.deleteAlbum(albumId)
      .then(() => {
        // Reload the images after the album has been deleted
        this.getImages();
        this.router.navigate(['profile']);
      })
      .catch((error) => {
        console.error('Error deleting album', error);
      });
  }

  checkOwner() {
    this.socialMediaService.getAlbumUserID(this.album_id).then(res => {
        if(res.toString() == this.cookie.get('user_id')) {
            this.isOwner = true
        }
    })
  }

}
