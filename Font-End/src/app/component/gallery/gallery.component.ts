import { Component, OnInit } from '@angular/core';
import { Service } from '../../service/serviceproduct/service.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  images=[];

  constructor(private productService: Service) { 
    this.productService.getAllProducts().subscribe(res=>{
      this.images = res;
      this.images.concat(this.images);
    })
  }

 // images = [];

 
 // constructor(){}
  ngOnInit() {

    //const a = [{"name": "Apple", "src": "brand3.qng"}];
   //this.images.push(a);

  };

}
