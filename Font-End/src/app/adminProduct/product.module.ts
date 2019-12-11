import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { DonhangComponent} from './donhang/donhang.component';


@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent, DonhangComponent],
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
