import { Component } from '@angular/core';
import { Photo } from 'app/dto/Photo';

@Component({
  selector: 'app-tags',
  templateUrl: './tag-images.component.html',
  styleUrls: ['./tag-images.component.css']
})
export class TagsComponent {
    photos:Photo[] = [];
    tag:string = "test tag"

}
