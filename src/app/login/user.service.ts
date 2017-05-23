import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { LoginData } from './login';
import { HttpClient } from './../HttpClient';
import { AppComponent } from './../app.component';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from './../../environments/environment';

@Injectable()
export class UserService {

    router: Router;

    constructor(private http: HttpClient,
        private app: AppComponent,
        _router: Router) {
        this.router = _router;
    }

    login(login: LoginData): Observable<LoginData> {
        return this.http.post('http://api.sowable.com/oauth/token', login)
            .map(res => res.json() as LoginData)
            .catch(this.handleError)
    }

    logout() {
        this.app.isLoggedIn = false;
        this.setAccessToken('');
        this.router.navigateByUrl('/');
    }



    // register(register: Register): Observable<Register> {
    //     return this.http.post(environment.apiRoute + 'register', register)
    //         .map(res => res.json() as Register)
    //         .catch(this.handleError)
    // }



    setAccessToken(token: string): void {
        this.http.setAccessToken(token);
    }

    public getUserInfo() {
        return this.http.get('http://api.sowable.com/user')
            .map(res => res.json());
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.json().error);
    }
}
