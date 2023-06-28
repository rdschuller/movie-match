// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0mikJyDmRXOK59TikSFRomy_qXfOLdjI",
  authDomain: "moviematch-c3cf4.firebaseapp.com",
  projectId: "moviematch-c3cf4",
  storageBucket: "moviematch-c3cf4.appspot.com",
  messagingSenderId: "110975822370",
  appId: "1:110975822370:web:98a3c9fc98c398118d787b",
  measurementId: "G-G35XT2JPBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();