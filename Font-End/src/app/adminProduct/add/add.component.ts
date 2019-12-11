import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormsModule, NgForm, FormGroup } from '@angular/forms';
import { Service } from 'src/app/service/serviceproduct/service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/service/serviceproduct/product.model';
import { Observable } from 'rxjs';


declare var M: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  productForm: FormGroup;
  submitted = false;


  constructor(private fb: FormBuilder,
    private productService: Service,
    private router: Router, private zone: NgZone) { }

  ngOnInit() {

    this.productForm = this.fb.group({
      _id: [],
      TenSP: ['', Validators.required],
      MoTa: ['', Validators.required],
      ImageUrl: ['', Validators.required],
      Gia: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.productForm.valid) {

      this.productService.addProduct(this.productForm.value)
        .subscribe((data: any) => {
          console.log(data)
          if(data.success) {
           this.router.navigate(['adminProduct']);
          }
          
        }, (error) => {
          console.log(error)
        });
    }
  }

  // get the form short name to access the form fields
  get f() { return this.productForm.controls; }
}
