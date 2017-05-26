import { Component, OnInit } from '@angular/core';
import { LoginData } from './login';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AppComponent } from './../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  
  loginData: LoginData = new LoginData();
  error: string;
  router: Router;
  logindata: any;

  constructor(
    _router: Router,
    private userService: UserService,
    private app: AppComponent) {
    this.router = _router;
  }

  ngOnInit() {
  }
  public login(): void {
    this.error = '';
    this.userService.login(this.loginData).subscribe(
      data => {
        this.handleSuccess(data);
        error => this.handleError(error);
      });
  }
  private handleSuccess(data: any) {
    this.userService.setAccessToken(data.token_type + ' ' + data.access_token);
    // this.app.userPartyId = data.PARTY_ID;
    this.app.isLoggedIn = true;
    this.router.navigateByUrl('/dashboard');
  }

    private handleError(error: any) {
    this.error = error;
  }

}
