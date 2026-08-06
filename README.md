# Centre Hassan II des Rencontres Internationales — Frontend

Frontend du site du Centre Hassan II des Rencontres Internationales (Asilah, Maroc).
Vitrine multilingue (français, anglais, arabe) avec une interface d'administration complète.

## Fonctionnalités

- Site public : accueil, à propos, événements, actualités, espaces, galerie, contact, infos pratiques
- Trilingue français / anglais / arabe, avec affichage RTL pour l'arabe
- Administration : tableau de bord, gestion des événements, actualités, galerie, espaces, utilisateurs et messages
- Responsive, éditeur de texte riche, galerie avec lightbox, animations au scroll

## Stack

- React 19 + Vite 8
- React Router 7
- Axios
- i18next
- Framer Motion
- Tiptap

## Installation

```bash
npm install
npm run dev
```

Le serveur de développement démarre sur `http://localhost:5173`.

## Scripts

```bash
npm run dev       # Serveur de développement (HMR)
npm run build     # Build de production dans dist/
npm run preview   # Prévisualisation du build
npm run lint      # Analyse statique (ESLint)
```

## Configuration

Copiez `.env.example` vers `.env` et ajustez si nécessaire :

| Variable          | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| `VITE_API_URL`    | URL de base de l'API backend (sinon `/api`)                |
| `VITE_API_PROXY`  | Cible du proxy de développement (défaut `http://127.0.0.1:8000`) |

En développement, Vite proxifie `/api` vers le backend Laravel local (`php artisan serve`).
En production, définissez `VITE_API_URL=https://api.centre-hassan2.ma/api`.

## Internationalisation

Les traductions sont dans `src/i18n/` : `fr.json`, `en.json`, `ar.json`.
Le sélecteur de langue est disponible dans la navigation et le pied de page ; la langue choisie est mémorisée dans le navigateur.

## Structure

```
src/
├── components/   # Composants réutilisables (layout, public, admin, common)
├── context/      # Contextes React (authentification, langue/RTL)
├── hooks/        # Hooks personnalisés
├── i18n/         # Fichiers de traduction
├── pages/        # Pages publiques et administration
├── services/     # Client API (Axios)
└── styles/       # Styles globaux et variables CSS
```

## Administration

Accès via `/admin/login`. Le jeton d'authentification est stocké dans le navigateur et envoyé
en en-tête `Authorization` ; les routes d'administration sont protégées.

## Licence

Projet privé — Centre Hassan II des Rencontres Internationales.
