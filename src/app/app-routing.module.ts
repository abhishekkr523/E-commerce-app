import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellersAuthComponent } from './sellers-auth/sellers-auth.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'seller', component:SellersAuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
