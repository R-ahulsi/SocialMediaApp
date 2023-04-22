import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  model = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    dob: '',
    hometown: '',
    gender: ''
  };

  //form submission
  onSubmit() {
    // TODO: Implement backend code
    console.log(this.model); // test
  }

  //logout button click
  onLogout() {
    // TODO: Implement backend code
    console.log('Logged out'); // test
  }
}
