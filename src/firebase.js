import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBptVr6ckaO20F09QVOoXSeF1hW5JatpmQ",
    authDomain: "event-attendance-tracker-bdbe9.firebaseapp.com",
    projectId: "event-attendance-tracker-bdbe9",
    storageBucket: "event-attendance-tracker-bdbe9.firebasestorage.app",
    messagingSenderId: "646178933769",
    appId: "1:646178933769:web:35715ee11a3418b4e67cd8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };