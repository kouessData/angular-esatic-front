import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const envPath = path.join(projectRoot, '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const defaultBase = 'https://angular-back-vw1a.onrender.com/api';

const assignmentsApiUrl = process.env.ASSIGNMENTS_API_URL || `${defaultBase}/assignments`;
const authApiUrl        = process.env.AUTH_API_URL        || `${defaultBase}/auth`;
const matieresApiUrl    = process.env.MATIERES_API_URL    || `${defaultBase}/matieres`;

const outputPath = path.join(projectRoot, 'src', 'app', 'shared', 'app-env.ts');
const fileContent = `// Fichier généré automatiquement par scripts/generate-env.mjs
// Ne pas éditer à la main.

export const APP_ENV = {
  assignmentsApiUrl: ${JSON.stringify(assignmentsApiUrl)},
  authApiUrl: ${JSON.stringify(authApiUrl)},
  matieresApiUrl: ${JSON.stringify(matieresApiUrl)},
} as const;
`;

fs.writeFileSync(outputPath, fileContent, { encoding: 'utf8' });
console.log(`[generate-env] Écrit: ${path.relative(projectRoot, outputPath)}`);