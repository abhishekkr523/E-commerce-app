import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
productData:undefined | any;
productQuantity:number=1;

constructor(private activateRout:ActivatedRoute,private procuct:ProductService){

}
ngOnInit(): void {
  let productId=this.activateRout.snapshot.paramMap.get('productId');
  console.log("ooo",productId);
  productId && this.procuct.getProduct(productId).subscribe((result)=>{
this.productData=result
  })
}
handelQuantity(val:string){
if(this.productQuantity >= 0  && val==='plus'){
  this.productQuantity+=1
}else{
  if(this.productQuantity > 1)
  this.productQuantity-=1
}
}
}
