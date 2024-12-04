import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAWFAg7KTP-sCrEL1sIA9K9cPTrKRRQsIs",
  authDomain: "unifit-2f6a8.firebaseapp.com",
  projectId: "unifit-2f6a8",
  storageBucket: "unifit-2f6a8.appspot.com", // Corrected storageBucket
  messagingSenderId: 201018361015, // Corrected messagingSenderId
  appId: "1:201018361015:web:8338f5c6ebf4fda92f7932",
  measurementId: "G-R4WJ4NHKR0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
