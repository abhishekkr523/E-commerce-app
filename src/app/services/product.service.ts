import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: any) {
    return this.http.post('http://localhost:3000/product', data);
  }
  productList() {
    return this.http.get<any>('http://localhost:3000/product');
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/product/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<any>(`http://localhost:3000/product/${id}`)
  }
  updateProduct(product: any) {
    return this.http.put<any>(`http://localhost:3000/product/${product.id}`, product);
    // console.log("service",product)
  }
  popularProduct() {
    return this.http.get<any>(`http://localhost:3000/product?_limit=3`);
  }
  trendyProduct() {
    return this.http.get<any>(`http://localhost:3000/product?_limit=8`);
  }
  searchProduct(query:string) {
    return this.http.get<any>(`http://localhost:3000/product?q=${query}`);
  }
}
