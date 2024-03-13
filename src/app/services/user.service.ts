import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { baseurl,endpoints } from './constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoginError = new EventEmitter<boolean>(false);
  signUpSuccess = new EventEmitter<void>();
  signUpFail = new EventEmitter<void>();

  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(user: any) {
    this.http.get<any[]>(`${baseurl}${endpoints.users}?email=${user.email}`, { observe: 'response' }).subscribe((result: any) => {
      if (result && result.body && result.body.length) {
        this.signUpFail.emit();
        this.router.navigate(['user-auth'],)
      }

      else {
        this.http.post(`${baseurl}${endpoints.users}`, user, { observe: 'response' }).subscribe((result) => {
          if (result) {
            localStorage.setItem('users', JSON.stringify(result.body));
            localStorage.setItem('menuType', 'user'); // Set menu type in local storage
            this.signUpSuccess.emit(); // Emit sign-up success event
            this.router.navigate(['/'],);
          }
        });
      }
    });

  }


  userLogin(data: any) {
    return this.http.get(`${baseurl}${endpoints.users}?email=${data.email}&password=${data.password}`, { observe: 'response' })
  }

  userAuthReload() {
    if (localStorage.getItem('users')) {
      this.router.navigate(['/']);
    }
  }
}
