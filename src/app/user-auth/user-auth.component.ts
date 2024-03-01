import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss'
})
export class UserAuthComponent {
  showLogin = false;
  authError: string = "";

  constructor(private user: UserService, private product: ProductService) {
  }
  dat: any
  ngOnInit(): void {
    this.user.userAuthReload();
  }
  signUp(data: any): void {
    this.user.userSignUp(data)

  }
  login(data: any) {
    this.authError = ""
    console.log("logindata", data);
    this.user.userLogin(data);


    this.localCartToRemoteCart()

  }
  openLogin() {
    this.showLogin = true
  }
  openSignUp() {
    this.showLogin = false
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: any[] = JSON.parse(data);

      cartDataList.forEach((product: any, index) => {
        let cartData: any = {
          ...product,
          productId: product.id, userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log("item store in db.")
            }
          })
        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart')
        }
      })
    }
    setTimeout(()=>{
      this.product.getCartList(userId)
    },2000);
    
  }

}

