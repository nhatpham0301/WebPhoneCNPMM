import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../utility.service';
import { Service } from '../../service/serviceproduct/service.service';
import { ActivatedRoute } from '@angular/router';
import {Product} from '../../service/serviceproduct/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: Product;
  constructor(private _service: UtilityService, private productService:Service, private route: ActivatedRoute) { 
    
    this.productService.getSingleProduct(String(this.route.snapshot.params.id)).subscribe(res => {
      this.product = res;
    });
  }

  ngOnInit() {

  }


  ngOnDestroy() {
    this._service.backEnable.next({url: '', text: ''});
  }
}
