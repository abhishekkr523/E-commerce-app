import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { json } from 'express';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = "";
  searchResult : any[] | undefined;

  constructor(private route: Router, private product: ProductService) {
  }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.log("in seller area");
          this.menuType = "seller";
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            console.log("sellerName", this.sellerName)
          }
        } else {
          console.log("outside seller");
          this.menuType = 'default'
        }
      }

    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.log("element",element.value);
      this.product.searchProduct(element.value).subscribe((result) => {
        console.log("searchProduct", result);
        this.searchResult = result;
      })
    }
  }
  hideSearch(){
    this.searchResult=undefined;
  }


  submitSearch(val: any) {
    console.log("kk", val);
    this.route.navigate([`search/${val}`]); // Use backticks for string interpolation
}

reDirectToDetails(val:number){
  this.route.navigate(['/product-details/'+val])
}
}
