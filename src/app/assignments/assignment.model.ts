export class Assignment {
    _id!: string;
    nom!: string;
    dateDeRendu!: Date;
    rendu!: boolean;
    auteur!: string;
    matiere!: string;
    note?: number;
    remarques?: string;
    imageMatiere?: string;
    prof?: string;
}