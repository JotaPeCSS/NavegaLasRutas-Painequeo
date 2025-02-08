// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBenkG8r2IUNion2o1UZroObNkDum0v4qY",
  authDomain: "potland-e-commerce-180d6.firebaseapp.com",
  projectId: "potland-e-commerce-180d6",
  storageBucket: "potland-e-commerce-180d6.firebasestorage.app",
  messagingSenderId: "655955730325",
  appId: "1:655955730325:web:44534d0139bb20e902e09c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };