import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from '../model/email';
import { SocialUser } from 'angularx-social-login';
import { DonHang } from '../model/donhang';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendMessage(donhang: DonHang) {
    return this.http.post('http://localhost:3000/sendmail',donhang);
  }

  addDonHang(donhang: DonHang) {
    console.log(donhang)
    return this.http.post('http://localhost:3000/donhang', donhang);
  }
}
