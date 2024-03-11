import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.scss'
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | any;
  productMessage: undefined | any;

  constructor(private route: ActivatedRoute, private product: ProductService,private router:Router) {

  }
  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.product.getProduct(productId).subscribe((data) => {
      this.productData = data;
      console.log("u",this.productData)
    })
  }

  submit(data: any) {
    console.log("vv",data)
    this.product.updateProduct(data).subscribe((result:any) => {
      if (result) {
        console.log("nn",result)
        this.productMessage = "Product has updated";
      }
    });
    this.redirect()
  }
  redirect(){
    this.router.navigate(['seller-home']);
  }
  
}
