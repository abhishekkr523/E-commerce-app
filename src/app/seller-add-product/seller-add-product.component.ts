import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.scss'
})
export class SellerAddProductComponent {
addProductMessage:string|undefined;
@ViewChild('addProduct') addProductForm: NgForm | undefined; // ViewChild to get the form reference

constructor(private product:ProductService){

}

  submit(data: any){
    console.log("product info",data);
    this.product.addProduct(data).subscribe((result)=>{
      console.log("product result",result);
      if(result){
        this.addProductMessage="Product is successfully added";
        if (this.addProductForm) {
          this.addProductForm.resetForm(); // Reset the form
        }

      }
      setTimeout(() => {
        this.addProductMessage = undefined;
        console.log("hii")
      }, 3000)
    })
    
  }
}