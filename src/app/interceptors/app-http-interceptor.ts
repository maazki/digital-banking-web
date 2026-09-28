import { HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService=inject(AuthService);
  const http=inject(HttpClient);
  //authService['refreshTokenInProgress'] = false;
  const token =window.localStorage.getItem("jwt-acces");
  let reqNew =req;


  if(!req.url.includes("/auth/login")){
    reqNew = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(reqNew).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error.status);
      if (error.status === 401 ) //&& !authService['refreshTokenInProgress']
         {
           authService.logOut();
        return throwError(() => new Error('The Error'));//appHttpRefreshInterceptor(req, next);
      }
      console.log('bbbbbbbbbb');
      return throwError(() => new Error('The Error'));
    })
  );
};
