import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss'
})
export class UserAuthComponent {
  showLogin = false;
  authError: string = "";

  constructor(private user: UserService, private product: ProductService, private router: Router) {
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
    this.user.userLogin(data).subscribe((result: any) => {
      console.log("result", result);
      if (result && result.body && result.body.length) {
        console.log("user login success");
        localStorage.setItem('users', JSON.stringify(result.body[0]))
        this.router.navigate(['/'],)
        this.localCartToRemoteCart()
      } else {
        console.log("user login fail");
        this.user.isLoginError.emit(true)
      }
    });
    this.user.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email and Password is Incorrect"
      }
    })



  }
  openLogin() {
    this.showLogin = true
  }
  openSignUp() {
    this.showLogin = false
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('users');
    let userId = user ? JSON.parse(user) : null;
    console.log("userIdd", userId);


    if (data) {
      let cartDataList: any[] = JSON.parse(data);

      cartDataList.forEach((product: any, index) => {
        let cartData: any = {
          ...product,
          productId: product.id, userId,
        };
        console.log("ll", cartData)
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
    setTimeout(() => {
      this.product.getCartList(userId)
    }, 2000);

  }

}

