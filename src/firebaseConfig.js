import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBk2XI5CrJD5ChsRBVr907Wg6idfbCMh-I",
  authDomain: "simple-chat-app-af566.firebaseapp.com",
  projectId: "simple-chat-app-af566",
  storageBucket: "simple-chat-app-af566.appspot.com",
  messagingSenderId: "425928053428",
  appId: "1:425928053428:web:bc065e864a57786d1d7de1",
  measurementId: "G-6KHR9G0FYE",
});

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
