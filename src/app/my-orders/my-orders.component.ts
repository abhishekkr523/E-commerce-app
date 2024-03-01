import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {
  orderData: any[] | undefined;
  constructor(private product: ProductService) { }
  ngOnInit(): void {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
      console.log("ouderData", this.orderData)
    })
  }

  cancelOrder(orderId: number | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe((result) => {
      this.product.orderList().subscribe((result) => {
        this.orderData = result;
      })

    })
  }
 
}
