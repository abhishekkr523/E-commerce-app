import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | any;
  productQuantity: number = 1;
  removeCart = false;
  cartData: any | undefined

  constructor(private activateRout: ActivatedRoute, private product: ProductService) {

  }
  ngOnInit(): void {
    let productId = this.activateRout.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: any) => productId == item.id.toString());
        if (items.length) {

          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('users');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {
          // let item = result.filter((item: any) => productId?.toString() === item.producId.toString());
          let item = result.filter((item: any) => item && productId && item.id && item.producId && productId === item.id.toString() && item.producId.toString());

          
          if (item.length) {
            this.cartData = item[0]
            this.removeCart = true;
          }
        })
      }

    })
  }
  handelQuantity(val: string) {
    if (this.productQuantity >= 0 && val === 'plus') {
      this.productQuantity += 1
    } else {
      if (this.productQuantity > 1)
        this.productQuantity -= 1
    }
  }
  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('users')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        console.log("user is log in");
        let user = localStorage.getItem('users');
        let userId = user && JSON.parse(user).id;
        let cartData: any = { ...this.productData, userId, productId: this.productData.id, }
        console.log("jjj", cartData);
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true
            alert("Product is added to cart");
          }
        })
      }

    }
  }

  removeToCart(producId: any) {
    if (!localStorage.getItem('users')) {
      this.product.removeItemFromCart(producId);
      
    } else {
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result)=>{
        let user = localStorage.getItem('users');
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
      })
      this.removeCart = false;
    }
  }
}
