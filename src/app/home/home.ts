import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  constructor(private router: Router) {}

  goAdd() {
    this.router.navigate(['/add']);
  }

  goAssignments() {
    this.router.navigate(['/assignments']);
  }
}
