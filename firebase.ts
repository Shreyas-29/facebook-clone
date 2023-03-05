// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDDlj-fmQDrZZsW5DV3U_U6Evspq0R4E8U",
    authDomain: "facebook-1643c.firebaseapp.com",
    projectId: "facebook-1643c",
    storageBucket: "facebook-1643c.appspot.com",
    messagingSenderId: "600837335551",
    appId: "1:600837335551:web:c56b15f91b2c27f7f71fca"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };