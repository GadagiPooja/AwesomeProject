// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiFlgLxyF2Jhec7IZ_xGrvAdP9CYiroUs",
  authDomain: "task-manager-22f2c.firebaseapp.com",
  projectId: "task-manager-22f2c",
  storageBucket: "task-manager-22f2c.appspot.com",
  messagingSenderId: "863243130635",
  appId: "1:863243130635:web:468376861a813fa0fa340e",
  measurementId: "G-9H5KW268V1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);