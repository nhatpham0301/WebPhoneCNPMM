import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DonhangComponent} from './donhang/donhang.component'


const routes: Routes = [
  {
    path:'',
    component: ListComponent
  },
  {
    path:'add',
    component: AddComponent
  },
  {
    path:'edit/:id',
    component: EditComponent
  },
  {
    path:'donhang',
    component: DonhangComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
