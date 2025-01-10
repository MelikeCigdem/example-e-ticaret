import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6clxwU7lHTuX4pFNuHj-WDyvELxFvb4s",
  authDomain: "me-like-a8998.firebaseapp.com",
  projectId: "me-like-a8998",
  storageBucket: "me-like-a8998.appspot.com",
  messagingSenderId: "679111600886",
  appId: "1:679111600886:web:07f6983b9540e7191fdad7",
  measurementId: "G-M63B7ZL9EB",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
export { auth,db, createUserWithEmailAndPassword, signInWithEmailAndPassword };
