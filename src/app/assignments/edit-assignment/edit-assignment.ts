import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './edit-assignment.html',
  styleUrl: './edit-assignment.css',
})
export class EditAssignment implements OnInit {

  // ✅ variable principale
  assignment: Assignment = new Assignment();

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  
  matieres: any[] = [];

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');

  if (!id) return;

  this.assignmentsService.getAssignment(id).subscribe({
    next: (a) => {
      if (a) {
        this.assignment = a;

        // correction date
        if (typeof a.dateDeRendu === 'string') {
          const parts = a.dateDeRendu.split('/');
          this.assignment.dateDeRendu = `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
      }
    }
  });

  this.assignmentsService.getMatieres().subscribe({
    next: (data) => this.matieres = data
  });
}

  onMatiereChange() {
    const mat = this.matieres.find(m => m.nom === this.assignment.matiere);
    this.assignment.professeur = mat?.prof || "Prof. Nguessan";
  }

  onSave() {
    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe({
        next: () => {
          alert("✅ Modification réussie !");
          this.router.navigate(['/assignments', this.assignment._id]);
        },
        error: (err) => {
          console.error(err);
          alert("❌ Erreur lors de la modification");
        }
      });
  }
}