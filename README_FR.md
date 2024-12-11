# Des APIs pour les Progressive Web Apps (Sponsorisez-nous)

Créez des Progressive Web Apps évolutives. Commencez avec notre site web [docs.pwafire.org](https://docs.pwafire.org/get-started).

![Build package](https://github.com/pwafire/pwafire/workflows/Build%20package/badge.svg) ![CI](https://img.shields.io/npm/dm/pwafire)

## Les changements pour la version 3.0.0 à venir

Toutes les **async responses** retournées ont une nouvelle valeur `success`, un type booléen qui remplace la valeur `type`, une chaîne de caractères comme indiqué ci-dessous ;

```js

// Async API...
const res = await pwa.CopyText(text);

// Versions antérieures...
 if(res.type === 'success')  {
   // Exécutez votre code...
 }

//  Nouvelle version à partir de v3.0.0
 if(res.success)  {
   // Exécutez votre code...
 }

```

## Présentation de _pwafire_ cdn et npm

Progressive Web Apps **API des APIs**. Toutes les nouvelles fonctionnalités Web en un seul paquet.

### Installez pwafire via NPM

```bash
 npm i pwafire --save
```

### Obtenir pwafire par CDN comme module E6

Notez que vous pouvez toujours utiliser une version spécifique sur le cdn de pwafire

#### Dernière version

```js
import pwafire from "https://unpkg.com/pwafire/esm/index.js";
const pwa = pwafire.pwa;
```

#### Version spécifique

```js
import pwafire from "https://unpkg.com/pwafire@3.0.1/esm/index.js";
const pwa = pwafire.pwa;
```

### Exemple : utilisation de _pwafire_

#### Importez pwafire dans votre application react

```js
import pwafire from "pwafire";
const pwa = pwafire.pwa;
```

#### Appelez la méthode de partage sur pwa

```js
pwa.Share(data);
```

Prévisualiser la documentation : [Démarrer](https://docs.pwafire.org/get-started)

## PWA : Nouvelles fonctionnalités Web

| Feature                                                                                                | Feature                   |
| ------------------------------------------------------------------------------------------------------ | ------------------------- |
| Custom Install Button                                                                                  | Offline Capabilities      |
| Background Sync                                                                                        | Native App Install Banner |
| Badging                                                                                                | Web Share                 |
| Contact Picker                                                                                         | Copy Text                 |
| Share Target                                                                                           | Copy Images               |
| Screen Wake Lock                                                                                       | Push Notifications        |
| [View All, 10 + Here](https://github.com/pwafire/pwafire/tree/master/packages#install-pwafire-via-npm) |

## Chat : Participez à la conversation

Suivez notre [Compte de développeur](https://twitter.com/pwafire) sur [Twitter](https://twitter.com/pwafire). Obtenez une aide en direct sur notre [espace de travail Slack](https://join.slack.com/t/pwafire/shared_invite/enQtMjk1MjUzNDY5NDkyLWQzYTFhOTNjMTU2NzBjMTBhMjZkNDJkOTY0YzgxYWViNTI4YzgyZDUxNGIyYzlkM2RiZjc2NTAwMzRhMmZkZmI).

| Canal de communication |  Parlez-nous                              |
| --------------------- | --------------------------------------- |
| Twitter Chat          | [Tweet us](https://twitter.com/pwafire) |

### Contribuer

Proposez votre fonctionnalité en [créant une question](https://github.com/pwafire/pwafire/issues/new)

### Licence

| Licence     | Lien                                                                           |
| ----------- | ------------------------------------------------------------------------------ |
| Licence MIT | [Voir la licence](https://github.com/pwafire/pwafire/blob/master/.github/LICENSE) |
