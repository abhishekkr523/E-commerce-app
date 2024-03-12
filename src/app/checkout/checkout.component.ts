import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: any | undefined
  ordersms: string | undefined

  constructor(private product: ProductService, private route: Router) {

  }

  ngOnInit(): void {
    this.product.currentCard().subscribe((result) => {

      let price = 0;
      this.cartData = result;
      result.forEach((item) => { price += (+item.price * item.quantity); });
      this.totalPrice = price - price / 10 + price / 20 + price / 50;
    });
  }
  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('users');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: any = {
        ...data,
        totalPrice: this.totalPrice, userId
      }
      this.cartData?.forEach((item: any) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id)
        }, 700);
      })
      this.product.order(orderData).subscribe((result) => {
        if (result) {
          this.ordersms = "your order has been placed"
          setTimeout(() => {
            this.route.navigate(['my-orders'])
            this.ordersms = undefined
          }, 4000);
        }
      })
    }

  }
}
