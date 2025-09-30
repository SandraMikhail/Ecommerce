import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode'
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  router = inject(Router)


  constructor(private http:HttpClient){

  }
  register(form:any):Observable<any>{
    return this.http.post('https://ecommerce.routemisr.com/api/v1/auth/signup', form)
  }
    login(form:any):Observable<any>{
    return this.http.post('https://ecommerce.routemisr.com/api/v1/auth/signin', form)
  }

  decodeToken(){
    let token;
    try{
      token=  jwtDecode(JSON.stringify(localStorage.getItem("token")))
    }catch(error){
      localStorage.removeItem("token")
      this.router.navigate(["/login"])
    }
    return token
  }


  submitVerifyEmail(data:object):Observable<any>{
    return this.http.post(environment.baseUrl + '/auth/forgotPasswords',data )
  }
    submitVerifyCode(data:object):Observable<any>{
    return this.http.post(environment.baseUrl + '/auth/verifyResetCode',data )
  }
  submitResetPassword(data:object):Observable<any>{
    return this.http.put(environment.baseUrl + '/auth/resetPassword',data )
  }
}
