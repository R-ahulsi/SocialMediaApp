import { Component } from '@angular/core';
import { SocialMediaService } from 'app/social-media.service';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  model = {
    change_fname: '',
    change_lname: '',
    password: '',
    hometown: '',
    dob: new Date(),
    gender: ''
  };

  genders = ['M', 'F'];
  hashedPassword = '';

  constructor(private socialMediaService: SocialMediaService,
              private router: Router) {}
  
  onSubmit() {
    bcrypt.hash(this.model.password, 10, (err, hash) => {
      if (err) {
        console.error(err);
      } else {
        this.model.password = hash;
        this.socialMediaService.updateUserInfo(this.model.change_fname, this.model.change_lname, this.model.password, 
                                                this.model.hometown, this.model.dob, this.model.gender);
        this.router.navigate(['/profile']);
      }
    });
  }
}