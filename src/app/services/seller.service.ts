import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http : HttpClient) { }
  userSignUp(data:any){
    console.log("service call")
    return this.http.post('http://localhost:3000/sellers',data)

  }
}
