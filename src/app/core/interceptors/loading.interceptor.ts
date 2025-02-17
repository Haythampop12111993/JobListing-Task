import { inject } from '@angular/core';
import { GlobalService } from './../../services/global.service';
import { HttpInterceptorFn } from '@angular/common/http';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const globalService = inject(GlobalService);
  globalService.showSpinner();
  return next(req).pipe(
    delay(500),
    finalize(()=> globalService.hideSpinner())
  );
};
