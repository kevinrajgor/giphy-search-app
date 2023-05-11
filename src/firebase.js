// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIi5wKuB-LZUO5JtKMX2QDWY6m5hBz5SY",
  authDomain: "giphy-search-app-f923b.firebaseapp.com",
  projectId: "giphy-search-app-f923b",
  storageBucket: "giphy-search-app-f923b.appspot.com",
  messagingSenderId: "1012807935982",
  appId: "1:1012807935982:web:becae52a7267fc764350ff",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
