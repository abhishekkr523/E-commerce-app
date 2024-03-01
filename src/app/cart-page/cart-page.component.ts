import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
cartData:any[] | undefined;
cartSummary:any={
  price:0,
  diacount:0,
  tax:0,
  delivery:0,
  total:0,
}

constructor(private product:ProductService){

}
// ngOnInit(): void {
//   this.product.currentCard().subscribe((result)=>{
//     this.cartData=result;
//     let price=0;
//     result.forEach((item)=>{price + +item.price});
//     this.cartSummary.price=price;

//     console.log("price",this.cartSummary.price)
//     this.cartSummary.discount=price/10;
//     this.cartSummary.tax=price/10;
//     this.cartSummary.delivery/100;
//     this.cartSummary.total=price+(price/10)+100-(price/10);
//     console.log("yyy",this.cartSummary)
//   })
// }
ngOnInit(): void {
  this.product.currentCard().subscribe((result) => {
    this.cartData = result;
    console.log("result",result)
    let price = 0;
    result.forEach((item) => { price += (+item.price * item.quantity); });
    this.cartSummary.price = price;

    console.log("price", this.cartSummary.price);
    this.cartSummary.discount = price / 10;
    this.cartSummary.tax = price / 20;
    this.cartSummary.delivery = price/50; 
    this.cartSummary.total = this.cartSummary.price - this.cartSummary.discount +this.cartSummary.tax + this.cartSummary.delivery;
    console.log("cartsummary",this.cartSummary)
  });
}

}
