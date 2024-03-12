import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  popularProduct:undefined | any[];
  trendyProduct:undefined | any[];

  constructor(private product:ProductService){ }
  
  ngOnInit(): void {
    this.product.popularProduct()
    .subscribe((result)=>{
      this.popularProduct=result;
    })

    this.product.trendyProduct()
    .subscribe((result)=>{
      this.trendyProduct=result;
    })
  }


}
