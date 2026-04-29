import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../../shared/assignments.service';
import { Assignment } from '../assignment.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
//designer
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './add-assignment.html',
  styleUrl: './add-assignment.css'
})
export class AddAssignment implements OnInit {

  assignment: Assignment = new Assignment();
  matieres: any[] = [];

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // 🔥 récupérer les matières depuis backend
    this.assignmentsService.getMatieres().subscribe({
      next: (data) => this.matieres = data,
      error: (err) => console.error("Erreur matieres", err)
    });
  }

  onMatiereChange() {
    const mat = this.matieres.find(m => m.nom === this.assignment.matiere);
    this.assignment.professeur = mat?.prof || "Prof inconnu";
  }



  // ajout des images
  uploadPhotoEtudiant(event: any) {
    const file = event.target.files[0];
    console.log("FILE:", file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'angular_upload');

    fetch('https://api.cloudinary.com/v1_1/djvilcwrz/image/upload', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      this.assignment.auteur = data.secure_url;
      console.log("Photo étudiant OK :", data.secure_url);
    });
  }

  uploadImageMatiere(event: any) {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'angular_upload');

    fetch('https://api.cloudinary.com/v1_1/djvilcwrz/image/upload', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      this.assignment.imageMatiere = data.secure_url;
      console.log("Image matière OK :", data.secure_url);
    });
  }

  onSubmit() {
    console.log("DATA ENVOYÉE :", this.assignment);

    this.assignmentsService.addAssignment(this.assignment).subscribe({
      next: (res) => {

        // ✅ message succès PRO
        this.snackBar.open("✅ Assignment ajouté avec succès", "OK", {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        // 🔥 redirection vers  detail 
        ;
        this.router.navigate(['/assignments', res._id]);
      },

      error: (err) => {
        console.error(err);

        this.snackBar.open("❌ Erreur lors de l'ajout", "Fermer", {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}