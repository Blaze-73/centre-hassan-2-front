# Centre Hassan II des Rencontres Internationales — Frontend

Frontend officiel du **Centre Hassan II des Rencontres Internationales** (Asilah, Maroc).
Site vitrine multilingue (français / anglais / arabe) présentant les événements, les actualités,
les espaces et la galerie du centre, avec une **interface d'administration** complète.

## ✨ Fonctionnalités

- **Site public** : accueil, à propos, événements, actualités, espaces, galerie, contact, infos pratiques
- **Trilingue** : français, anglais et arabe (avec support **RTL** pour l'arabe)
- **Administration** : tableau de bord, gestion des événements, actualités, galerie, espaces, utilisateurs et messages
- **Riche en contenu** : éditeur de texte enrichi (Tiptap), lightbox de galerie, animations au scroll (Framer Motion)
- **Responsive** : navigation mobile avec menu plein écran et défilement verrouillé

## 🛠️ Stack technique

| Outil        | Rôle                                  |
| ------------ | ------------------------------------- |
| React 19     | Interface utilisateur                 |
| Vite 8       | Build et serveur de développement     |
| React Router 7 | Routage client                     |
| Axios        | Appels API                            |
| i18next      | Internationalisation (fr / en / ar)   |
| Framer Motion | Animations                            |
| Tiptap       | Éditeur de texte riche                |

## 🚀 Démarrage

```bash
npm install
npm run dev
```

Le serveur de développement démarre sur `http://localhost:5173`.

## 🧪 Scripts disponibles

```bash
npm run dev       # Serveur de développement (HMR)
npm run build     # Build de production dans /dist
npm run preview   # Prévisualisation du build
npm run lint      # Analyse statique (ESLint)
```

## ⚙️ Variables d'environnement

Copiez `.env.example` vers `.env` et ajustez si nécessaire :

| Variable        | Description                                       |
| --------------- | ------------------------------------------------- |
| `VITE_API_URL`  | URL de base de l'API backend (sinon `/api` local) |
| `VITE_API_PROXY`| Cible du proxy de développement (défaut `http://127.0.0.1:8000`) |

> En développement, le serveur Vite proxifie `/api` vers le backend Laravel local
> (`php artisan serve`), ce qui évite les soucis de CORS. En production, définissez
> `VITE_API_URL=https://api.centre-hassan2.ma/api`.

## 🌍 Internationalisation

Les traductions sont gérées par [i18next](https://www.i18next.com/) dans `src/i18n/` :

- `fr.json` — Français
- `en.json` — English
- `ar.json` — العربية (affichage RTL automatique + police Noto Sans Arabic)

Le sélecteur de langue est disponible dans la barre de navigation et le pied de page.
La langue choisie est mémorisée dans le navigateur.

## 🔌 Intégration API

Le frontend communique avec le backend Laravel (`c.h.2-BackEnd`) via Axios (`src/services/api.js`) :

- `VITE_API_URL` définit l'URL de base de l'API (sinon `/api`).
- En développement, `/api` est proxifié vers le backend (voir `vite.config.js`).
- Le header `Accept-Language` est envoyé automatiquement pour le contenu multilingue.
- Le jeton d'authentification est joint en header `Authorization: Bearer <token>`.

Endpoints utilisés : événements, actualités, espaces, galerie, contact (`POST /api/contact`),
newsletter (`POST /api/newsletter`) et l'ensemble de l'administration (`/api/admin/*`).

## ✨ Améliorations récentes

- **SEO** : meta Open Graph, Twitter Card, canonical, `hreflang`, JSON-LD, `theme-color`, preconnect Google Fonts
- **Performance** : découpage du code (routes admin et pages détail chargées à la demande) + chunking des vendors
- **Accessibilité** : styles `:focus-visible`, liens d'évitement, textes alternatifs, `aria-label`,
  support `prefers-reduced-motion`
- **UI/UX** : bouton "retour en haut", défilement fluide entre les pages, police arabe appliquée en RTL,
  palette de gris standardisée en tokens CSS
- **Robustesse** : `ErrorBoundary` global, corrections de bugs (boutons d'annulation des formulaires,
  classe `badge-{category}`), formulaire de contact relié à l'API réelle
- **Nettoyage** : dépendances inutilisées (Tiptap) et hooks morts supprimés

## 📁 Structure du projet

```
src/
├── components/   # Composants réutilisables (layout, public, admin, common)
├── context/      # Contextes React (auth, langue/RTL)
├── hooks/        # Hooks personnalisés (useAuth, useDocumentTitle)
├── i18n/         # Fichiers de traduction
├── pages/        # Pages publiques et admin
├── services/     # Client API (Axios)
└── styles/       # Feuilles de style globales et variables CSS
```

## 🔐 Zone d'administration

Accès via `/admin/login`. La session est gérée côté frontend avec un jeton
stocké dans le navigateur ; les routes d'administration sont protégées.

## 📄 Licence

Projet privé — Centre Hassan II des Rencontres Internationales.
