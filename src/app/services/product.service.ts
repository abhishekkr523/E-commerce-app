import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { baseurl,endpoints } from './constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<any[] | []>();
  cartDataHeader = new EventEmitter<any[] | []>();
  updateSellerHome = new EventEmitter<void>();
  constructor(private http: HttpClient) { }

  addProduct(data: any) {
    return this.http.post(`${baseurl}${endpoints.addProduct}`, data);
  }


  productList(data:any) {
    return this.http.get<any>(`${baseurl}${endpoints.addProduct}?userEmail=${data.email}`);
  }
  onSignUpProductList(data:any) {
    return this.http.get<any>(`${baseurl}${endpoints.addProduct}?userEmail=${data.email}`);
  }


  deleteProduct(id: number) {
    return this.http.delete(`${baseurl}${endpoints.addProduct}/${id}`);
  }
  getProduct(id: string) {
    return this.http.get<any>(`${baseurl}${endpoints.addProduct}/${id}`)
  }
  updateProduct(product: any) {
    return this.http.put<any>(`${baseurl}${endpoints.addProduct}/${product.id}`, product);
  }
  popularProduct() {
    return this.http.get<any>(`${baseurl}${endpoints.addProduct}?_limit=3`);
  }
  trendyProduct(param:string) {
    return this.http.get<any>(`${baseurl}${endpoints.addProduct}${param}`);
  }
  searchProduct(query: string) {
    return this.http.get<any[]>(`${baseurl}${endpoints.addProduct}?name=${query}`);
  }
  localAddToCart(data: any) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      
      console.log("data",data);
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
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
    return this.http.post(`${baseurl}${endpoints.cart}`, cartData);
  }

  getCartList(userId: number) {
    return this.http.get<any[]>(`${baseurl}${endpoints.cart}?userId=` + userId,
      { observe: 'response' }).subscribe((result) => {
        if (result && result.body) {
          this, this.cartData.emit(result.body)
        }
      });

  }

  removeToCart(cartId: number) {
    return this.http.delete(`${baseurl}${endpoints.cart}/` + cartId);
  }
  currentCard() {
    let userStore = localStorage.getItem('users');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<any[]>(`${baseurl}${endpoints.cart}?userId=` + userData.id)
  }
  order(data: any) {
    return this.http.post<any>(`${baseurl}${endpoints.order}`, data)
  }
  orderList() {
    let userStore = localStorage.getItem('users');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<any>(`${baseurl}${endpoints.order}?userId=` + userData.id)
  }
  deleteCartItems(cartId:number){
    return this.http.delete(`${baseurl}${endpoints.cart}/` + cartId,{observe:'response'}).subscribe((result)=>{
      if(result){
        this.cartData.emit([])
      }
    });
  }
  cancelOrder(orderId:number){
    return this.http.delete(`${baseurl}${endpoints.order}/`+orderId)
  }
}
