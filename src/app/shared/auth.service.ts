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
    return this.http.post<any>(`${APP_ENV.authApiUrl}/login`, {
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
    // Call backend logout endpoint (best-effort) then clear local storage
    this.http.post(`${APP_ENV.authApiUrl}/logout`, {}).subscribe({
      next: () => {
        // noop
      },
      error: () => {
        // ignore network errors
      }
    });

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
    return this.http.post<any>(`${APP_ENV.authApiUrl}/register`, {
      username,
      password,
      role
    });
  }
}