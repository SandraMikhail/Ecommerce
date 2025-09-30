import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("interceptor response",req.url)

  //hal el endpoint dih ry7a tklm el cart ? l2n lw ah ht7tag token
  if(!req.url.includes('cart')){
    return next(req)
  }
  //hmsek el req eli tal3 ml app w a5od mno nos5a, btrg3li el httprequest bt3ti, fa ha5od object w h3mlo set ll headers eli howa el token
  //el token msh by5od undefined aw null, momkn ya5od empty string

  const platform = inject(PLATFORM_ID)
  if(isPlatformBrowser(platform)){
    console.log(localStorage.getItem('token'))
  }
  req = req.clone({
    setHeaders:{
      token:localStorage.getItem("token") || ''
    }
  })
  return next(req);
};
