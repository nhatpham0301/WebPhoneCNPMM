import { Component, OnInit } from '@angular/core';
import { Product } from '../../service/serviceproduct/product.model';
import { UtilityService } from '../../utility.service';
import { Service } from '../../service/serviceproduct/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../service/storage/local-storage.service';
import { NotificationService } from '../../service/notificationService/notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Array<any> = null
  count: number;
  pays: number;

  constructor(
    private _service: UtilityService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private notificationService: NotificationService) {


      // this.productService.getSingleProduct(String(this.route.snapshot.params.id)).subscribe(res => {
      //   this.product = res;
      //   this.listProduct.push(this.product);
      // });
     }

  get total() {
      let total = 0;
      this.cart.forEach(item => {
          total += item.price * item.quantity
      })
      return Number(total)
  }


removeCartItem(event,item) {
  event.stopPropagation();
  this.count = this.count - 1;
  this._service.cartCount.next(this.count);
  
    for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i]._id === item._id) {         
            this.pays = this.pays - this.cart[i].money; 
            this.cart.splice(i, 1);
        }
    }
    this.localStorageService.setItem("FURNITURE_CART", this.cart);
    this.notificationService.showSuccess("Đã xóa khỏi giỏ hàng");
}

pay() {
  this.router.navigate(['/userlogin']);
}


  ngOnInit() {
    this.pays = 0;
    this.cart = this.localStorageService.getItem("FURNITURE_CART")
    for (let i = 0; i < this.cart.length; i++) {
      this.pays += this.cart[i].money
    }
  }

}
