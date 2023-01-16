// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGSG1DxTWNliZPezyMFKCRBY1fB0aJOd4",
  authDomain: "codedeck-f9d09.firebaseapp.com",
  projectId: "codedeck-f9d09",
  storageBucket: "codedeck-f9d09.appspot.com",
  messagingSenderId: "957997428748",
  appId: "1:957997428748:web:2fef6847106f07e865be29",
  measurementId: "G-18SJSQ4F08"
};

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebaseApp.auth();

export { db, auth };
