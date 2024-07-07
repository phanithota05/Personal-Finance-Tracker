// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAW2T4rsxRvK67kIxgmcU2FWO9jd9hisY",
  authDomain: "financeapp-f1716.firebaseapp.com",
  projectId: "financeapp-f1716",
  storageBucket: "financeapp-f1716.appspot.com",
  messagingSenderId: "143049663394",
  appId: "1:143049663394:web:bd903cf73d4c7ba30f48fb",
  measurementId: "G-56K5VV35CZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };