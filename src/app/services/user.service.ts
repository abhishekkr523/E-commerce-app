import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private router:Router) { }
  userSignUp(user: any) {
    this.http.post('http://localhost:3000/users', user, { observe: 'response' }).subscribe((result) => {
      if(result){
      localStorage.setItem('users', JSON.stringify(result.body))
      this.router.navigate(['/'],)
      console.log("hello", result)
      }
    });
  }


  userLogin(data: any) {
    this.http.get<any[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result:any) => {
      console.log("result", result);
      if(result && result.body){
        localStorage.setItem('users', JSON.stringify(result.body[0]))
        this.router.navigate(['/'],)
        console.log("hello", result)
        }
      
  })}


  userAuthReload(){
    if(localStorage.getItem('users')){
      this.router.navigate(['/']);
    }
  }
}
