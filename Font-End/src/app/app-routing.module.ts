import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { GalleryComponent } from './component/gallery/gallery.component';
import { ProductsComponent } from './component/products/products.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { ProductComponent } from './component/product/product.component';
import { LoginComponent } from './component/login/login.component';
import { AdminComponent} from './component/admin/admin.component';
import { CartComponent} from './component/cart/cart.component';
import { UserLoginComponent } from './component/user-login/user-login.component';


const routes: Routes = [
  {
    path: "", redirectTo: "home" , pathMatch: 'full'
  },
  {
    path: "home", component: HomeComponent
  },
  {
    path: "gallery", component: GalleryComponent
  },
  {
    path: "products", component: ProductsComponent
  },
  {
    path: "product/:id", component: ProductComponent
  },
  {
    path: "contact-us", component: ContactUsComponent
  },
  {
    path: "login", component: LoginComponent
  },
  {
    path: "admin", component: AdminComponent
  },
  {
    path: "adminProduct",
    loadChildren: './adminProduct/product.module#ProductModule'
  },
  {
    path: "cart", component: CartComponent
  },
  {
    path: "userlogin", component: UserLoginComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
