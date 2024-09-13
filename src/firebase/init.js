// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries、

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAbS39uQ2DtVYWPsc3qZZ0YNlSMRECHys",
  authDomain: "week7-ruixiang-fan.firebaseapp.com",
  projectId: "week7-ruixiang-fan",
  storageBucket: "week7-ruixiang-fan.appspot.com",
  messagingSenderId: "343469753027",
  appId: "1:343469753027:web:75dc4077f765a5609e5876"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();
export default db;