import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from '../storage/local-storage.service';



declare const FB: any;
declare const gapi: any;


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  public flagCookie: any;


  constructor(private http: AuthHttp,
     private authService: AuthService,
     private cookieService: CookieService,
     private localStorageService: LocalStorageService,) { }

  signInWithGoogle() {
    return new Promise((resolve, reject) => {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialUser => {
        if (socialUser) {
          return this.http.post(`http://localhost:3000/auth/google`, { access_token: socialUser.authToken })
            .toPromise()
            .then(response => {
              var token = response.headers.get('x-auth-token');
              if (token) {
                localStorage.setItem('id_token', token);
                this.cookieService.set('token', token, 10 / (3600 * 24)); // 2p
                console.log(token);
              }
              resolve(response.json());
            })
            .catch(() => reject());

        } else {
          reject();
        }
      })
    })
  } 

  signInWithFB() {
    return new Promise((resolve, reject) => {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(socialUser => {
        if (socialUser) {
          return this.http.post(`http://localhost:3000/auth/facebook`, { access_token: socialUser.authToken })
            .toPromise()
            .then(response => {
              var token = response.headers.get('x-auth-token');
              if (token) {
                localStorage.setItem('id_token', token);
                this.cookieService.set('token', token, 10 / (3600 * 24));
                console.log(token);
              }
              resolve(response.json());
            })
            .catch(() => reject());
        } else {
          reject();
        }
      })
    })
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  isLoggedIn() {
    var token = localStorage.getItem("id_token");
    if (token) return true;
    return false;
  }
}
