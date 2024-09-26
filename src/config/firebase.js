// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn9krDfdeOwRxMS0ewArxrOPs-qOodwqU",
  authDomain: "fir-frontend-695b9.firebaseapp.com",
  projectId: "fir-frontend-695b9",
  storageBucket: "fir-frontend-695b9.appspot.com",
  messagingSenderId: "313276105076",
  appId: "1:313276105076:web:e6a0ac2816ed4083f82c21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();

export const db = getFirestore(app);
