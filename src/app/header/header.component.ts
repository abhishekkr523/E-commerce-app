import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { json } from 'express';
import { ProductService } from '../services/product.service';
import { SellerService } from '../services/seller.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = "";
  searchResult: any[] | undefined;
  userName: any;
  cartItem = 0;

  constructor(private route: Router, private product: ProductService, private sellerService:SellerService,private userService:UserService) {
  }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        // console.log
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore ? JSON.parse(sellerStore) : null;
          this.sellerName = sellerData[0].name;
          console.log("sellerNamee", this.sellerName);
          this.menuType = "seller";
        } else if (localStorage.getItem('users')) {
          let userStore = localStorage.getItem('users');
          // let userData = userStore && JSON.parse(userStore);
          let userData = userStore ? JSON.parse(userStore) : null;

          // console.log("userdata",userData)
          this.userName = userData[0].name;
          this.menuType = "user";
          this.product.getCartList(userData.id)
        } else {
          console.log("outside seller");
          this.menuType = 'default'
        }
      }

    })
    
    // Subscribe to the sign-up success event from SellerService
    this.sellerService.signUpSuccess.subscribe(() => {
      this.menuType = 'seller'; // Update menu type after sign-up
    });
    
    this.userService.signUpSuccess.subscribe(() => {
      this.menuType = 'user'; // Update menu type after sign-up
    });

    let cartData = localStorage.getItem('localCart');

    if (cartData) {
      this.cartItem = JSON.parse(cartData).length;
      console.log("cartItemm", this.cartItem)
    }
    
    this.product.cartData.subscribe((result) => {
      console.log("resultt", result)
      this.cartItem = result.length;
    })
  }

  sellerLogout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }
  userLogout() {
    localStorage.removeItem('users');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }
  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.log("element", element.value);
      this.product.searchProduct(element.value).subscribe((result) => {
        console.log("searchProduct", result);
        this.searchResult = result;
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined;
  }


  submitSearch(val: any) {
    this.route.navigate([`search/${val}`]); // Use backticks for string interpolation
  }

  reDirectToDetails(val: number) {
    this.route.navigate(['/product-details/' + val])
  }
}
