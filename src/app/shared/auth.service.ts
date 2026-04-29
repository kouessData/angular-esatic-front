import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_ENV } from './app-env';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

/*
  login(username: string, password: string) {
    return this.http.post<any>(`${APP_ENV.authApiUrl}/login`, {
      username,
      password
    });
  }
*/
  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:8010/api/auth/login', {
      username,
      password
    }).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.user.role);
      })
    );
  }

  logout() {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  register(username: string, password: string, role: string) {
    return this.http.post<any>('http://localhost:8010/api/auth/register', {
      username,
      password,
      role
    });
  }
}