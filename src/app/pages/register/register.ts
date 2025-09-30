import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, RequiredValidator, Validators } from '@angular/forms'
import { Auth } from '../../core/services/auth';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit{

  isloading:boolean=false
  errorMsg :string =""

  constructor(private auth: Auth, private router:Router) { }

  ngOnInit(): void {
    this.initForm()
  }

  registerForm!: FormGroup

  initForm():void{
     this.registerForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required])
  })
  }


  submit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm)
      this.isloading = true
      this.auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res)
          this.isloading = false
          this.router.navigate(['/login'])

        }, error: (err) => {
          console.log(err)
          this.isloading = false
          //display error msg
          this.errorMsg = err.error.message
        }
      })
    } else{
      this.registerForm.markAllAsTouched()
    }
  }

  confirmPassword(form: AbstractControl) {
    let password = form.get('password')?.value
    let rePassword = form.get('rePassword')?.value

    if (password == rePassword) {
      return null
    } else {
      return { misMatch: true }
    }

  }
}

// Validators.pattern("/^01[0-2,5]{1}[0-9]{9}$/")
