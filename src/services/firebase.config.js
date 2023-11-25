// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL2CO_SUQOhpWoI_tsQxqTLwAYB4avdVU",
  authDomain: "todolist-e697b.firebaseapp.com",
  projectId: "todolist-e697b",
  storageBucket: "todolist-e697b.appspot.com",
  messagingSenderId: "24730934842",
  appId: "1:24730934842:web:b14e0edb7d7d3458525f03",
  measurementId: "G-BMBQ7YW2JN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const analytics = getAnalytics(app); 