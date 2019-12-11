import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AbstractControl, FormGroup, FormControl, Validators} from '@angular/forms';
import { LoginServiceService } from '../../service/loginService/login-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedIn: boolean;

  loginForm: FormGroup;
  constructor(private router: Router,
    private loginService: LoginServiceService,
    private _router:Router,
    private cookieService: CookieService) {
    
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

   }


   fbLogin() {
    this.loginService.signInWithFB().then(() => {
      this.router.navigate(['adminProduct']);
    });  }

  ggLogin(){
    this.loginService.signInWithGoogle().then(() => {
      this.router.navigate(['adminProduct']);
    });
  }

  ngOnInit() {
  }

  logintest() {

    
  //   console.log(this.loginForm.value);
  //   if(this.loginForm.valid)
  //   {
  //   this.productService.login(this.loginForm.value)
  //   .subscribe(
  //     data => {
  //       console.log(data);
  //       localStorage.setItem('token', data.toString());
        
  //     },
  //     error => {}
  //   );
  //   this.router.navigate(['adminProduct']);
   
  //  }
  }
}
