import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) {}

  login() {
    // Code for handling the login process
  }

  signUp() {
    // Navigate to the sign up page
    this.router.navigate(['signup']);
  }
}
