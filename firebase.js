import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAE6UnXLS2KXnVhLeqystirOPOwkgK7r5U",
    authDomain: "nextjs-todo-b377b.firebaseapp.com",
    projectId: "nextjs-todo-b377b",
    storageBucket: "nextjs-todo-b377b.firebasestorage.app",
    messagingSenderId: "1071879467233",
    appId: "1:1071879467233:web:639e98a34af075813ec7a0",
    measurementId: "G-5R9Z7R2CFY"
  };
  

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)