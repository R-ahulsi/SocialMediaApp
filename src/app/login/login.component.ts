import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'app/app.component';
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
                private cookie: CookieService,
                private internalService: DataService) {}

    login() {
        // Code for handling the login process
        this.service.login(this.email, this.password).then(res => {
            if (res) {
                this.service.getUsername(this.email).then(username => {
                    this.cookie.set("user_id",username);
                    console.log(this.cookie.get("user_id"))

                    this.internalService.setData(true);
                    this.router.navigate(['/profile'])
                })
            }
        })
    }

    signUp() {
        this.router.navigate(['signup']);
    }
}
