<!-- in wiki -->

# 🥜 Voedings Check

![](./docs/logo.png)

## 🌟 Over Voedings Check

Voedings Check is een applicatie om eten en drinken met een barcode te kunnen scannen. Door deze producten te scannen kom je erachter wat de voedingswaarden & ingrediënten hiervan zijn, waardoor het je kan helpen om een gezondere of betere keuze te maken.

## 📝 Table of contents

-   User Story
-   Live demo
-   How to install
-   Features
-   Hoe gebruik ik de applicatie?
-   Performance
-   Todo's
-   Activity Diagram
-   Packages
-   API's
-   License

## 📖 User Story

Als foodie, wil ik tijdens het boodschappen doen een product kunnen scannen, zodat ik meer informatie over het product kan lezen en een goede keuze kan maken die bij mijn dieet past.

## 🌐 Live demo

Probeer de applicatie zelf uit op: https://voedings-check.herokuapp.com/

## 🔧 How to install

Clone deze repository naar de gewenste locatie met het volgende commando in je terminal:

```
git clone https://github.com/MarkvHeusden/voedings-check-node.git
```

Navigeer naar de map en installeer vervolgens de packages met het commando:

```js
npm install
```

En start vervolgens de lokale server met het commando:

```
npm start
```

✅ Zo simpel is het! Je kunt de server nu bekijken op http://localhost:3000

## 🛠 Features

-   Producten met barcode scannen
-   Barcodes invoeren met de zoekfunctie
-   Product info bekijken
-   Voedingswaarden ophalen
-   Ingrediënten bekijken

## 🤔 Hoe gebruik ik de applicatie?

Je gebruikt Voedings Check door op de live demo hieronder te klikken. Vervolgens kun je op de knop 'Start scannen' drukken om te beginnen. Na het geven van toestemming voor het gebruik van je camera kun je barcodes van producten voor je camera houden. Wanneer iets gescand is krijg je de product informatie te zien. Mocht er geen product info beschikbaar zijn of ondersteunt jouw browser de barcode scanner niet dan krijg je hier een melding over.

## 🏎️ Performance

Om de performance te verbeteren heb ik gebruik gemaakt van de volgende optimalisaties:

-   Service worker, met static & dynamic caching
-   Caching headers toegevoegd
-   Revisioning om cache te updaten
-   Compression middleware gebruikt
-   Laden van fonts optimaliseren
-   Statische bestanden minify'en met npm scripts

![](./docs/lighthouse.png)

## ✅ Todo's

-   Scanner werkend maken op meer browsers (zoals Safari)
-   Meer product info weergeven / koppelen aan jouw dieët

## 📊 Activity Diagram

![](./docs/activity-diagram.png)

## 🌐 NPM Packages

-   Express
-   EJS
-   Node-fetch
-   Compression

## 🗄️ API's

-   Barcode Detection API (https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API)
-   Open Food World API (https://world.openfoodfacts.org/data)

## 🔏 License

MIT
