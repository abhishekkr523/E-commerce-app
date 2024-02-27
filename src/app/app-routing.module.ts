import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellersAuthComponent } from './sellers-auth/sellers-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'seller', component:SellersAuthComponent
  },
  {
    path:'seller-home', component:SellerHomeComponent,canActivate:[AuthGuard]
  },
  {path:'sellerAddProduct', component:SellerAddProductComponent,canActivate:[AuthGuard]},
  {
    path:'seller-update-product/:id', component:SellerUpdateProductComponent
  },
  {
    path:'search/:query', component:SearchComponent
  },
  {
    path:'product-details/:productId', component:ProductDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
