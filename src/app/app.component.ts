import { Component, EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'social-media-app';

  userLoggedIn: boolean =false;

  constructor(private cookie: CookieService,
              private internalService: DataService,
              private authGuard: AuthGuard,
              private location: Location) {}

  ngOnInit() {
     if(this.cookie.get('user_id') != '') {
         this.userLoggedIn = true;
     }
    //this.internalService.getData().subscribe(data => {
      //  this.userLoggedIn = data;
    //})

    console.log(this.cookie.get('user_id'));
    

    //this.userLoggedIn = this.authGuard.canActivate();
  

    console.log(this.userLoggedIn);
    
  }

  ngOnChanges() {
    if(this.cookie.get('user_id') != '') {
        this.userLoggedIn = true;
    }
    console.log("changes");
  }

//   loginEvent(loginMessage: string) {
//     loginMessage === "loggedin" ? this.userLoggedIn = true : this.userLoggedIn = false;
//   }
}

@Injectable({
    providedIn: 'root'
})

export class DataService {
        private data = new BehaviorSubject<boolean>(false);
  
    getData() {
        return this.data.asObservable();
    }
  
    setData(data: boolean) {
        this.data.next(data);
    }
}