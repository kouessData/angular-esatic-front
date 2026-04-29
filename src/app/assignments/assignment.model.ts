export class Assignment {
  _id?: string;

  // IDENTITÉ
  nom!: string; // nom complet étudiant
  auteur!: string; // photo étudiant (URL ou image)

  // CONTEXTE
  matiere!: string;
  professeur!: string;
  imageMatiere!: string;

  // ÉVALUATION
  nomDevoir!: string; // nom du devoir
  note?: number;
  rendu!: boolean;
  remarques?: string;

  dateDeRendu!: Date | string;
}