import { Component, signal } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // ← AJOUT obligatoire pour ngModel
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, // si tu utilises les standalone components
  imports: [FormsModule, CommonModule], // ← AJOUT
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  // ⚠️ ngModel fonctionne avec des propriétés simples, pas des signals
  username = '';  // ← était signal(""), remplace par string simple
  password = '';  // ← idem

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.router.navigate(['/home']);
      },
      error: () => {
        alert("Login incorrect !");
      }
    });
  }
}