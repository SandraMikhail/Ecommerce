import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../cart/services/cart';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout implements OnInit{

  private readonly fb = inject(FormBuilder)
  private readonly activatedRoute=inject(ActivatedRoute)
  private readonly cart = inject(Cart)
  private readonly router = inject(Router)


  id:string|null = null;
  cartOwnerID:string|null = null;
  checkoutForm!:FormGroup
  errorMsg:string=""

   ngOnInit(): void {
    this.iniateForm()
    this.getCartId()

     this.activatedRoute.paramMap.subscribe({
    next: (params) => {
      this.id = params.get('id');
      console.log('Inside subscription:', this.id);
      this.cartOwnerID = params.get('cartOwner')
    }
  });
  }

  getCartId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlParms)=>{
       this.id = urlParms.get('id')
       localStorage.setItem("id",this.id!)
       console.log("id of cart is ", this.id)
      }
    })
  }
  iniateForm():void{
    this.checkoutForm =this.fb.group({
      shippingAddress:this.fb.group({
        "details": [null,Validators.required],
        "phone": [null,[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
        "city": [null,[Validators.required]]
      })
    })
  }

  submitForm():void{
  if(this.checkoutForm.valid){
    this.cart.checkoutSession(this.id!, this.checkoutForm.value).subscribe({
      next:(res)=>{
        console.log("am the cart response ", res)
        if(res.status ==="success"){
          window.open(res.session.url, '_self')
          console.log("**********++++++++++",localStorage.getItem('id'))
         // this.router.navigate(['/allorders/',localStorage.getItem('id')])
        }
      }, error:(err)=>{
        console.log(err)
        console.log("failing in submitttt")
      }
    })
    } else{
      this.checkoutForm.markAllAsTouched()
    }
  }

    submitFormCash():void{
  if(this.checkoutForm.valid){
    this.cart.checkoutCash(this.id!, this.checkoutForm.value).subscribe({
      next:(res)=>{
        console.log("am the cash response ", res)

        this.router.navigate(['/allorders',this.id])
      }, error:(err)=>{
        console.log(err)
        console.log("failing in submit cash")
      }
    })
    } else{
      this.checkoutForm.markAllAsTouched()
    }
  }
}
