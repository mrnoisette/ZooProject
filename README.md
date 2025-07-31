# Zoo Management System

Application de gestion d'un zoo avec authentification Auth0 et contrôle d'accès par rôles.

## Fonctionnalités

### Backend (NestJS)
- API REST avec documentation Swagger
- Authentification Auth0 avec JWT
- Contrôle d'accès par rôles (gardien, vétérinaire, visiteur)
- Base de données PostgreSQL avec TypeORM
- Documentation OpenAPI complète

### Frontend (Angular)
- Interface moderne avec Angular Material
- Authentification Auth0 intégrée
- Gestion des animaux avec barre de santé
- Gestion des enclos avec grille responsive
- Contrôle d'accès selon les rôles

## Installation

### Prérequis
- Node.js (v18+)
- PostgreSQL (Docker)
- Compte Auth0

### 1. Cloner le projet
```bash
git clone https://github.com/mrnoisette/ZooProject.git
cd ZooProject
```

### 2. Base de données
Assurez-vous que votre conteneur PostgreSQL Docker est démarré.

### 3. Configuration Auth0
1. Créez une application dans Auth0
2. Configurez les rôles : `gardien`, `veterinaire`, `visiteur`
3. Notez votre domaine et client ID

### 4. Configuration Backend
```bash
cd backend
npm install
cp env.example .env
# Éditez .env avec vos paramètres
npm run start:dev
```

### 5. Configuration Frontend
```bash
cd frontend
npm install
# Configurez Auth0 dans src/environments/environment.ts
ng serve
```

## API Documentation

Swagger disponible à : `http://localhost:3000/api`

### Endpoints

#### Animaux (`/animaux`)
- `GET /animaux` - Liste tous les animaux
- `POST /animaux` - Crée un animal
- `GET /animaux/:id` - Récupère un animal (auth requise)
- `DELETE /animaux/:id` - Supprime un animal (gardien)
- `GET /animaux/soigner/:id` - Soigne un animal (vétérinaire)

#### Enclos (`/enclos`)
- `GET /enclos` - Liste tous les enclos
- `POST /enclos` - Crée un enclos (gardien)
- `PUT /enclos/:id` - Modifie un enclos (gardien)
- `DELETE /enclos/:id` - Supprime un enclos (gardien)

## Rôles utilisateur

- **Gardien** : Accès complet (CRUD animaux et enclos)
- **Vétérinaire** : Consultation + soins des animaux
- **Visiteur** : Consultation uniquement

## Test des endpoints

1. Connectez-vous via l'interface web
2. Copiez le token JWT depuis la console
3. Utilisez le token dans Swagger UI

## Lancement rapide

```bash
./start.sh
```

## Accès

- **Frontend** : `http://localhost:4200`
- **API Swagger** : `http://localhost:3000/api`

## Variables d'environnement

### Backend (.env)
```env
# Database (Docker PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=zoo_db

# Auth0
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com/
AUTH0_AUDIENCE=http://localhost:3000

# Application
PORT=3000
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  auth0: {
    domain: 'your-domain.auth0.com',
    clientId: 'your-client-id',
    audience: 'http://localhost:3000'
  }
};
```

## Structure du projet

```
zoo-project-tp/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── animaux/        # Module animaux
│   │   ├── enclos/         # Module enclos
│   │   ├── auth/           # Authentification
│   │   └── main.ts
│   └── README.md
├── frontend/               # Application Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Composants UI
│   │   │   ├── services/   # Services API
│   │   │   └── models/     # Interfaces
│   │   └── main.ts
│   └── README.md
└── README.md
```

## Tests

```bash
# Backend
cd backend
npm run test

# Frontend
cd frontend
ng test
```

## Dépannage

**Erreur de connexion à la base de données**
- Vérifiez que votre conteneur PostgreSQL Docker est démarré
- Vérifiez les paramètres dans `.env`

**Erreur d'authentification Auth0**
- Vérifiez la configuration Auth0
- Vérifiez les URLs autorisées

**Erreur CORS**
- Vérifiez que le backend est démarré sur le port 3000 