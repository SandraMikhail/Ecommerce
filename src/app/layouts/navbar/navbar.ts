import { Component, computed, inject, Input, OnInit, PLATFORM_ID, Signal, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Cart } from '../../pages/cart/services/cart';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit{
   @Input()isLogin:boolean = true

  private readonly router = inject(Router)
  private readonly cart = inject(Cart)
  private readonly id= inject(PLATFORM_ID)
count:Signal<number>= computed(()=>this.cart.countNumber())

  ngOnInit(): void {
   if(isPlatformBrowser(this.id)){
      this.getAllDataCart()
   }

  }


  logout():void{
    localStorage.removeItem("token")
    this.router.navigate(["/login"])

  }



  getAllDataCart():void{
      this.cart.getLoggedUserCart().subscribe({
        next:(res)=>{
          this.cart.countNumber.set(res.numOfCartItems)
        }
      }
      )
  }


}
