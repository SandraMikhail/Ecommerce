import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const ngxSpinnerService = inject(NgxSpinnerService)

  //with req show spinner
  ngxSpinnerService.show()
//hide after the response
  return next(req).pipe(finalize(()=>{
    ngxSpinnerService.hide()
  }));
};
