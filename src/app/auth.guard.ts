import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookie: CookieService) {}

  canActivate(): boolean {
    if (this.cookie.get("user_id")!="") {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
