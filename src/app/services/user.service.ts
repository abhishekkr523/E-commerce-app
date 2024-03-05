import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoginError=new EventEmitter<boolean>(false)

  constructor(private http: HttpClient,private router:Router) { }
  userSignUp(user: any) {
    this.http.post('http://localhost:3000/users', user, { observe: 'response' }).subscribe((result) => {
      if(result){
      localStorage.setItem('users', JSON.stringify(result.body))
      this.router.navigate(['/'],);
      }
    });
  }


  // userLogin(data: any) {
  //   this.http.get<any[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result:any) => {
  //     console.log("result", result);
  //     if(result && result.body){
  //       localStorage.setItem('users', JSON.stringify(result.body[0]))
  //       this.router.navigate(['/'],)
  //       }
      
  // })}

  userLogin(data: any){
    this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result:any) => {
      console.log("result", result);
      if(result && result.body && result.body.length){
        console.log("user login success");
        localStorage.setItem('seller', JSON.stringify(result.body))
      this.router.navigate(['seller-home'],)
      }else{
        console.log("user login fail");
        this.isLoginError.emit(true)
      }
    });
  }


  userAuthReload(){
    if(localStorage.getItem('users')){
      this.router.navigate(['/']);
    }
  }
}
