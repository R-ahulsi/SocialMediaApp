import { Component } from '@angular/core';

import { User } from '../User';
import { SocialMediaService } from 'app/social-media.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  genders = ['M','F'];
  submitted=false;
  model = new User('','','','','','','','');

  constructor (private socialMediaService: SocialMediaService) {}

  onSubmit() {
    //if email already in database
      //send message that user exists
    //else if username is in database
      //send message that username is taken
    //else
      //add user to database
    this.socialMediaService.setUsername(this.model.user_id);
    this.submitted = true;
    
  }

  newUser() {
    this.model = new User('','','','','','','','');
  }
}
