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
  signUpFail=new EventEmitter<void>();
  signInSuccess = new EventEmitter<void>();
  

  constructor(private http: HttpClient,private router:Router) { }

  // userSignUp(data: signUp) {
  //   this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
  //     this.isSellerLoggedIn.next(true);
  //     localStorage.setItem('seller', JSON.stringify(result.body));
  //     console.log("result.body",result.body);
  //     localStorage.setItem('menuType', 'seller'); // Set menu type in local storage
  //     this.signUpSuccess.emit(); // Emit the sign-up success event
  //     this.router.navigate(['seller-home']);
  //   });
  // }
  userSignUp(data: signUp) {
    this.http.get(`http://localhost:3000/seller?email=${data.email}`, { observe: 'response' }).subscribe((result:any) => {
      if(result && result.body && result.body.length){
        
        this.signUpFail.emit();
      this.router.navigate(['seller-auth'],)
      }else{
        this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body));
      localStorage.setItem('menuType', 'seller'); // Set menu type in local storage
      this.signUpSuccess.emit(); // Emit the sign-up success event
      this.router.navigate(['seller-home']);
    });
      }
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
      this.signInSuccess.emit();
      if(result && result.body && result.body.length){
        localStorage.setItem('seller', JSON.stringify(result.body[0]))
      this.router.navigate(['seller-home'],)
      }else{
        this.isLoginError.emit(true)
      }
    });
  }
  
}
