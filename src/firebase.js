// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXfS5UmnyTJAOIM4GJLsU5c8LXA4YsCko",
  authDomain: "todolist-app-f8535.firebaseapp.com",
  projectId: "todolist-app-f8535",
  storageBucket: "todolist-app-f8535.appspot.com",
  messagingSenderId: "160774375908",
  appId: "1:160774375908:web:d63280e5f976e88d90dff1",
  measurementId: "G-5JG07643RZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);