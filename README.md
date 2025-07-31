# 🐾 Zoo Management System

Système complet de gestion d'un zoo avec authentification Auth0, contrôle d'accès basé sur les rôles, et interface moderne.

## 📋 Fonctionnalités

### ✅ Backend (NestJS)
- **API REST** avec documentation Swagger
- **Authentification Auth0** avec JWT
- **Contrôle d'accès** basé sur les rôles (gardien, vétérinaire, visiteur)
- **Base de données PostgreSQL** avec TypeORM
- **Annotations OpenAPI** complètes pour Swagger

### ✅ Frontend (Angular)
- **Interface moderne** avec Angular Material
- **Authentification Auth0** intégrée
- **Gestion des animaux** avec barre de santé visuelle
- **Gestion des enclos** avec grille responsive
- **Contrôle d'accès** adaptatif selon les rôles

## 🚀 Installation Rapide

### Prérequis
- Node.js (v18+)
- PostgreSQL
- Compte Auth0

### 1. Cloner le projet
```bash
git clone <repository-url>
cd zoo-project-tp
```

### 2. Configuration de la base de données
Assurez-vous que votre base de données PostgreSQL Docker est démarrée et accessible sur le port 5432

### 3. Configuration Auth0
1. Créez une application dans [Auth0](https://auth0.com)
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

## 📚 Documentation API

L'API est documentée avec Swagger et accessible à : `http://localhost:3000/api`

### Endpoints Principaux

#### Animaux (`/animaux`)
- `GET /animaux` - Liste tous les animaux
- `POST /animaux` - Crée un nouvel animal
- `GET /animaux/:id` - Récupère un animal (authentification requise)
- `DELETE /animaux/:id` - Supprime un animal (rôle gardien requis)
- `GET /animaux/soigner/:id` - Soigne un animal (rôle vétérinaire requis)

#### Enclos (`/enclos`)
- `GET /enclos` - Liste tous les enclos
- `POST /enclos` - Crée un nouvel enclos (rôle gardien requis)
- `PUT /enclos/:id` - Modifie un enclos (rôle gardien requis)
- `DELETE /enclos/:id` - Supprime un enclos (rôle gardien requis)

## 🔐 Authentification et Rôles

### Rôles Utilisateur
- **Gardien** : Accès complet (CRUD animaux et enclos)
- **Vétérinaire** : Consultation + soins des animaux
- **Visiteur** : Consultation uniquement

### Test des Endpoints
1. Connectez-vous via l'interface web
2. Copiez le token JWT depuis la console du navigateur
3. Utilisez le token dans Swagger UI : `http://localhost:3000/api`

## 🧪 Tests

### Backend
```bash
cd backend
npm run test          # Tests unitaires
npm run test:e2e      # Tests e2e
npm run test:cov      # Couverture de code
```

### Frontend
```bash
cd frontend
ng test              # Tests unitaires
ng e2e               # Tests e2e
```

## 📁 Structure du Projet

```
zoo-project-tp/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── animaux/        # Module animaux
│   │   ├── enclos/         # Module enclos
│   │   ├── auth/           # Authentification
│   │   └── main.ts         # Point d'entrée
│   ├── package.json
│   └── README.md
├── frontend/               # Application Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Composants UI
│   │   │   ├── services/   # Services API
│   │   │   └── models/     # Interfaces TypeScript
│   │   └── main.ts
│   ├── package.json
│   └── README.md
└── README.md              # Ce fichier
```

## 🔧 Configuration Détaillée

### Variables d'Environnement Backend (.env)
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

### Configuration Frontend (environment.ts)
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

## 🎯 Utilisation

### 1. Démarrage
```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
ng serve
```

### 2. Accès
- **Frontend** : `http://localhost:4200`
- **API Swagger** : `http://localhost:3000/api`

### 3. Test des Fonctionnalités
1. **Connexion** : Cliquez sur "Connexion" et authentifiez-vous
2. **Gestion Animaux** : Ajoutez, consultez, soignez des animaux
3. **Gestion Enclos** : Créez et gérez les enclos
4. **Rôles** : Testez les différents niveaux d'accès

## 🐛 Dépannage

### Problèmes Courants

**Erreur de connexion à la base de données**
- Vérifiez que votre conteneur PostgreSQL Docker est démarré
- Vérifiez les paramètres dans `.env`
- Vérifiez que le port 5432 est accessible

**Erreur d'authentification Auth0**
- Vérifiez la configuration Auth0
- Vérifiez les URLs autorisées dans Auth0

**Erreur CORS**
- Vérifiez que le backend est démarré sur le port 3000
- Vérifiez la configuration CORS dans `main.ts`

## 📝 Améliorations Implémentées

### Backend
- ✅ Annotations OpenAPI pour Swagger
- ✅ Route GetById accessible aux utilisateurs authentifiés
- ✅ Route Delete accessible uniquement aux gardiens
- ✅ Route soignerAnimal accessible uniquement aux vétérinaires
- ✅ Nouvelle entité Enclos avec 3 endpoints
- ✅ Contrôle d'accès basé sur les rôles

### Frontend
- ✅ Composants pour visualiser les animaux
- ✅ Composants pour visualiser les enclos
- ✅ Interface moderne avec Angular Material
- ✅ Gestion des rôles et permissions
- ✅ Formulaires d'ajout et de modification

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👥 Auteurs

Développé pour l'évaluation finale ESGI - TypeScript. 