import { Component, signal } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = signal("");
  password = signal("");

  constructor(private auth: AuthService,
              private router: Router) {}

  onLogin() {
    const success = this.auth.login(this.username(), this.password());

    if (success) {
      this.router.navigate(['/']);
    } else {
      alert("Login incorrect !");
    }
  }
}