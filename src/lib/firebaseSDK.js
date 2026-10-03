// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgx59hA9YDgMhfvsZVcf-6LIrjhX6PFR8",
  authDomain: "study-record-31e61.firebaseapp.com",
  projectId: "study-record-31e61",
  storageBucket: "study-record-31e61.firebasestorage.app",
  messagingSenderId: "654804579252",
  appId: "1:654804579252:web:eaafe81f4db34fa5f378e1",
  measurementId: "G-GXBL3M7Z47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);