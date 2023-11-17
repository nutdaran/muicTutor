// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB39N8krx9R4eV6FN7Z76tLOR34mzh64Qo",
  authDomain: "muictutor-6fe28.firebaseapp.com",
  projectId: "muictutor-6fe28",
  storageBucket: "muictutor-6fe28.appspot.com",
  messagingSenderId: "988646702824",
  appId: "1:988646702824:web:acb9ab44b292c0be8f135d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };