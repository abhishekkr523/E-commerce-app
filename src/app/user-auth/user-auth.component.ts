import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss'
})
export class UserAuthComponent {
  showLogin = false;
  authError: string = "";

  constructor(private user: UserService) {
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
    // this.user.isLoginError.subscribe((isError) => {
    //   if (isError) {
    //     this.authError = "Email and Password is not correct"
    //   }
    // })
  }
  openLogin() {
    this.showLogin = true
  }
  openSignUp() {
    this.showLogin = false
  }

  
}

