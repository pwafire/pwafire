# Des APIs pour les Progressive Web Apps (Sponsorisez-nous)

Créez des Progressive Web Apps évolutives. Commencez avec notre site web [docs.pwafire.org](https://docs.pwafire.org/get-started) .

Bienvenue à **@pwafire v.3.0.0** qui est la base de notre prochaine génération d'API pwafire. Notez que, cette version est un changement radical, avant de mettre à jour, vérifiez les documentations d'abord.

## Les changements pour la version 3.0.0 à venir

Toutes les **async responses** retournées ont une nouvelle valeur `success`, un type booléen qui remplace la valeur `type`, une chaîne de caractères comme indiqué ci-dessous ;

```js
// Async API...
const res = await pwa.CopyText(text);

// Versions antérieures...
if (res.type === 'success') {
  // Exécutez votre code...
}

//  Nouvelle version à partir de v3.0.0
if (res.success) {
  // Exécutez votre code...
}
```

## Installez pwafire via NPM

```bash
npm i pwafire --save
```

### Obtenir pwafire par CDN comme module E6

Notez que vous pouvez toujours utiliser une version spécifique sur le cdn de pwafire

#### Dernière version

```js
import pwafire from 'https://unpkg.com/pwafire/esm/index.js';
const pwa = pwafire.pwa;
```

#### Version spécifique

```js
import pwafire from 'https://unpkg.com/pwafire@3.0.1/esm/index.js';
const pwa = pwafire.pwa;
```

### Importez pwafire dans votre application react

```js
import pwafire from 'pwafire';
const pwa = pwafire.pwa;
```

Tout est stable dans **Chrome 80** et les versions ultérieures, également dans **MS Edge**. Vérifiez le statut de votre [navigateur](https://pwafire.org/developer/tools/browser-test/).

### Spécification API

Pour tous les types de `promise`, la valeur de `promise` renvoyée est un objet - pouvant inclure des données supplémentaires ; par exemple, **Contacts API** renvoie une valeur supplémentaire **contacts**.

```js
// Success...success value is true...
{
  success, message;
}
// Fail...success value is false...
{
  success, error;
}
```

#### Faites quelque chose avec la valeur de la `promise` retournée, par exemple copier le texte avec copyText

```js
// Copy text
pwa.copyText(text).then((res) => {
  // Do something with 'res'
  if (res.success) {
    // Success...
  }
});
```

### 1. Copier un texte

Copier un texte dans le presse-papiers.

#### Appelez la méthode copyText sur pwa

```js
// Copy text
pwa.copyText(text);
```

### 2. Copier l'image (seuls les PNG sont pris en charge pour des raisons de sécurité) dans le presse-papiers

Copier les images png dans le presse-papiers

#### Appelez la méthode copyImage sur pwa

```js
pwa.copyImage(imgURL);
```

### 3. Web Share

Partager des liens, du texte et des fichiers avec d'autres applications installées sur l'appareil.

#### Définir l'objet de données à partager

```js
const data = {
  // Title of what to share
  title: `Some title..`,
  // Text to share
  text: `Some text...`,
  // Url to share...
  url: 'https://pwafire.org',
};
```

#### Appelez la méthode de partage sur pwa

```js
pwa.Share(data);
```

### 4. Contacts Picker (Sélecteur de contacts)

[L'API Sélecteur de contacts](https://github.com/pwafire/pwafire/tree/master/bundle/contact-picker) permet au PWA d'accéder aux contacts à partir du gestionnaire de contacts natif de l'appareil mobile.

**Chrome 80** ou supérieur fonctionnant sur **Android M ou supérieur** requis.

#### Définissez les "propriétés" et l'option "sélectionner le type" dont vous avez besoin

```js
const props = ['name', 'email', 'tel'];
const options = { multiple: true };
```

#### Appelez la méthode contacts sur un pwa, `promise` se résout avec un objet

```js
// Do something with the promise value...
pwa.Contacts(props, options).then((res) => {
  // Do something with contacts...
  const contacts = res.success ? res.contacts : null;
  //...
});
```

### 5. Afficher l'état de la connectivité du PWA

Passez dans deux fonctions de rappel, c'est-à-dire les gestionnaires **online** et **offline**.

#### Déclarer les deux gestionnaires (handlers) séparément

```js
// Online handler...
const online = () => {
  //...
};
// Offline handler...
const offline = () => {
  //...
};
```

#### Appelez la méthode de connectivité sur le pwa, en ajoutant les deux paramètres

```js
pwa.Connectivity(online, offline);
```

### 6. Fullscreen (Plein écran)

Ouvrir l'application en plein écran lors d'un événement de clic

#### Appelez la méthode Plein écran

```js
pwa.Fullscreen();
```

### 7. Notifications

Afficher les notifications. Passez un objet **data**.

#### Ajouter les données de notification

```js
const data = {
  title: 'Hello Notification!',
  options: {
    body: 'Progressive Web App Hello Notification!',
    icon: '../images/icons/icon-192x192.png',
    tag: 'pwa',
  },
};
```

#### Appelez la méthode de notification, passez dans l'objet `data`, par exemple

```js
// Call the notification method...
pwa.Notification(data);
```

### 8. Install

Ajouter un bouton d'installation personnalisé, en fournissant un "élément de bouton" comme paramètre.

#### Appelez la méthode "install"

```js
pwa.Install(button);
```

### 9. Badging (Badges)

#### Ajout de badges pour les icônes d'applications

Le badge permet d'avertir subtilement l'utilisateur qu'une nouvelle activité requiert son attention, ou d'indiquer un petit nombre d'informations, comme le nombre de documents non lus.

##### Définir le badge

Renvoie un objet, qui est soit un type de réussite, soit un type d'erreur.

```js
// Set the badge
const unreadCount = 24;
pwa.setBadge(unreadCount);
```

##### Effacer le badge

```js
// Clear the badge
pwa.clearBadge();
```

### 10. API Screen Wake Lock

L'API Screen Wake Lock permet d'empêcher les appareils de réduire ou de verrouiller l'écran lorsqu'une application doit continuer à fonctionner.

#### Appelle la méthode d'installation, renvoie une valeur `promise`

```js
pwa.WakeLock();
```

### 11. Visibilité

Vérifier si l'utilisateur visualise une page. Mettre en pause/jouer une vidéo ou des jeux, etc.

#### Définir le gestionnaire (handler) de visibilité de la page

```js
// Do something....
const isVisible = () => {
  //...
};
```

#### Si l'api de visibilité n'est pas prise en charge, définissez le gestionnaire (handler)

```js
// Do something....
const notAvailable = () => {
  //...
};
```

#### Appelez la méthode de visibilité avec les deux arguments

```js
pwa.Visibility(isVisible, notAvailable);
```

### 12. The File System Access API (L'API d'accès au système de fichiers)

_The File System Access API_ permet aux applications web de lire ou d'enregistrer des modifications directement dans les fichiers et les dossiers de l'appareil de l'utilisateur.

#### Appeler la méthode pickFile sur un pwa

Le `promise` est résolue avec une réponse de fichier

```js
// Do something with the contents...
const res = await pwa.pickkFile();
const file = res.success ? res.file : null;
```

#### Appel de la méthode pickTextFile sur un pwa

Le `promise` est résolue par une réponse textuelle (contenu du fichier texte sélectionné).

```js
// Do something with the contents...
const res = await pwa.pickTextFile();
const contents = res.success ? res.contents : null;
```

### 13. Web Payments

Permet aux utilisateurs de sélectionner leur mode de **paiement** préféré et de mettre cette information à la disposition d'un **marchand**.

#### Appeler le mode de paiement avec trois arguments

```js
pwa.Payment(pay, paydata, validatePayment);
```

#### Exemple : calculer le montant total à payer

Application de démonstration de test : [Aperçu en direct](https://webpay.glitch.me/)

```js
// Calculations...
const payment = {
  price: sale_price,
  get discount() {
    return this.price * 0.005;
  },
  get total() {
    return this.price + this.tax - this.discount;
  },
  get tax() {
    return 0.14 * this.price;
  },
};

// Destructure payment object...
const { tax, discount, total } = payment;
```

#### Définir les méthodes de paiement

```js
const paymentMethods = [
  {
    supportedMethods: ['basic-card'],
    data: {
      supportedNetworks: ['visa', 'mastercard'],
    },
  },
];
```

#### Définir les détails du paiement

```js
const paymentDetails = {
  total: {
    label: 'Total Amount',
    amount: {
      currency: 'KSH',
      value: total.toString(),
    },
  },
  displayItems: [
    {
      label: 'Discount',
      amount: {
        currency: 'KSH',
        value: discount.toString(),
      },
    },
    {
      label: 'Taxes, 14% V.A.T',
      amount: {
        currency: 'KSH',
        value: tax.toString(),
      },
    },
  ],
};
```

#### Demande d'informations supplémentaires

```js
const options = {
  requestPayerName: true,
  requestPayerEmail: true,
};
```

#### Créer un objet paydata

```js
const paydata = {
  paymentMethods,
  paymentDetails,
  options,
};
```

#### Valider le paiement (faire quelque chose avec la réponse du paiement)

```js
const validatePayment = async(paymentResponse) => {
  try {
    // Check if payment was successful based on your payment gateway...
    const condition = await yourSuccessHandler(paymentResponse);
  // Please note that complete status can only be "success" or "fail"...
    if (condition) {
      //...
      // Return sucesss...
      await paymentResponse.complete("success");
    } else {
      //...
      // Return fail...
      await paymentResponse.complete("fail");
    }
  };
  } catch(error) {
    throw error;
  }
```

#### Appeler le mode de paiement le pwa

```js
// Pay...
pwa.Payment(paydata, validatePayment);
```
