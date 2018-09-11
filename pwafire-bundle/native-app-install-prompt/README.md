
### When is the banner shown?

Chrome will automatically show the native app install prompt to the user when the following criteria are met:
Neither the web app or the native app are already installed
Meets a user engagement heuristic (currently, the user has interacted with the domain for at least 30 seconds)

#### Includes a Web App Manifest that includes:

     short_name
     name (used in the banner prompt)
     icons including a 192px and a 512px version
     prefer_related_applications is true
     related_applications object with information about the app
   
