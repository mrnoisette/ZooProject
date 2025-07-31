# Zoo Backend API

API REST pour la gestion d'un zoo avec authentification Auth0 et contrôle d'accès basé sur les rôles.

## 🚀 Installation et Configuration

### Prérequis
- Node.js (v18+)
- PostgreSQL
- Compte Auth0

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration de la base de données
Assurez-vous que votre base de données PostgreSQL Docker est démarrée et accessible

### 3. Configuration Auth0
1. Créez une application dans Auth0
2. Configurez les rôles suivants :
   - `gardien` : Peut gérer les animaux et enclos
   - `veterinaire` : Peut soigner les animaux
   - `visiteur` : Peut consulter les informations

### 4. Configuration des variables d'environnement
Copiez `env.example` vers `.env` et configurez :
```bash
cp env.example .env
```

Variables requises :
- `DB_HOST` : Hôte PostgreSQL (localhost pour Docker)
- `DB_PORT` : Port PostgreSQL (5432)
- `DB_USERNAME` : Nom d'utilisateur PostgreSQL
- `DB_PASSWORD` : Mot de passe PostgreSQL
- `DB_DATABASE` : Nom de la base de données
- `AUTH0_ISSUER_BASE_URL` : URL de votre domaine Auth0
- `AUTH0_AUDIENCE` : Audience de votre API

### 5. Lancement de l'application
```bash
# Développement
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 📚 API Documentation

L'API est documentée avec Swagger et accessible à : `http://localhost:3000/api`

### Endpoints disponibles

#### Animaux (`/animaux`)
- `GET /animaux` - Liste tous les animaux
- `POST /animaux` - Crée un nouvel animal
- `GET /animaux/:id` - Récupère un animal (authentification requise)
- `GET /animaux/search/name?name=...` - Recherche par nom (authentification requise)
- `DELETE /animaux/:id` - Supprime un animal (rôle gardien requis)
- `GET /animaux/soigner/:id` - Soigne un animal (rôle vétérinaire requis)

#### Enclos (`/enclos`)
- `GET /enclos` - Liste tous les enclos
- `POST /enclos` - Crée un nouvel enclos (rôle gardien requis)
- `GET /enclos/:id` - Récupère un enclos
- `PUT /enclos/:id` - Modifie un enclos (rôle gardien requis)
- `DELETE /enclos/:id` - Supprime un enclos (rôle gardien requis)

## 🔐 Authentification et Autorisation

### Rôles utilisateur
- **Gardien** : Peut créer, modifier, supprimer des animaux et enclos
- **Vétérinaire** : Peut soigner les animaux (remet la santé à 100)
- **Visiteur** : Peut consulter les informations publiques

### Test des endpoints protégés
1. Obtenez un token JWT depuis Auth0
2. Utilisez le token dans l'en-tête : `Authorization: Bearer <token>`
3. Testez via Swagger UI ou avec un client HTTP

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Couverture de code
npm run test:cov
```

## 📝 Structure du projet

```
src/
├── animaux/           # Module de gestion des animaux
│   ├── dto/          # Data Transfer Objects
│   ├── entities/     # Entités TypeORM
│   ├── animaux.controller.ts
│   ├── animaux.service.ts
│   └── animaux.module.ts
├── enclos/           # Module de gestion des enclos
│   ├── dto/
│   ├── entities/
│   ├── enclos.controller.ts
│   ├── enclos.service.ts
│   └── enclos.module.ts
├── auth/             # Module d'authentification
│   ├── jwt.strategy.ts
│   ├── roles.guard.ts
│   ├── roles.decorator.ts
│   └── auth.module.ts
└── main.ts           # Point d'entrée de l'application
```

## 🔧 Scripts disponibles

- `npm run start:dev` - Lancement en mode développement
- `npm run build` - Compilation pour la production
- `npm run start:prod` - Lancement en production
- `npm run lint` - Vérification du code
- `npm run format` - Formatage du code
