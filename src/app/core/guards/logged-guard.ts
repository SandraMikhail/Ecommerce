import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const loggedGuard: CanActivateFn = (route, state) => {

  const platform = inject(PLATFORM_ID)
  const router = inject(Router)

  if(isPlatformBrowser(platform)){
   const token = localStorage.getItem('token')

    if(token){
     router.navigate(['home'])
      return false

    }else{
      return true

    }
  }
  return true;
};
