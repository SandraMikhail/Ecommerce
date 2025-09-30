import { Component, inject, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms'
import { Auth } from '../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit{

  isloading: boolean = false
  errorMsg: string = ""
  subscription:Subscription = new Subscription()

  private readonly Fb= inject(FormBuilder)
  constructor(private auth: Auth, private router: Router) { }


  ngOnInit(): void {
      this.iniitForm()

  }

  loginForm!: FormGroup

   iniitForm():void{
    this.loginForm= new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })
   }


  submit() {
    if (this.loginForm.valid) {
      this.subscription.unsubscribe();
      this.isloading = true
      this.subscription = this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res)
          this.isloading = false
          localStorage.setItem("token", res.token)
          this.auth.decodeToken();
          this.router.navigate(['/home'])


        }, error: (err) => {
          console.log(err)
          this.isloading = false
          //display error msg
          this.errorMsg = err.errors.message
        }
      })
    } else {
      this.loginForm.markAllAsTouched()
    }
  }

}
