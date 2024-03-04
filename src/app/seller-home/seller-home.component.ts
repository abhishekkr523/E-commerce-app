import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { faTrash, faUserPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.scss'
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | any[]
  productMessage: undefined | string;
  icon1 = faTrash;
  icon2 = faUserPen;

  constructor(private product: ProductService) {

  }
  ngOnInit(): void {
    this.list();
  }

  deleteProduct(id: number) {
    this.product.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = "Product is deleted";
        this.list();
      }
    })
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000)
  }

  list() {
    this.product.productList().subscribe((result) => {
      if (result) {
        this.productList = result
      }
    })
  }

  editProduct(id: any) {

  }
}
