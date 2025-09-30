import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  //is token in localstorage valid ?
  const token = localStorage.getItem('token')

  const router = inject(Router)


  if(token){
    return true
  }else{
    router.navigateByUrl('/login')
    return false
  }
};
