import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { LoginResponse } from './components/login/login-response';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
    private httpClient: HttpClient) {}

  intercept(request: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {

    if((request.url === 'http://localhost:8080/api/posts' && request.method == 'post') ||
      (request.url === 'http://localhost:8080/api/forum' && request.method == 'post') ||
      (request.url === 'http://localhost:8080/api/comments' && request.method == 'post') ||
      request.url.includes('http://localhost:8080/api/comments/by-user/') || 
      request.url.includes('http://localhost:8080/api/posts/by-user/') || 
      request.url.includes('http://localhost:8080/api/votes')){
        this.authService.loadToken();
        const token = this.authService.getToken();
        const httpRequest = request.clone( {setHeaders: { Authorization: `Bearer ${token}`}} );
        return httpHandler.handle(httpRequest);
  }
  else{
    return httpHandler.handle(request);
  }
  }

  
}
