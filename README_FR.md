# PWAFire - API Progressive Web Apps des APIs

## 🎉 Annonce de PWAFire v5.1.8

Nous sommes ravis d'annoncer la sortie de PWAFire v5.1.8 ! Cette version apporte des améliorations significatives à la structure de l'API et à l'expérience développeur.

### Fonctionnalités Principales

1. **Structure d'API Moderne**

   - Importations directes pour un meilleur tree-shaking
   - Importations par espace de noms pour la compatibilité ascendante
   - Fonctions autonomes pour une meilleure modularité
   - Convention de nommage camelCase cohérente

2. **Nouveaux Styles d'Importation**

```js
// Importations directes (recommandé pour le tree-shaking)
import { visibility } from "pwafire";

// Importation directe avec chemin
import { visibility } from "pwafire/visibility";

// Importations par espace de noms (compatibilité ascendante)
import { pwa } from "pwafire";

pwa.visibility();
```

3. **Fonctions Autonomes**

```js
// API Contacts
import { contacts } from "pwafire";
const result = await contacts(["name", "email"], { multiple: true });

// API Détection d'Inactivité
import { idleDetection } from "pwafire";
const result = await idleDetection(
  "start",
  () => {
    console.log("L'utilisateur est inactif");
  },
  120000
);
```

### Conventions de Nommage

- Les méthodes à un seul mot sont en minuscules (ex : `visibility`)
- Les méthodes à plusieurs mots utilisent le camelCase (ex : `webShare`, `loadOnScroll`)
- Toutes les méthodes d'API suivent des modèles de nommage cohérents

### Installation

```bash
npm install pwafire@latest
```

### Documentation

Pour une documentation détaillée et des exemples, visitez [docs.pwafire.org](https://docs.pwafire.org/get-started).

### Support des Navigateurs

Toutes les APIs sont stables dans **Chrome 80** et les versions ultérieures, y compris **MS Edge**. Vérifiez le statut du [Support des Navigateurs](https://pwafire.org/developer/tools/browser-test/).

### Contribution

Nous accueillons les contributions ! Veuillez lire notre [Guide de Contribution](CONTRIBUTING.md) pour plus de détails sur notre code de conduite et le processus de soumission des pull requests.

### Licence

Ce projet est sous licence MIT - voir le fichier [LICENCE](LICENSE) pour plus de détails.

---

## API Progressive Web Apps des APIs

Construisez des Applications Web Progressives Évolutives. Commencez via le site [docs.pwafire.org](https://docs.pwafire.org/get-started).

Une bibliothèque et un framework open-source pour construire des Applications Web Progressives (PWA) rapides, fiables et engageantes.

![CI](https://img.shields.io/npm/dm/pwafire)

## Installation

### Via NPM

```bash
npm install pwafire --save
```

### Via CDN (Module ES6)

#### Dernière version

```js
import { pwa } from "https://unpkg.com/pwafire/esm/index.js";
```

#### Version spécifique

```js
import { pwa } from "https://unpkg.com/pwafire@3.0.8/esm/index.js";
```

## Démarrage Rapide

### Importation dans votre application React

```js
import { pwa } from "pwafire";
```

### Partage de données

```js
// Utilisation de webShare (camelCase pour les méthodes à plusieurs mots)
pwa.webShare(data);

// Utilisation de visibility (minuscules pour les mots simples)
pwa.visibility();
```

## Détection des Fonctionnalités API

- Permet des gestionnaires personnalisés lorsque nécessaire
- Approche expérimentale qui sera mise à jour
- Construit pour les APIs stables disponibles

### Exemple : Détection du Partage Web

```js
// Obtenir l'instance de vérification depuis pwafire
import { check } from "pwafire";

// Vérifier si le Partage Web est supporté
const supported = await check.webShare();
```

## Capacités Web Supportées

| Fonctionnalité                                          | Stabilité |
| ------------------------------------------------------- | --------- |
| Installation (Personnalisée)                            | ✅        |
| Synchronisation en Arrière-plan                         | ✅        |
| Badging                                                 | ✅        |
| Sélecteur de Contacts                                   | ✅        |
| Verrouillage d'Écran                                    | ✅        |
| Indexation de Contenu                                   | ✅        |
| Copie de Texte                                          | ✅        |
| Lecture de Texte (Presse-papiers)                       | ✅        |
| Copie d'Images                                          | ✅        |
| Lecture de Fichiers (Presse-papiers)                    | ✅        |
| Notifications Push                                      | ✅        |
| Partage Web                                             | ✅        |
| Paiements Web                                           | ✅        |
| [Voir Tout (14+)](https://docs.pwafire.org/get-started) | ✅        |

## Communauté

### Canaux de Communication

| Canal   | Lien                                    |
| ------- | --------------------------------------- |
| Twitter | [@pwafire](https://twitter.com/pwafire) |

### Contribuer

Proposez votre fonctionnalité en [créant une issue](https://github.com/pwafire/pwafire/issues/new).

### Licence

[Licence MIT](https://github.com/pwafire/pwafire/blob/master/.github/LICENSE)
