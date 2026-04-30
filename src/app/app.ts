import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Assignments } from './assignments/assignments';
import { AuthService } from './shared/auth.service';
import { AssignmentsService } from './shared/assignments.service';

import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, 
    MatDividerModule, RouterLink, MatSlideToggleModule,
    MatToolbarModule, MatDialogModule,CommonModule, MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  titre = "Application de gestion des assignments !!!";

  constructor(public authService: AuthService,
              private assignmentsService: AssignmentsService,
              private router: Router) {}

  login() {
  if(this.authService.isLoggedIn()) {
    this.authService.logout();
    this.router.navigate(['/login']);
  } else {
    this.router.navigate(['/login']);
  }
}

  goToLogin() {
   this.router.navigate(['/login']);
  }

  toggleLogin() {
  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/login']);
  } else {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

  genererDonneesDeTest() {
    //this.assignmentsService.peuplerBD();
    // On appelle la méthode asynchrone du service pour peupler la BD, et on 
    // s'abonne à la réponse pour savoir quand c'est terminé
    this.assignmentsService.peuplerBDAsynchrone()
    .subscribe((reponse) => {
      console.log('Peuplement de la BD terminé:', reponse);

      // On re-affiche la liste des assignments après le peuplement de la BD, pour voir les nouvelles données
      // this.router.navigate(['/home']); ne fonctionne pas car on est déjà 
      // sur la page d'accueil, donc on peut faire :
      window.location.reload();
    });
  }
}
