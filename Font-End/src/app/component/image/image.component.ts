import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from '../../utility.service';
import { Service } from '../../service/serviceproduct/service.service';
import { Product } from '../../service/serviceproduct/product.model'
import { from } from 'rxjs';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  products : Product [];
  constructor(private router: Router, private _service: UtilityService, private productService: Service) { 
    this.productService.getAllProducts().subscribe(res=>{
      this.products = res;
    })
  }

  ngOnInit() {
  }

}
