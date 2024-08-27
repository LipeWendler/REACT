import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYQnaU96J4ocxq8HUkjFb1rbUO5y-cIdA",
    authDomain: "databaseaulas.firebaseapp.com",
    projectId: "databaseaulas",
    storageBucket: "databaseaulas.appspot.com",
    messagingSenderId: "1084991428888",
    appId: "1:1084991428888:web:db409fe2e87ca5d028666d"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
//Get Firestore Database
const db = getFirestore(firebaseapp);
//Get Auth methods from Firestore Databse
const auth = getAuth(firebaseapp)

export { db, auth };