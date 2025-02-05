import firebase from 'firebase/compat/app';
import 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";

const config  = {
  apiKey: "",
  authDomain: "xxxxxxxxxxxxx.firebaseapp.com",
  projectId: "webisIO",
  storageBucket: "xxxxxxxxxxxxxx.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

firebase.initializeApp(config);
const app = firebase.initializeApp(config);

export const firebaseConfig=firebase;
export const analytics = getAnalytics(app);

