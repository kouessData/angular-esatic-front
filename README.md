# Assignment App

Projet de gestion de devoirs fait en Angular.

## ce qui a été mis en place 

- Mettre en place une petite appli pour suivre des assignments (devoirs)
- Faire un ecran de connexion pour que l'utilisateur puisse entrer
- Afficher la liste des devoirs et ouvrir la fiche detail
- Permettre d'ajouter, modifier et supprimer un devoir
- Gerer des droits simples (par exemple certaines actions reservees a l'admin)
- Relier le front a un backend avec une URL configurable

## Stack technique

- Angular 21
- Angular Material
- RxJS
- Backend API externe (URL configuree via `.env`)

## Prerequis

- Node.js (version recente)
- npm
- Un backend disponible pour les endpoints d'authentification et assignments

## Installation

```bash
npm install
```

## Configuration

1. Copier le fichier d'exemple :

```bash
cp .env.example .env
```

2. Adapter au besoin la variable :

```env
ASSIGNMENTS_API_URL=http://localhost:8010/api/assignments
```

Le script `scripts/generate-env.mjs` genere automatiquement `src/app/shared/app-env.ts` a partir des variables d'environnement.

## Lancer le projet en local

```bash
npm run startdev
```

Puis ouvrir [http://localhost:4200](http://localhost:4200).

## Commandes utiles

```bash
npm run start      # lance ng serve
npm run build      # build de production
npm run test       # tests unitaires
```

## Structure rapide

- `src/app/assignments/` : composants de liste, detail, ajout et edition
- `src/app/login/` : ecran de connexion
- `src/app/shared/assignments.service.ts` : appels API assignments
- `src/app/shared/auth.service.ts` : login/logout et gestion du role
- `src/app/app.routes.ts` : routes de l'application

## Deploiement front

Le projet contient `server.js` (Express) pour servir le build Angular (`dist/assignment-app/browser`) sur un serveur Node.
