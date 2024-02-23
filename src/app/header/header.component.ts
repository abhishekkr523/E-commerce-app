import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { json } from 'express';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = "";

  constructor(private route: Router) {
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
            console.log("sellerName",this.sellerName)
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
}
