import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/service/serviceproduct/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/service/serviceproduct/product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  product : Product;
  editForm : FormGroup;
  submitted = false;

  constructor(private productService : Service,
    private route : ActivatedRoute,
    private formBuilder : FormBuilder,
    private router : Router) {
      // this.productService.getProductById(this.route.snapshot.params.id).subscribe(res =>{
      //   this.product = res;
      //   console.log(res);
      // })
      
     }

  ngOnInit() {

    let productId = localStorage.getItem("productId");
    console.log(productId);
    if(!productId){
      alert("Something wrong!");
      this.router.navigate(['/adminProduct']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      TenSP: ['', Validators.required],
      MoTa: ['', Validators.required],
      ImageUrl: ['', Validators.required],
      Gia: ['', Validators.required]
    });

    this.productService.getSingleProduct(String(this.route.snapshot.params.id)).subscribe(data => {
      console.log(data);
      this.editForm.patchValue(data);
    });
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  onSubmit(){
    this.submitted = true;
    
    if(this.editForm.valid){
      this.productService.updateProduct(this.editForm.value)
      .subscribe( (data:any) => {
        if(data.success) {
          this.router.navigate(['adminProduct']);
        }
      });
    }
  }

}
