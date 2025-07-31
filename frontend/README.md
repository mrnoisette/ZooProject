# Zoo Frontend - Angular Application

Application frontend Angular pour la gestion d'un zoo avec authentification Auth0 et interface moderne.

## 🚀 Installation et Configuration

### Prérequis
- Node.js (v18+)
- Angular CLI
- Compte Auth0 configuré

### 1. Installation des dépendances
```bash
npm install
```

### 2. Configuration Auth0
1. Créez une application Single Page Application (SPA) dans Auth0
2. Configurez les URLs autorisées :
   - Allowed Callback URLs: `http://localhost:4200`
   - Allowed Logout URLs: `http://localhost:4200`
   - Allowed Web Origins: `http://localhost:4200`
3. Configurez les rôles utilisateur :
   - `gardien` : Peut gérer les animaux et enclos
   - `veterinaire` : Peut soigner les animaux
   - `visiteur` : Peut consulter les informations

### 3. Configuration de l'environnement
Créez un fichier `src/environments/environment.ts` :
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

### 4. Lancement de l'application
```bash
# Développement
ng serve

# Production
ng build
```

L'application sera accessible à : `http://localhost:4200`

## 🎨 Fonctionnalités

### Gestion des Animaux
- **Affichage** : Liste de tous les animaux avec leur santé
- **Ajout** : Formulaire pour créer de nouveaux animaux
- **Soins** : Bouton pour soigner les animaux (rôle vétérinaire)
- **Suppression** : Bouton pour supprimer les animaux (rôle gardien)
- **Santé** : Barre de progression visuelle de la santé

### Gestion des Enclos
- **Affichage** : Grille des enclos avec informations détaillées
- **Ajout** : Formulaire pour créer de nouveaux enclos (rôle gardien)
- **Modification** : Édition des informations d'enclos (rôle gardien)
- **Suppression** : Suppression d'enclos (rôle gardien)
- **Statut** : Indicateur visuel ouvert/fermé

### Authentification et Autorisation
- **Connexion** : Authentification via Auth0
- **Rôles** : Contrôle d'accès basé sur les rôles utilisateur
- **Interface adaptative** : Affichage conditionnel selon les permissions

## 🏗️ Architecture

### Composants
- `AppComponent` : Composant principal avec navigation
- `AnimauxListComponent` : Gestion de la liste des animaux
- `EnclosListComponent` : Gestion de la liste des enclos

### Services
- `AnimauxService` : Communication avec l'API animaux
- `EnclosService` : Communication avec l'API enclos
- `AuthService` : Gestion de l'authentification Auth0

### Modèles
- `Animal` : Interface pour les animaux
- `Enclos` : Interface pour les enclos
- `CreateAnimalDto` : DTO pour la création d'animaux
- `CreateEnclosDto` : DTO pour la création d'enclos

## 🎯 Utilisation

### Connexion
1. Cliquez sur "Connexion" dans la barre de navigation
2. Authentifiez-vous via Auth0
3. Vous serez redirigé vers l'application

### Navigation
- **Animaux** : Accédez à la gestion des animaux
- **Enclos** : Accédez à la gestion des enclos

### Actions selon les rôles
- **Visiteur** : Consultation uniquement
- **Vétérinaire** : Consultation + soins des animaux
- **Gardien** : Toutes les actions (CRUD complet)

## 🔧 Scripts disponibles

- `ng serve` - Lancement en mode développement
- `ng build` - Compilation pour la production
- `ng test` - Lancement des tests
- `ng lint` - Vérification du code

## 📱 Interface utilisateur

L'application utilise Angular Material pour une interface moderne et responsive :
- **Design Material** : Composants cohérents et accessibles
- **Responsive** : Adaptation aux différentes tailles d'écran
- **Animations** : Transitions fluides et feedback visuel
- **Accessibilité** : Support des standards WCAG

## 🔐 Sécurité

- **Authentification** : Auth0 pour la gestion des utilisateurs
- **Autorisation** : Contrôle d'accès basé sur les rôles
- **Tokens JWT** : Communication sécurisée avec l'API
- **HTTPS** : Recommandé en production

## 🧪 Tests

```bash
# Tests unitaires
ng test

# Tests e2e
ng e2e
```

## 📦 Déploiement

### Build de production
```bash
ng build --configuration production
```

### Variables d'environnement
Assurez-vous de configurer les variables d'environnement pour la production :
- `auth0.domain`
- `auth0.clientId`
- `auth0.audience`
