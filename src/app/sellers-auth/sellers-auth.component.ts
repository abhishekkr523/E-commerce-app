import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signUp } from '../data-type';
@Component({
  selector: 'app-sellers-auth',
  templateUrl: './sellers-auth.component.html',
  styleUrl: './sellers-auth.component.scss'
})
export class SellersAuthComponent implements OnInit {
  showLogin = false;
  authError: string = "";

  constructor(private seller: SellerService, private router: Router) {
  }
  dat: any
  ngOnInit(): void {
    this.seller.reloadSeller();
     // Subscribe to the sign-up success event
     this.seller.signUpSuccess.subscribe(() => {
      // Update the menu type after successful sign-up
      this.router.navigate(['seller-home']);
    });
  }
  signUp(data: signUp): void {
    this.seller.userSignUp(data)
  }
  login(data: signUp) {
    this.authError = "";
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
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
}
