import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../../utility.service';
import { Service } from '../../service/serviceproduct/service.service';
import {Product} from '../../service/serviceproduct/product.model'
import { LocalStorageService } from '../../service/storage/local-storage.service';
import { NotificationService } from '../../service/notificationService/notification.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  pay: number;
  count: number;
  products : Product [];
  constructor(private router: Router, private _service: UtilityService,
     private productService: Service,
     private localStorageService: LocalStorageService,
     private notificationService: NotificationService) { 
    this.productService.getAllProducts().subscribe(res=>{
      this.products = res;
    })
  }

  ngOnInit() {
    this._service.cartCount.subscribe(res => {
      this.count = res;
    });
  }
  
  productHome(id) {
    this.router.navigate(['product/'+id]);
    this._service.backEnable.next({url: 'products', text: 'Back to Products'});
  }

  addToCart(event, product) {
    this.pay =0;
    event.stopPropagation();
    this.count = this.count + 1;
    this._service.cartCount.next(this.count);

    let results = false
    let cartItems = this.localStorageService.getItem("FURNITURE_CART") ? this.localStorageService.getItem("FURNITURE_CART") : []
   
    if (cartItems) {
        let isExist = false
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i]._id === product._id) {
                cartItems[i].quantity += 1;
                cartItems[i].money = cartItems[i].quantity * product.Gia;
               // cartItems[i].pay += cartItems[i].money;
                isExist = true
                results = true
              
            }
            
        }
        if (!isExist) {
            var cartItem = product
            cartItem.quantity = 1;
            cartItem.money = cartItem.quantity * product.Gia;
            //cartItem.pay += cartItem.money;
            cartItems.push(cartItem)
        }
        this.localStorageService.setItem("FURNITURE_CART", cartItems)
        results = true
    } else {
        cartItems = []
        var cartItem = product
        cartItem.quantity = 1
        cartItems.push(cartItem)
        this.localStorageService.setItem("FURNITURE_CART", cartItems)
        results = true
    }
    if (results) {
        this.notificationService.showSuccess("Thêm vào giỏ hàng thành công !!")
      
    } else {
        this.notificationService.showSuccess("Thêm vào giỏ hàng thất bại !!")
      
    }
    this.router.navigate(['cart']);

    // end
  }
 
}
  


