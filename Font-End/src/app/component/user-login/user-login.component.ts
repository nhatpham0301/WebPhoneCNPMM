import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { MessageService } from 'src/app/service/message/message.service';
import { LoginServiceService } from 'src/app/service/loginService/login-service.service';
import { NotificationService } from 'src/app/service/notificationService/notification.service';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Email } from 'src/app/service/model/email';
import { LocalStorageService } from 'src/app/service/storage/local-storage.service';
import { DonHang } from 'src/app/service/model/donhang';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  gmail: SocialUser;
  emailModel: Email;
  email: String;
  cart: Array<any> = null;
  donhang : DonHang = {_id: null, TenKH: null, DonHang: null, Tien: null};
  pays: number;

  constructor(private messService: MessageService,
              private loginService: LoginServiceService,
              private router: Router,
              private notificationService: NotificationService,
              private authService: AuthService,
              private localStorageService: LocalStorageService,) {}

  
  fbLoginsendMail() {

    this.loginService.signInWithFB().then(() => {
      this.authService.authState.subscribe(async (user) =>{
        this.gmail = user;      
        this.donhang.TenKH = user;
        this.donhang.DonHang = this.cart;
        this.donhang.Tien = this.pays;
        this.messService.addDonHang(this.donhang).subscribe((data: any) =>{
 
         this.messService.sendMessage(this.donhang).subscribe((data: any) =>{   
           console.log(this.donhang)
                 });
          if(data.success)
          {
            this.notificationService.showSuccess("Đã đặt hàng");  
            this.localStorageService.remove("FURNITURE_CART");
            this.router.navigate(['home']);
          }
        });
        
       });
    }); 
   }

  ggLoginsendMail(){
    this.loginService.signInWithGoogle().then(() => {
      this.authService.authState.subscribe(async (user) =>{
       this.gmail = user;      
       this.donhang.TenKH = user;
       this.donhang.DonHang = this.cart;
       this.donhang.Tien = this.pays;
       this.messService.addDonHang(this.donhang).subscribe((data: any) =>{

        this.messService.sendMessage( this.donhang).subscribe((data: any) =>{   
          console.log(this.donhang)
                });
         if(data.success)
         {
           this.notificationService.showSuccess("Đã đặt hàng"); 
           this.localStorageService.remove("FURNITURE_CART");
           this.router.navigate(['home']);   
         }
       });
       
      });
    });
  }

  ngOnInit() {
    this.pays = 0;
    this.cart = this.localStorageService.getItem("FURNITURE_CART");
    for (let i = 0; i < this.cart.length; i++) {
      this.pays += this.cart[i].money
    }
  }

  

}
