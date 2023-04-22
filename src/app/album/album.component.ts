import { Album } from 'app/dto/Album';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'app/dto/Photo';
import { SocialMediaService } from '../social-media.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent {
  photos: Photo[] = [];

  constructor(private socialMediaService: SocialMediaService,
              private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    const album_id = String(this.route.snapshot.paramMap.get('album_id'));
    this.getImages();
  }

  getImages(): void {
    // Call the service to get the images
    this.socialMediaService.getAllPhotos();
  }

  onDelete() {
    const albumId = 'your_album_id_here'; // Replace with the actual album ID
    this.socialMediaService
      .deleteAlbum(albumId)
      .then(() => {
        // Reload the images after the album has been deleted
        this.getImages();
      })
      .catch((error) => {
        console.error('Error deleting album', error);
      });
  }

}
