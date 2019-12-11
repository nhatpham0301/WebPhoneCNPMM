import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/service/serviceproduct/product.model';
import { Service } from 'src/app/service/serviceproduct/service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/utility.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public products : Product[];

  constructor(private productService : Service, private router : Router, private _service: UtilityService) { }

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(res=>{
      this.products = res;
    });
  };

  addProduct(): void {
    this.router.navigate(['']);
  }

  deleteProduct(product : Product){
    
    this.productService.deleteProduct(product._id).subscribe(data=>{
      console.log(data);
      this.getAllProducts();
    });
  }

  updateProduct(product : Product){
    
    localStorage.removeItem("productId");
    localStorage.setItem("productId", product._id);
    this.router.navigate(['adminProduct/edit']);
  }

  updateProduct1(id) {
    this.router.navigate(['adminProduct/edit/'+id]);
    //this._service.backEnable.next({url: 'products', text: 'Back to Products'});
  }

}
