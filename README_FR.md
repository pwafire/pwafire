# API des APIs pour Progressive Web Apps

Une bibliothèque et un framework open-source pour créer des Progressive Web Apps (PWAs) rapides, fiables et engageantes. Construisez des PWAs évolutives grâce à notre collection complète d'APIs.

[![Téléchargements NPM](https://img.shields.io/npm/dm/pwafire)](https://www.npmjs.com/package/pwafire)

[Commencez avec la Documentation](https://docs.pwafire.org/get-started)

## Options d'Installation

Vous pouvez intégrer pwafire dans votre projet soit via NPM, soit via CDN.

### Installation via NPM

Pour ajouter pwafire à votre projet en utilisant NPM, exécutez :

```bash
npm i pwafire --save
```

### Intégration via CDN

Accédez à pwafire directement via notre CDN en tant que Module ES6. Vous pouvez utiliser soit la dernière version, soit spécifier une version particulière.

Pour la dernière version :

```js
import { pwa } from "https://unpkg.com/pwafire/dist/index.js";
```

Pour une version spécifique :

```js
import { pwa } from "https://unpkg.com/pwafire@5.1.4-rc.1/dist/index.js";
```

## Exemple d'Utilisation

Voici un exemple simple d'utilisation de pwafire dans votre application :

```js
// Importez pwafire dans votre application
import { pwa } from "pwafire";

// Utilisez la fonctionnalité de partage
pwa.Share(data);
```

## Détection des Fonctionnalités

Pwafire inclut une détection intégrée des fonctionnalités pour vous aider à offrir la meilleure expérience sur différents navigateurs et plateformes. Notre système de détection permet des gestionnaires personnalisés et s'adapte aux différents niveaux de support des navigateurs.

```js
// Importez la fonctionnalité de vérification
import { check } from "pwafire";

// Vérifiez si des fonctionnalités spécifiques sont supportées
const partageSupporte = await check.Share();

// Obtenez le statut de support pour toutes les fonctionnalités
const toutesLesFonctionnalites = await check.All();
```

## Capacités Web Disponibles

Pwafire implémente les APIs du Project Fugu pour fournir des capacités web modernes. Voici les fonctionnalités stables actuellement disponibles :

| Fonctionnalité            | Statut | Description                                    |
|--------------------------|---------|------------------------------------------------|
| Installation Personnalisée| Stable  | Expérience d'installation PWA personnalisable  |
| Synchronisation en Arrière-plan | Stable | Report des actions jusqu'à la disponibilité du réseau |
| Badges                   | Stable  | Ajout de badges de notification aux icônes    |
| Sélecteur de Contacts    | Stable  | Accès au carnet d'adresses de l'appareil      |
| Verrouillage d'Écran    | Stable  | Maintien de l'écran actif si nécessaire      |
| Indexation de Contenu    | Stable  | Rend le contenu de l'application recherchable |
| Accès au Presse-papiers  | Stable  | Lecture/écriture de texte, images et fichiers |
| Notifications Push       | Stable  | Engagement des utilisateurs avec des mises à jour |
| Partage Web             | Stable  | Capacités de partage natives                  |
| Paiements Web           | Stable  | Traitement simplifié des paiements            |

[Voir Toutes les Fonctionnalités](https://docs.pwafire.org/get-started)

## Communauté et Support

Rejoignez notre communauté active pour obtenir de l'aide et partager vos expériences :

- Suivez notre [Compte Développeur sur Twitter](https://twitter.com/pwafire)
- Rejoignez notre [Espace Slack](https://join.slack.com/t/pwafire/shared_invite/enQtMjk1MjUzNDY5NDkyLWQzYTFhOTNjMTU2NzBjMTBhMjZkNDJkOTY0YzgxYWViNTI4YzgyZDUxNGIyYzlkM2RiZjc2NTAwMzRhMmZkZmI) pour une assistance en direct
- [Créez une Issue](https://github.com/pwafire/pwafire/issues/new) pour proposer des fonctionnalités ou signaler des bugs

## Licence

Ce projet est sous licence [MIT License](https://github.com/pwafire/pwafire/blob/master/.github/LICENSE).
