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

  emailexists = false;
  usernameexists = false;

  constructor (private socialMediaService: SocialMediaService,
    private router: Router) {}

  onSubmit() {

    //if email already in database
      //send message that user exists
    this.socialMediaService.emailExists(this.model.email).then(res => this.emailexists=res);
    this.socialMediaService.usernameExists(this.model.user_id).then(res => this.usernameexists = res);
    if (this.emailexists) {

    }
    //else if username is in database
      //send message that username is taken
    
    else if (this.usernameexists) {

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
