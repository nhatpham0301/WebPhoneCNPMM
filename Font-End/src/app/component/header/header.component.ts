import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../utility.service';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { LoginServiceService } from '../../service/loginService/login-service.service';
import { LocalStorageService } from 'src/app/service/storage/local-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;
  flag = 0;

  userlg: boolean;

  //loggedIn: any;
  contactEnable: boolean;
  backEnable = { url: '', text: '' };
  cartCount: number;

  constructor(private _service: UtilityService,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private loginService: LoginServiceService,
    private localStorageService: LocalStorageService,) {

  }

  signOut(): void {
    this.authService.signOut();
    localStorage.removeItem('id_token');
    if (this.cookieService.get('token'))
      this.cookieService.delete('token');
    if (this.cookieService.get('token')) {
      this.flag = 1;
    } else {
      this.loginService.flagCookie == true
      this.flag = 0;
    }
    this.router.navigate(['home']);
  }


  ngOnInit() {
    this._service.contactEnable.subscribe(res => {
      this.contactEnable = res;
    });
    this._service.backEnable.subscribe(res => {
      this.backEnable = res;
    });
    this._service.cartCount.subscribe(res => {
      this.cartCount = res;
    });

    this.authService.authState.subscribe(async (user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }


  login() {
    this.router.navigate(['login']);
    this._service.cartCount.next(0);
  }


  // logout() {
  //   this._service.loggedIn.next({ name: '' });
  // }

  isLoggedIn() {
    var token = localStorage.getItem("id_token");
    if (token && this.cookieService.get('token')) return true;
    return false;
  }

}
