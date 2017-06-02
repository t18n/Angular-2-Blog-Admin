import { Component, OnInit } from '@angular/core';
import { AppComponent } from './../app.component';
import { UserService } from './../login/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [UserService]
})
export class HeaderComponent implements OnInit {

  public userinfo: string;

  constructor(public app: AppComponent,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    if (this.app.isLoggedIn == false) {
     this.router.navigateByUrl('/');
    }
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getUserInfo().subscribe(
      data => {
        this.userinfo = data;
        this.userService.setUserID(data.id);
      }

    );
  }

  logOut() {
    this.userService.logout();
  }
}
