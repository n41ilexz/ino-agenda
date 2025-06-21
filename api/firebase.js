// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMFMCIkoE_2sUHwv-HRpNe5K5P4ywUPmo",
  authDomain: "inoagenda-5c983.firebaseapp.com",
  projectId: "inoagenda-5c983",
  storageBucket: "inoagenda-5c983.firebasestorage.app",
  messagingSenderId: "158409353996",
  appId: "1:158409353996:web:53dc0d969cbfc5c2faf729",
  measurementId: "G-YJJD0GFD01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app)
