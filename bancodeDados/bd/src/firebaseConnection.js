import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjTqfVQSxCm6ZnsZp-VFGjCEG-IxGXyM8",
    authDomain: "exemplos-1ffa4.firebaseapp.com",
    projectId: "exemplos-1ffa4",
    storageBucket: "exemplos-1ffa4.firebasestorage.app",
    messagingSenderId: "1054147196496",
    appId: "1:1054147196496:web:7e21a8efb0378ee72fc355"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
//Get Firestore Database
const db = getFirestore(firebaseapp);
//Get Auth methods from Firestore Databse
const auth = getAuth(firebaseapp)

export { db, auth };