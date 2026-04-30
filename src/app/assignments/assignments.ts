import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 🔥 IMPORTANT

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { Router } from '@angular/router';

import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './assignments.html',
  styleUrl: './assignments.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Assignments implements OnInit {

  titre = 'Liste des Assignments';

  assignments = signal<Assignment[]>([]);
  assignmentsFiltres: Assignment[] = [];

  matieres: any[] = [];

  page = 1;
  limit = 10;
  totalDocs = 0;
  totalPages = 0;
  search = '';

  displayedColumns = [
    'assignment-nom',
    'assignment-nomDevoir',
    'assignment-matiere',
    'assignment-professeur',
    'assignment-note',
    'assignment-dateDeRendu',
    'assignment-rendu',
    'assignment-actions'
  ];

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getAssignments();

    this.assignmentsService.getMatieres().subscribe({
      next: (data) => this.matieres = data
    });
  }

  filtrerMatiere(matiere: string) {
    const data = this.assignments();

    if (!matiere) {
      this.assignmentsFiltres = data;
    } else {
      this.assignmentsFiltres = data.filter(a =>
        a.matiere?.toLowerCase() === matiere.toLowerCase()
      );
    }
  }

  filtrerRendu(val: string) {
    const data = this.assignments();

    if (!val) {
      this.assignmentsFiltres = data;
    } else {
      this.assignmentsFiltres = data.filter(a =>
        a.rendu.toString() === val
      );
    }
  }

  // 🔍 RECHERCHE
  onSearchChange() {
    this.page = 1;
    this.getAssignments();
  }

  refresh() {
    this.page = 1;
    this.getAssignments();

    this.snackBar.open("🔄 Liste actualisée", "OK", { duration: 2000 });
  }

  getAssignments() {
    this.assignmentsService
      .getAssignmentsPagine(this.page, this.limit, this.search)
      .subscribe((data) => {
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.assignments.set(data.docs);
      });
  }

  voirDetail(a: Assignment) {
    this.router.navigate(['/assignments', a._id]);
  }

  onEdit(a: Assignment) {
    this.router.navigate(['/assignments', a._id, 'edit']);
  }

  onDelete(a: Assignment) {
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assignmentsService.deleteAssignment(a)
          .subscribe(() => this.getAssignments());
      }
    });
  }

  pageChange(event: any) {
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAssignments();
  }
}