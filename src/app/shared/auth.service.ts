import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private loggedIn = false;
  private admin = false;

  login(username: string, password: string): boolean {

    if (username === 'admin' && password === '1234') {
      this.loggedIn = true;
      this.admin = true;
      return true;
    }

    if (username === 'user' && password === '1234') {
      this.loggedIn = true;
      this.admin = false;
      return true;
    }

    return false;
  }

  logout() {
    this.loggedIn = false;
    this.admin = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isAdmin(): boolean {
    return this.admin;
  }

  
}