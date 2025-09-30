import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Cart as CartService } from './services/cart';
import { ToastrService } from 'ngx-toastr';
import { Cart as CartModel } from './models/cart';
  import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class Cart implements OnInit {
  private readonly cart = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly cdr = inject(ChangeDetectorRef);

  cartDetails: CartModel = {} as CartModel;

  ngOnInit(): void {
    this.getLoggedUserData();

  }

  addProductItemToCart(id: string): void {
    this.cart.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === "success") {
          this.toastrService.success(res.message, 'FreshCart');
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getLoggedUserData(): void {
    this.cart.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this.cdr.detectChanges();
         localStorage.setItem('cartOwner', res.data.cartOwner)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  removeItem(id:string):void{
    this.cart.removeSpecificCardItem(id).subscribe({
      next:(res)=>{
        console.log(res)
         this.cartDetails = res.data;
         this.cart.countNumber.set(res.numOfCartItems)
         this.cdr.detectChanges();
      }, error:(err)=>{
        console.log(err)
      }
    })
  }

  updateCount(id:string, count:number):void{
      this.cart.updateCartCount(id,count).subscribe({
        next:(res)=>{
          console.log(res)
          this.cartDetails = res.data;
          this.cdr.detectChanges();
        }, error:(err)=>{
          console.log(err)
        }
      })
  }


}
