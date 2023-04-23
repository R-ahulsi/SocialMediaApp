import { Component } from '@angular/core';

import { User } from '../dto/User';
import { SocialMediaService } from 'app/social-media.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'app/app.component';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  genders = ['M', 'F'];
  submitted = false;
  model = new User('', '', '', '', '', '', '', '', 0);

  emailexists = false;
  usernameexists = false;

  emailAlreadyInUse: boolean = false;

  constructor(
    private socialMediaService: SocialMediaService,
    private router: Router,
    private cookie: CookieService,
    private internalService: DataService
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.emailAlreadyInUse = false;
    }, 3000);
  }

  onSubmit() {
    this.socialMediaService.emailExists(this.model.email).then((res) => {
      this.emailexists = res;
      if (this.emailexists) {
        console.log('email exists');
        this.emailAlreadyInUse = true;
        this.model = new User('', '', '', '', '', '', '', '', 0);
      } else {
        this.socialMediaService
          .usernameExists(this.model.user_id)
          .then((res) => {
            this.usernameexists = res;
            if (this.usernameexists) {
              // send message that username is taken
              console.log('username exists');
            } else {
              bcrypt.hash(this.model.password, 10, (err, hash) => {
                if (err) {
                  console.error(err);
                } else {
                  this.model.password = hash;
                  this.socialMediaService.createUser(this.model, hash);
                  this.socialMediaService.setUsername(this.model.user_id);
                  this.submitted = true;
                  this.internalService.setData(true);
                  this.cookie.set('user_id', this.model.user_id);
                  this.router.navigate(['/profile']);
                }
              });
            }
          });
      }
    });
  }

  newUser() {
    this.model = new User('', '', '', '', '', '', '', '', 0);
  }
}
