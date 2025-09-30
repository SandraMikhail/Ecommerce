import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetails } from './services/product-details';
import { Product } from '../../core/interfaces/product';
import { Cart } from '../cart/services/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.scss'
})
export class Details implements OnInit {

  id:string|null = null
  productDetails: Product={} as Product

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productDetailsService =inject(ProductDetails)
    private readonly toastrService = inject(ToastrService)
  private readonly cart=inject(Cart)
  private readonly cdr = inject(ChangeDetectorRef);


  ngOnInit(): void {
    this.getProductId()
    this.getProductDetailsData()

  }


getProductId():void{
  this.activatedRoute.paramMap.subscribe({
    next:(urlParams)=>{
      this.id = urlParams.get('id')
    }
  })
}



getProductDetailsData():void{
  this.productDetailsService.getProductDetails(this.id).subscribe({
    next:(res)=>{
      this.productDetails = res.data
      console.log(res.data)
         this.cdr.detectChanges();
    }, error:(err)=>{
        console.log(err)
    }
  })
}

addProductItemToCart(id:string):void{
  this.cart.addProductToCart(id).subscribe({
    next:(res) => {
      console.log(res)
      if(res.status =="success"){
        this.toastrService.success('item added to cart', 'success')
      }
    }, error:(err)=>{
      console.log(err)
    }
  })
}


}
