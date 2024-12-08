// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdMgBSr6xuUZjdR1saHMz73jMyPe17yqI",
  authDomain: "vog-bar-database.firebaseapp.com",
  projectId: "vog-bar-database",
  storageBucket: "vog-bar-database.firebasestorage.app",
  messagingSenderId: "967846597053",
  appId: "1:967846597053:web:143123188d0ff84a4082d4",
  measurementId: "G-81F0YLDQLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore()

export default database

