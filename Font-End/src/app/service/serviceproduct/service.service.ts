import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { getDonHang } from '../model/getdonhang';

declare const FB: any;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class Service {

  api = "http://localhost:3000"; 
  constructor(private httpClient: HttpClient,
     private authService: AuthService) { }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.api+"/products");  
  }

  getAllDonHang(): Observable<getDonHang[]>{
    return this.httpClient.get<getDonHang[]>(this.api +"/donhang");
  }

  public getSingleProduct(id: String): Observable<Product> {
    return this.httpClient.get<Product>(this.api+"/products/"+id);
  }
  
  login(body:any) {
    return this.httpClient.post(this.api + "/admins/login", body,{
      observe: 'body'
    });
  }

  getProductById(id: string){
    return this.httpClient.get<Product>(this.api + '/products' + '/' + id);
  }

  addProduct(product: Product){
    return this.httpClient.post(this.api + '/products', product);
  }

  addProduct1(product: Product): Observable<Product>{
    return this.httpClient.post<Product>(this.api + '/products', product);
  }

  deleteProduct(id: string){
    return this.httpClient.delete(this.api + '/products' + '/' + id);
  }

  updateProduct(product: Product){
    return this.httpClient.put(this.api+ '/products' + '/' + product._id, product);
  }


}
