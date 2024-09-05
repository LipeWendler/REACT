
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBxsgX6DXXG6WMCWACGQv1HvQ_wgH3rSqw",
  authDomain: "aula0409-862ca.firebaseapp.com",
  projectId: "aula0409-862ca",
  storageBucket: "aula0409-862ca.appspot.com",
  messagingSenderId: "683641489932",
  appId: "1:683641489932:web:5208f1cb17ac03b5dffc29"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };