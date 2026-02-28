# 🚀 Déployer Road Trip Algérie 2026 sur Vercel

Ce projet est un site statique (HTML / CSS / JS) — aucun build n'est nécessaire.  
Vercel est idéal pour l'héberger gratuitement avec un lien partageable.

---

## Prérequis

- Un compte GitHub (déjà fait ✅)
- Un compte Vercel gratuit : <https://vercel.com/signup>

---

## Étapes de déploiement

### 1. Créer un compte Vercel

1. Aller sur **<https://vercel.com>**
2. Cliquer sur **Sign Up** → choisir **Continue with GitHub**
3. Autoriser Vercel à accéder à vos dépôts GitHub

### 2. Importer le projet

1. Depuis le tableau de bord Vercel, cliquer sur **Add New → Project**
2. Dans la liste des dépôts, sélectionner **road-trip-algeria-2026**
3. Vercel détectera automatiquement qu'il s'agit d'un site statique

### 3. Configurer (rien à changer)

Le fichier `vercel.json` inclus dans le dépôt configure tout automatiquement :

| Paramètre          | Valeur  | Explication                          |
|---------------------|---------|--------------------------------------|
| `buildCommand`      | `null`  | Pas de build nécessaire              |
| `outputDirectory`   | `.`     | Tout le dépôt est le site            |
| `cleanUrls`         | `true`  | Accès sans extension `.html`         |

Cliquer sur **Deploy** — c'est tout !

### 4. Accéder au site

Après le déploiement (~30 secondes), Vercel fournit un lien :  
**`https://road-trip-algeria-2026.vercel.app`** (ou un nom similaire)

Ce lien est partageable immédiatement avec vos amis 🎉

---

## Mises à jour automatiques

Chaque `git push` vers la branche principale déclenche automatiquement un nouveau déploiement sur Vercel. Aucune action manuelle requise.

---

## Alternative : déploiement via CLI

```bash
# Installer la CLI Vercel
npm install -g vercel

# Se connecter
vercel login

# Déployer depuis le dossier du projet
vercel

# Déployer en production
vercel --prod
```

---

## Résumé

| Étape | Action                       | Durée  |
|-------|------------------------------|--------|
| 1     | Créer un compte Vercel       | 1 min  |
| 2     | Importer le dépôt GitHub     | 1 min  |
| 3     | Cliquer sur Deploy           | 30 sec |
| 4     | Partager le lien 🔗          | ✅     |
