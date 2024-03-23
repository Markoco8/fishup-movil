// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrX2HoBB700dnaaeOzE281lwmt073OQyU",
  authDomain: "integradora-1df49.firebaseapp.com",
  databaseURL: "https://integradora-1df49-default-rtdb.firebaseio.com",
  projectId: "integradora-1df49",
  storageBucket: "integradora-1df49.appspot.com",
  messagingSenderId: "368878211075",
  appId: "1:368878211075:web:0c871171fcd73b7cfd3e36",
  measurementId: "G-1Q40HYHM2R",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const db = getDatabase();
export { db };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
