

import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";

const config  = {
  apiKey: "",
  authDomain: "xxxxxxxxx.firebaseapp.com",
  projectId: "webisIO",
  storageBucket: "xxxxxxxxxx.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

FirebaseAnalytics.initializeFirebase(config);


export const firebaseAnalyticsConfig=FirebaseAnalytics;

