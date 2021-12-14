import firebase from "firebase/app";
import "firebase/auth";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID,
  });
}

export const app = firebase;
