import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { setDoc, doc, getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBehJy17NmI7-K_fv-MNGhw9v5OOssTtQY",
    authDomain: "diet-recommendation-efbea.firebaseapp.com",
    projectId: "diet-recommendation-efbea",
    storageBucket: "diet-recommendation-efbea.appspot.com",
    messagingSenderId: "820802766552",
    appId: "1:820802766552:web:056555abbae9630ab9b9ad"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
const storage = getStorage(app);



export { app, auth, db, storage };
