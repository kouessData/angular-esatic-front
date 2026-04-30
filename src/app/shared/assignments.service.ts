import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import bdInitialAssignments from './data';
import { APP_ENV } from './app-env';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  constructor(
    private loggingService: LoggingService,
    private http: HttpClient,
  ) {}

  assignments: Assignment[] = [];

  URI_BACKEND = APP_ENV.assignmentsApiUrl;

  getAssignments(): Observable<Assignment[]> {
    // typiquement : on ferait un appel HTTP vers un backend pour
    // récupérer les données, ça peut prendre du temps, c'est pour ça que
    // c'est mieux de faire ça dans un service, et pas dans le composant
    // et aussi renvoyer non pas les données directement,
    // mais plutôt un Observable ou une Promise, pour gérer
    // l'asynchronicité de l'appel HTTP. La norme en Angular, c'est d'utiliser
    // des Observables, avec la librairie RxJS.
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.URI_BACKEND,this.getHeaders());
  }

  // Version avec pagination : on envoie la page et le nombre d'éléments 
  // par page au backend, et le backend nous retourne les données de la 
  // page demandée. 
  // paramètres de requête et retourner les données correspondantes.
  getAssignmentsPagine(page: number, limit: number, search: string = '') {
    return this.http.get<any>(
      `${this.URI_BACKEND}?page=${page}&limit=${limit}&search=${search}`,
      this.getHeaders()
    );
  }

  // Récupérer un assignment par son id
  getAssignment(id: string): Observable<Assignment | undefined> {
    //const assignment = this.assignments.find(a => a.id === id);
    //return of(assignment);
    return this.http.get<Assignment>(this.URI_BACKEND + '/' + id,this.getHeaders());
  }

  addAssignment(assignment: Assignment): Observable<any> {
    this.assignments.push(assignment);

    this.loggingService.log(assignment.nom, 'ajouté');

    return this.http.post<any>(this.URI_BACKEND, assignment,this.getHeaders() );
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http.put(
      this.URI_BACKEND,
      assignment,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    );
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    // on supprime avec splice() l'assignment du tableau des assignments
    // car avec filter cela crée un nouveau tableau et du coup ça ne
    // fonctionne pas car le signal référence toujours l'ancien
    //  dans le composant parent. Donc -> utiliser splice
    //const pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);

    this.loggingService.log(assignment.nom, 'supprimé');

    //return of('Assignment supprimé avec succès !');
    return this.http.delete<any>(this.URI_BACKEND + '/' + assignment._id,this.getHeaders());
  }

  getHeaders() {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };

  
    
  }
  getMatieres() {
    return this.http.get<any[]>(APP_ENV.matieresApiUrl);
  }
  
  peuplerBD() {
    bdInitialAssignments.forEach((a) => {
      const assignment = new Assignment();
      assignment.nom = a.nom;
      assignment.dateDeRendu = new Date(a.dateDeRendu);
      assignment.rendu = a.rendu;

      // insertion asynchrone dans la base de données via la méthode
      // addAssignment du service, qui fait un appel HTTP POST vers le
      // backend
      this.addAssignment(assignment).subscribe((reponse) => {
        console.log(reponse.message);
      });
    });
  }

  /* VERSION QUI GERE L'ASYNCHRONISITE DE L'APPEL HTTP POST DANS LA METHODE 
    addAssignment */
  peuplerBDAsynchrone(): Observable<any> {
    let appelsVersAddAssignment: Observable<any>[] = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });

    // bloque tant que tous les appels HTTP POST vers addAssignment 
    // n'ont pas terminé, et retourne un Observable
    return forkJoin(appelsVersAddAssignment);
  }
}
