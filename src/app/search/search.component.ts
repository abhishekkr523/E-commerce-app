import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { query } from 'express';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  searchResult: undefined| any[];
  constructor(private activatedRout:ActivatedRoute,private product:ProductService){

  }

  ngOnInit(): void {
    let Query=this.activatedRout.snapshot.paramMap.get('query');
    Query && this.product.searchProduct(Query).subscribe((result)=>{
      this.searchResult=result;
    })
  }

}
