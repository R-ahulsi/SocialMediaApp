import { Component } from '@angular/core';

import { User } from '../dto/User';
import { SocialMediaService } from 'app/social-media.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  genders = ['M','F'];
  submitted=false;
  model = new User('','','','','','','','',0);

  constructor (private socialMediaService: SocialMediaService,
    private router: Router) {}

  onSubmit() {
    //if email already in database
      //send message that user exists
    if (this.socialMediaService.emailExists(this.model.email)) {

    }
    //else if username is in database
      //send message that username is taken
    else if (this.socialMediaService.usernameExists(this.model.user_id)) {

    }
    //else
      //add user to database
    else {
      this.socialMediaService.createUser(this.model);
      this.socialMediaService.setUsername(this.model.user_id);
      this.submitted = true;
      this.router.navigate(['/profile']);
    }
    
    
  }

  newUser() {
    this.model = new User('','','','','','','','',0);
  }
}
