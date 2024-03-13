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


  constructor(private route: Router, private product: ProductService, private sellerService: SellerService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore ? JSON.parse(sellerStore) : null;
          this.sellerName = sellerData.name;
          this.menuType = "seller";
        } else if (localStorage.getItem('users')) {
          let userStore = localStorage.getItem('users');
          let userData = userStore ? JSON.parse(userStore) : null;
          this.userName = userData.name;
          this.menuType = "user";
          this.product.getCartList(userData.id)
        } else {
          this.menuType = 'default'
        }
      }

    })

    // Check local storage for menu type
    const menuType = localStorage.getItem('menuType');
    if (menuType === 'seller') {
      this.menuType = 'seller';
    } else if (menuType === 'user') {
      this.menuType = 'user';
    } else {
      this.menuType = 'default';
    }

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
    }

    this.product.cartData.subscribe((result) => {
      console.log("resulttb", result)
      this.cartItem = result.length;
    })


  }


  sellerLogout() {
    localStorage.removeItem('seller');
    localStorage.removeItem('menuType');

    this.route.navigate(['/seller']);
    let data = JSON.parse(localStorage.getItem("localCart") || "null")?.length;
    this.cartItem = data;
  }

  userLogout() {
    localStorage.removeItem('users');
    localStorage.removeItem('menuType');
    this.route.navigate(['/user-auth']);

    let data = JSON.parse(localStorage.getItem("localCart") || "null")?.length;
    this.cartItem = data;

  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
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
