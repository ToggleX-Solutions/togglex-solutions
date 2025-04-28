# ToggleX Solutions

Plateforme de gestion des abonnements Twitter avec paiement Stripe.

## Installation

### Frontend (React)

1. Naviguer vers le dossier Frontend :
```bash
cd Frontend
```

2. Installer les dépendances :
```bash
npm install
```

3. Configurer Tailwind CSS :
```bash
npx tailwindcss init -p
```

4. Démarrer le serveur de développement :
```bash
npm start
```

### Backend (Node.js)

1. Naviguer vers le dossier Backend :
```bash
cd Backend
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer un fichier `.env` dans le dossier Backend avec les variables suivantes :
```
PORT=3001
STRIPE_SECRET_KEY=votre_clé_secrète_stripe
STRIPE_PUBLIC_KEY=votre_clé_publique_stripe
JWT_SECRET=une_clé_secrète_pour_jwt
FRONTEND_URL=http://localhost:3000
```

4. Créer la base de données SQLite :
```bash
touch database.sqlite
```

5. Démarrer le serveur :
```bash
npm start
```

## Configuration Stripe

1. Créer un compte Stripe sur https://stripe.com
2. Récupérer les clés API dans le tableau de bord Stripe (section "Developers" > "API keys")
3. Configurer les produits et prix dans le tableau de bord Stripe :
   - BASIC : 28$
   - ARGENT : 50$
   - GOLD : 90$
   - DIAMOND : 170$
   - CUIVRE : 300$
   - PLATINIUM : 480$

## Structure du Projet

### Frontend
- `src/` : Code source React
  - `components/` : Composants réutilisables
  - `pages/` : Pages de l'application
  - `App.jsx` : Composant principal
  - `index.js` : Point d'entrée
  - `index.css` : Styles globaux

### Backend
- `server.js` : Serveur Express
- `database.sqlite` : Base de données SQLite
- `.env` : Variables d'environnement

## Déploiement

### Frontend (Vercel)

1. Créer un compte Vercel
2. Connecter le dépôt GitHub
3. Configurer les variables d'environnement :
   - `REACT_APP_API_URL` : URL de l'API backend
4. Déployer

### Backend (Railway)

1. Créer un compte Railway
2. Connecter le dépôt GitHub
3. Configurer les variables d'environnement :
   - `PORT`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLIC_KEY`
   - `JWT_SECRET`
   - `FRONTEND_URL`
4. Déployer

## Accès Admin

- Email : admin@togglexsolutions.com
- Mot de passe : Lisu@2025

## Technologies Utilisées

- Frontend : React, TailwindCSS, Framer Motion, Recharts
- Backend : Node.js, Express, SQLite
- Paiement : Stripe
- Base de données : SQLite 