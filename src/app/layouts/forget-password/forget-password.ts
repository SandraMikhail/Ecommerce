import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../core/services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [RouterModule,ReactiveFormsModule],

standalone: true,
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss'
})
export class ForgetPassword implements OnInit{

  ngOnInit(): void {
    this.iniateForm()
  }

  private readonly auth=inject(Auth)
  private readonly router=inject(Router)
  private readonly fb = inject(FormBuilder)


  verifyEmail!:FormGroup
  verifyCode!:FormGroup
  resetPassword!:FormGroup
  step:number = 1

  iniateForm():void{

  }


  formStep1():void{
    if(this.verifyEmail.valid){
         this.auth.submitVerifyEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.step =2
      }
    })
    }
  }

    formStep2():void{
    if(this.verifyCode.valid){
         this.auth.submitVerifyCode(this.verifyCode.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.step =3
      }
    })
    }
  }

    formStep3():void{
    if(this.resetPassword.valid){
         this.auth.submitResetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res)
       localStorage.setItem("token",res.token)
        this.router.navigate(['/home'])
      }
    })
    }
  }



}
