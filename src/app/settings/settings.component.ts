import { Component } from '@angular/core';
import { SocialMediaService } from 'app/social-media.service';

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

  constructor(private socialMediaService: SocialMediaService) {}
  
  onSubmit() {
    this.socialMediaService.updateUserInfo(this.model.change_fname, this.model.change_lname, this.model.password, 
                                            this.model.hometown, this.model.dob, this.model.gender);
  }
}
