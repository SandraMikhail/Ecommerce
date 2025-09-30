import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService =inject(ToastrService)
   const router = inject(Router)
  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
      console.log(error.status)
      if(error.status === 400){

        toastrService.error(error.error.message)
      }

      if (error.status === 401) {
        const message = error.error?.message || 'Unauthorized. Please login.';
        toastrService.error(message);
        // Optionally redirect to login page
        router.navigate(['/login']);
      }
      return throwError(()=>error)
    })
  );
};
