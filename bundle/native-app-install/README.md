### [Native App "Install" Progressive Web App Support]()
After publishing your native app, say Android, the next thing that rings in your mind as a dev is how to get it out there to people for them to install. That matters.

The most ideal place to fall for is the Web. The question is, why the Web? It's the incredible reach that the Web has on all devices that your target users are using. So, most of you would build a single page site to get your native app out there with some fancy **install button**.

  - With the **reach** and **capabilities** that [progressive web app](https://pwafire.org/developer/app/) have, you could rather build a progressive web app that automatically in a more engaging way prompts the user to install your **native app.**

  - **Native app install banners** give you the ability to let users quickly and seamlessly install your native app on their device from the app store, without leaving the browser, and without showing an annoying interstitial.

### [How do you get that done?]]()
Well, with [pwafire app](https://pwafire.org/developer/app/), you will start your progressive web app project and add a few lines of code to the [manifest.json](https://github.com/mayeedwin/pwafire/blob/master/pwafire-bundle/default/manifest.json) to add that Native App Install capabilities on the web . Check the code snippet below.

```json
"prefer_related_applications": true,
"related_applications": [
  {
    "platform": "play",
    "id": "your_native_app_id"
  }
]
```

  - **prefer_related_applications**
Tells the browser to prompt the user with your native app instead of the web app. Leaving this value unset, or false, the browser will prompt the user to install the web app instead.

  - **related_applications**
Is an array with a list of objects that tell the browser about your preferred native application. Each object must include a platform property and an id property. Where the platform is play and the id is your **Play Store app ID**.

Read more about this add on [PWA Fire Bundle](https://github.com/mayeedwin/pwafire/projects/1) on [this doc published.](https://pwafire.org/developer/docs/native-app-pwa)

Cheers and have fun!



