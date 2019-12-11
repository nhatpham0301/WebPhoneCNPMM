import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule} from 'ngx-bootstrap/carousel';
import { HttpModule, Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from "rxjs";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { GalleryComponent } from './component/gallery/gallery.component';
import { ProductsComponent } from './component/products/products.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { HomeComponent } from './component/home/home.component';
import { ProductComponent } from './component/product/product.component';
import { ImageComponent } from './component/image/image.component';
import { LoginComponent } from './component/login/login.component';
import { HelpComponent } from './component/help/help.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { Service } from './service/serviceproduct/service.service';
import { HttpClientModule } from '@angular/common/http'; 
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AdminComponent } from './component/admin/admin.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import {LoginServiceService} from './service/loginService/login-service.service';
import { ToastrModule } from 'ngx-toastr';

import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './component/cart/cart.component';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import {GoogleLoginProvider} from 'angularx-social-login';
import { MatIconModule,MatButtonModule,MatCardModule } from '@angular/material';
import { from } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserLoginComponent } from './component/user-login/user-login.component';
import { MessageService} from './service/message/message.service';

export function getAuthHttp(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerName: 'x-access-token',
    noTokenScheme: true,
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http);
}

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("53940025879-oqqb83ek2ehv312nv2ct468elifpmmm9.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('438098213797636')
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GalleryComponent,
    ProductsComponent,
    ContactUsComponent,
    HomeComponent,
    ProductComponent,
    ImageComponent,
    LoginComponent,
    HelpComponent,
    AdminComponent,
    CartComponent,
    UserLoginComponent, 
  ],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    SocialLoginModule,
    AngularFontAwesomeModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          useFactory: jwtOptionsFactory,
          deps: [AuthService]
      }
  })

  ],
  providers: [
    MessageService,
    CookieService,
    LoginServiceService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function jwtOptionsFactory(authService) {
  return {
      tokenGetter: () => {
          return authService.getToken();
      },
  }
}
