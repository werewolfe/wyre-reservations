# Create Wallet Order Reservations for Wyre Checkout

This sample creates a simple serverless function to generate Wyre reservation ids and Checkout URLs.

### Features

- Create a Wallet Order Reservation on POST request. ([view code](./functions/index.js#L16)).

#### Further reading:

- Wyre Checkout: https://docs.sendwyre.com/docs/getting-started-wyre-checkout
- Wyre Wallet Order Reservations: https://docs.sendwyre.com/docs/wallet-order-reservations
- Firebase docs: https://firebase.google.com/docs/functions

## Deploy and test

- Create a Firebase Project using the [Firebase Developer Console](https://console.firebase.google.com)
- Enable billing on your project by switching to the Blaze plan. See [pricing](https://firebase.google.com/pricing/) for more details. This is required to be able to do requests to non-Google services.
- Enable Google & Email sign-in in your [authentication provider settings](https://console.firebase.google.com/project/_/authentication/providers).
- Install [Firebase CLI Tools](https://github.com/firebase/firebase-tools) if you have not already and log in with `firebase login`.
- Configure this sample to use your project using `firebase use --add` and select your project.
- Install dependencies locally by running: `cd functions; npm install; cd -`
- [Add your Wyre API Key & Secret](https://dash.testwyre.com/settings/api-keys) to firebase config:
  ```bash
  firebase functions:config:set wyre.key=YOUR-WYRE-KEY wyre.secret=YOUR-WYRE-SECRET-KEY
  ```
- [Firebase config instructions](https://firebase.google.com/docs/functions/config-env)
- [Get your Wyre Account Id](https://dash.testwyre.com/settings/basic-info)
- Deploy your project using `firebase deploy --only functions:wyreReservation`
- Test your Wallet Order Reservation integration by viewing your deployed site `firebase open hosting:site`

### Run functions locally

```
firebase serve --only hosting:wyreReservation
```

## Going live

Once you’re ready to go live, you will need to exchange your test keys for your live keys. Reach out to sales@sendwyre.com and schedule an integration review. See the [Wyre dashboard](https://dash.sendwyre.com/) for further details.

- Update your Wyre keys config:
  ```bash
  firebase functions:config:set wyre.key=YOUR-WYRE-KEY  wyre.secret=YOUR-WYRE-SECRET-KEY
  ```
- Redeploy functions for the changes to take effect `firebase deploy --only functions:wyreReservation`.