#!/bin/bash

echo "🐾 Démarrage du Zoo Management System"
echo "======================================"

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier si Docker est installé et PostgreSQL est accessible
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker n'est pas installé ou pas dans le PATH."
    echo "Assurez-vous que votre conteneur PostgreSQL Docker est démarré."
else
    echo "🐳 Docker détecté. Vérifiez que votre conteneur PostgreSQL est démarré."
fi

echo "📦 Installation des dépendances..."

# Backend
echo "🔧 Installation des dépendances Backend..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
fi

# Vérifier si le fichier .env existe
if [ ! -f ".env" ]; then
    echo "⚠️  Fichier .env manquant dans le backend."
    echo "Copiez env.example vers .env et configurez vos paramètres de base de données Docker."
    cp env.example .env
    echo "✅ Fichier .env créé. Veuillez le configurer avec vos paramètres Docker PostgreSQL."
fi

cd ..

# Frontend
echo "🎨 Installation des dépendances Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

echo ""
echo "🚀 Démarrage des services..."
echo ""

# Démarrer le backend en arrière-plan
echo "🔧 Démarrage du Backend (NestJS) sur http://localhost:3000"
cd backend
npm run start:dev &
BACKEND_PID=$!
cd ..

# Attendre un peu que le backend démarre
sleep 5

# Démarrer le frontend
echo "🎨 Démarrage du Frontend (Angular) sur http://localhost:4200"
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Services démarrés !"
echo ""
echo "📱 Frontend: http://localhost:4200"
echo "📚 API Swagger: http://localhost:3000/api"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter tous les services"

# Fonction pour nettoyer les processus
cleanup() {
    echo ""
    echo "🛑 Arrêt des services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Services arrêtés."
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Attendre que les processus se terminent
wait 