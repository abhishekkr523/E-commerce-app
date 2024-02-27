import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.scss'
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | any;
  productMessage: undefined | any;

  constructor(private route: ActivatedRoute, private product: ProductService) {

  }
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.product.getProduct(productId).subscribe((data) => {
      console.log(data);
      this.productData = data;
    })
  }

  submit(data: any) {
    console.log("jj", data);
    this.product.updateProduct(data).subscribe((result:any) => {
      if (result) {
        console.log("pp",result)
        this.productMessage = "Product has updated";
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000)
  }
  redirect(){
    // this.route.navigate(['/home/'])
  }
  
}
