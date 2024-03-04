import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<any[] | []>();
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
  searchProduct(query: string) {
    return this.http.get<any[]>(`http://localhost:3000/product?name=${query}`);
  }
  localAddToCart(data: any) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
    this.cartData.emit(cartData);
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: any[] = JSON.parse(cartData);
      items = items.filter((item: any) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: any) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {
    return this.http.get<any[]>('http://localhost:3000/cart?userId=' + userId,
      { observe: 'response' }).subscribe((result) => {
        if (result && result.body) {
          this, this.cartData.emit(result.body)
        }
      });

  }

  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }
  currentCard() {
    let userStore = localStorage.getItem('users');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<any[]>('http://localhost:3000/cart?userId=' + userData.id)
  }
  order(data: any) {
    return this.http.post<any>('http://localhost:3000/order', data)
  }
  orderList() {
    let userStore = localStorage.getItem('users');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<any>('http://localhost:3000/order?userId=' + userData.id)
  }
  deleteCartItems(cartId:number){
    return this.http.delete('http://localhost:3000/cart/' + cartId,{observe:'response'}).subscribe((result)=>{
      if(result){
        this.cartData.emit([])
      }
    });
  }
  cancelOrder(orderId:number){
    return this.http.delete('http://localhost:3000/order/'+orderId)
  }
}
