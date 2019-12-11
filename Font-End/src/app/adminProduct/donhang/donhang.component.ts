import { Component, OnInit } from '@angular/core';
import { getDonHang } from 'src/app/service/model/getdonhang';
import { Service } from 'src/app/service/serviceproduct/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donhang',
  templateUrl: './donhang.component.html',
  styleUrls: ['./donhang.component.scss']
})
export class DonhangComponent implements OnInit {

  public donhangs: getDonHang[];
  public productDH: Array<any>;

  constructor(private productService: Service,
              private router: Router) { }

  ngOnInit() {
    this.getAllDonHang();
  }

  getAllDonHang() : void {
    this.productService.getAllDonHang().subscribe(res =>{
      this.donhangs = res;
    });
  }

}
