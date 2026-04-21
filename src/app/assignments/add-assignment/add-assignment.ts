import { Component, output, signal } from '@angular/core';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';

// new import pour le select de la matière
import { MatSelectModule } from '@angular/material/select';
//utilisation de material stepper pour faire un formulaire en plusieurs étapes
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule,
     MatButtonModule, FormsModule, MatSelectModule, MatStepperModule, MatIconModule],
  templateUrl: './add-assignment.html',
  styleUrl: './add-assignment.css',
  providers: [provideNativeDateAdapter()],
})



export class AddAssignment {
  // Pour les champs du formulaire d'ajout d'un devoir
  nomDevoir = signal('');
  // Je veux une date de rendu "vide" par défaut
  dateDeRendu = signal(new Date());

  auteur = signal("");
  matiere = signal("");
  note = signal<number | undefined>(undefined);
  remarques = signal("");
  nom = signal("");
  professeur = signal("");
  imageMatiere = signal("");

 
 
  assignmentAjoute = output<Assignment>();


onMatiereChange(matiere: string) {
  this.matiere.set(matiere);

  if (matiere === 'Web') {
    this.professeur.set('M. Kouadio');
    this.imageMatiere.set('assets/web.jpg');
  }

  if (matiere === 'BD') {
    this.professeur.set('Mme Konan');
    this.imageMatiere.set('assets/bd.jpg');
  }

  if (matiere === 'IA') {
    this.professeur.set('M. Yao');
    this.imageMatiere.set('assets/ia.jpg');
  }
}



  constructor(private assignementService: AssignmentsService,
              private router: Router) {}
  

  onSubmit() {
      console.log("Form submitted !!!");
      // on ajoute () à la fin de this.nomDevoir pour récupérer la valeur 
      // actuelle du signal !
      console.log("Nom du devoir : ", this.nomDevoir());
      console.log("Date de rendu : ", this.dateDeRendu());
  
      // on peut faire l'ajout :
      // on crée un nouvel objet de type Assignment
      const newAssignment= new Assignment();
      newAssignment.nomDevoir = this.nomDevoir();
      newAssignment.dateDeRendu = this.dateDeRendu();
      newAssignment.rendu = false; 
 

      //  NOUVEAUX CHAMPS
      newAssignment.auteur = this.auteur();
      newAssignment.matiere = this.matiere();
      newAssignment.note = this.note();
      newAssignment.remarques = this.remarques();
      newAssignment.nom = this.nom();

      
      newAssignment.professeur = this.professeur();
      newAssignment.imageMatiere = this.imageMatiere();

      if (newAssignment.note === undefined) {
        alert("Veuillez entrer une note !");
        return;}
        
      // On utilise le service pour ajouter le devoir à la liste des devoirs
      this.assignementService.addAssignment(newAssignment)
      .subscribe(result => {
        console.log(result);

        // On prévient le père pour ajouter le devoir à la liste des devoirs affichés
        //this.assignmentAjoute.emit(newAssignment); // on émet le nouvel assignment
      
        // ici on va devoir faire une navigation "par programme" 
        // vers la page d'accueil (la liste des devoirs), 
        // pour revenir à la liste après l'ajout du devoir.
        this.router.navigate(['/']);
      });
  
    }
  
}
