## Des APIs pour les Progressive Web Apps (Sponsorisez-nous)

Créez des Progressive Web Apps évolutives. Commencez avec notre site web [docs.pwafire.org](https://docs.pwafire.org/get-started).

<span>![Build package](https://github.com/pwafire/pwafire/workflows/Build%20package/badge.svg)</span> <span><img src="https://img.shields.io/npm/dm/pwafire" alt="CI" /></span>

### Les changements pour la version 3.0.0 à venir

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

## Contributeurs

### Contributeurs au code

Ce projet existe grâce à toutes les personnes qui y contribuent. [[Contribuer](CONTRIBUTING.md)].
<a href="https://github.com/pwafire/pwafire/graphs/contributors"><img src="https://opencollective.com/pwafire/contributors.svg?width=890&button=false" /></a>

### Contributeurs financiers

Devenez un contributeur financier et aidez-nous à soutenir notre communauté. [Contribuer](https://opencollective.com/pwafire/contribute)]

### Particuliers

<a href="https://opencollective.com/pwafire"><img src="https://opencollective.com/pwafire/individuals.svg?width=890"></a>

### Organisations

Soutenez ce projet avec votre organisation. Votre logo apparaîtra ici avec un lien vers votre site web. [[Contribuer](https://opencollective.com/pwafire/contribute)]

<a href="https://opencollective.com/pwafire/organization/0/website"><img src="https://opencollective.com/pwafire/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/1/website"><img src="https://opencollective.com/pwafire/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/2/website"><img src="https://opencollective.com/pwafire/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/3/website"><img src="https://opencollective.com/pwafire/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/4/website"><img src="https://opencollective.com/pwafire/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/5/website"><img src="https://opencollective.com/pwafire/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/6/website"><img src="https://opencollective.com/pwafire/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/7/website"><img src="https://opencollective.com/pwafire/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/8/website"><img src="https://opencollective.com/pwafire/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/pwafire/organization/9/website"><img src="https://opencollective.com/pwafire/organization/9/avatar.svg"></a>

### Contribuer

Proposez votre fonctionnalité en [créant une question](https://github.com/pwafire/pwafire/issues/new)

### Licence

| Licence     | Lien                                                                           |
| ----------- | ------------------------------------------------------------------------------ |
| Licence MIT | [Voir la licence](https://github.com/pwafire/pwafire/blob/master/.github/LICENSE) |
