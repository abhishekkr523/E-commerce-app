// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   construc
//   return false;
// };

import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { SellerService } from "./services/seller.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{
  constructor(private sellerService:SellerService){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(localStorage.getItem('seller')){
      return true
    }
    return this.sellerService.isSellerLoggedIn;
  }
  
}
