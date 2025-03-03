// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu1XE_YQXsFFPZHmeOccXZrrvaLlRjyGM",
  authDomain: "palmyra-db.firebaseapp.com",
  projectId: "palmyra-db",
  storageBucket: "palmyra-db.firebasestorage.app",
  messagingSenderId: "1025776272760",
  appId: "1:1025776272760:web:92ae628f4a3cfdb366748d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);