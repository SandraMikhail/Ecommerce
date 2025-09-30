import { Component, inject, Input, InputSignal } from '@angular/core';
import { Product } from '../interfaces/product';
import { RouterLink } from '@angular/router';
import { Cart } from '../../pages/cart/services/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @Input({required:true}) product:Product= {} as Product
  private readonly cart = inject(Cart)
  private readonly toastrService = inject(ToastrService)



addProductItemToCart(id:string):void{
  this.cart.addProductToCart(id).subscribe({
    next:(res) => {
      this.cart.countNumber.set(res.numOfCartItems)
      console.log(this.cart.countNumber)
      if(res.status =="success"){
        this.toastrService.success('item added to cart', 'success')
      }
    }, error:(err)=>{
      console.log(err)
    }
  })
}

}
