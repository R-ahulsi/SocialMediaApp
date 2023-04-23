import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
    constructor(private cookie : CookieService) {}
    logout() {
        console.log(this.cookie.get('user_id'), "logged out")
        // this.cookie.delete('user_id')
        this.cookie.deleteAll()
    }
}