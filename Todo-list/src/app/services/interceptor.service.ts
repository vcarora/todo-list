import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const EMAIL_KEY = 'user-email';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private token : TokenStorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req
    const token = this.token.getToken()
      if (token != null) {
        authReq = req.clone({setHeaders:{
          Authorization : 'Bearer '+token
        }
       });
      } 
       return next.handle(authReq)
    }

  
}
