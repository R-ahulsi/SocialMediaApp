import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialMediaService } from 'app/social-media.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    email:string = ""
    password:string = ""

    constructor(private router: Router,
                private service: SocialMediaService,
                private cookie: CookieService) {}

    login() {
        // Code for handling the login process
        this.service.login(this.email, this.password).then(res => {
            if (res) {
                this.service.getUsername(this.email).then(username => {
                    this.cookie.set("user_id",username);
                })
                this.router.navigate(['/profile']);
            }
        })

        console.log(this.cookie.get("user_id"))
    }

    signUp() {
        // Navigate to the sign up page
        this.router.navigate(['signup']);
    }
}
