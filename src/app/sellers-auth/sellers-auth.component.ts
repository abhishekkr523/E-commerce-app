import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-sellers-auth',
  templateUrl: './sellers-auth.component.html',
  styleUrl: './sellers-auth.component.scss'
})
export class SellersAuthComponent {
  constructor(private seller: SellerService) {

  }
  dat: any
  signUp(userFormData: any): void {
    console.log(userFormData);
    this.seller.userSignUp(userFormData).subscribe({
      next: (result: any) => {
        console.log('Response:', result);
        // Handle the response accordingly
      },
      error: (error: any) => {
        console.error('Error:', error);
        // Handle the error appropriately
      }
    });
  }
  

}
