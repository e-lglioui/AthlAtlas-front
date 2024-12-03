# **AthlAtlas - Frontend**

## **Description**
Le front-end de l'application **AthlAtlas** permet aux utilisateurs (organisateurs et participants) de gérer les événements sportifs, de s'inscrire aux événements et de consulter les informations pertinentes. Développé avec **React.js**, **Redux**  et **React Router**, cette partie de l'application offre une interface utilisateur interactive et responsive.

---

## **Caractéristiques principales**
- **Gestion des événements** : affichage, inscription et gestion des événements sportifs.
- **Inscription des participants** : formulaire d'inscription pour chaque événement.
- **Authentification et autorisation** : connexion avec gestion des rôles (organisateur et participant).
- **Navigation sécurisée** : routes protégées pour l'accès aux informations sensibles.
- **Gestion des états globaux** : gestion des états avec Redux ou Context API.
- **Responsivité** : interface responsive adaptée aux différents types d’écrans (mobile, tablette, desktop).

---

## **Installation**

### **1. Prérequis**
Assurez-vous d’avoir installé les outils suivants :
- **Node.js** (version ≥ 16.x)
- **npm** ou **yarn** (gestionnaire de paquets)

### **2. Cloner le projet**
```bash
git clone https://github.com/e-lglioui/athlatlas-front.git
cd athlatlas-front
```

### **3 Installer les dépendances**
```bash
npm install
```
### **4 Configurer les variables d’environnement**
```bash
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_JWT_SECRET=your_jwt_secret_key
```
### **5 Lancer l’application**
```bash
npm start
```
### **6. Tester l'application**
```bash
npm run test
```
