import { Component } from '@angular/core';

import { User } from '../User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  genders = ['M','F'];
  submitted=false;
  model = new User('','','','','','','','');

  onSubmit() {
    //if email already in database
      //send message that user exists
    //else
      //add user to database
    this.submitted = true;
    
  }

  newUser() {
    this.model = new User('','','','','','','','');
  }
}
