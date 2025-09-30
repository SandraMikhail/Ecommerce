import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Navbar } from '../../layouts/navbar/navbar';
import { Footer } from '../../layouts/footer/footer';
import { Cart } from './../cart/services/cart';
import { Auth } from '../../core/services/auth';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserOrders } from './user-orders';

@Component({
  selector: 'app-allorders',
  imports: [Navbar, Footer, RouterLink],

templateUrl: './allorders.html',
  styleUrl: './allorders.scss'
})
export class Allorders implements OnInit{

  private readonly cart=inject(Cart)
  private readonly auth= inject(Auth)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly cd=inject(ChangeDetectorRef)
  id:string = ""

  myOrders:UserOrders[] = []

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params => {
      const idcartOwner = localStorage.getItem("cartOwner");
      if (idcartOwner) {
        this.id = idcartOwner;
        this.getUserOrders(this.id);
      } else {
        console.error('No ID found in route params!');
      }
    });

  }




getUserOrders(cartOwner: string): void {
  console.log("id is ", cartOwner)
  this.cart.getUserOrders(cartOwner).subscribe({
    next: (res) => {
      console.log("response of getuserorders is", res)
      this.myOrders = res
          this.cd.detectChanges();
    }, error: (err) => {
      console.log("error in get user order", err)
    }
  })
}


}
