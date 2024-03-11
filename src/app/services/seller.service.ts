import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { json } from 'stream/consumers';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isLoginError=new EventEmitter<boolean>(false)
  // Add an event emitter to notify sign-up success
  signUpSuccess = new EventEmitter<void>();
  signInSuccess = new EventEmitter<void>();
  

  constructor(private http: HttpClient,private router:Router) { }

  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body));
      console.log("result.body",result.body);
      localStorage.setItem('menuType', 'seller'); // Set menu type in local storage
      this.signUpSuccess.emit(); // Emit the sign-up success event
      this.router.navigate(['seller-home']);
    });
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'],)
    }
  }

  sellerLogin(data: login){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result:any) => {
      console.log("resulttt", result);
      this.signInSuccess.emit();
      if(result && result.body && result.body.length){
        console.log("user login success");
        localStorage.setItem('seller', JSON.stringify(result.body[0]))
      this.router.navigate(['seller-home'],)
      }else{
        console.log("user login fail");
        this.isLoginError.emit(true)
      }
    });
  }
  
}
