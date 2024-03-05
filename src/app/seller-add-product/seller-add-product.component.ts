import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.scss'
})
export class SellerAddProductComponent implements OnInit{
addProductMessage:string|undefined;
userName:any;
@ViewChild('addProduct') addProductForm: NgForm | undefined; // ViewChild to get the form reference

constructor(private product:ProductService){

}
ngOnInit(): void {
  const sellerDataString = localStorage.getItem('seller');
  console.log("kk",sellerDataString)
  if (sellerDataString) {
    const sellerData = JSON.parse(sellerDataString);
    this.userName = sellerData[0].name;
    console.log("kkk",this.userName)

  }
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
      }, 3000)
    })
    
  }
}
