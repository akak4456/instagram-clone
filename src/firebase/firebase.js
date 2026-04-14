// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1vkOvdWqHhXaQ1nQwA6PWMn3LffGrHLY",
  authDomain: "instagram-clone-b9de9.firebaseapp.com",
  projectId: "instagram-clone-b9de9",
  storageBucket: "instagram-clone-b9de9.firebasestorage.app",
  messagingSenderId: "356619825211",
  appId: "1:356619825211:web:4baa0262d2147dde266c1e",
  measurementId: "G-CWL4H7VJL7",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
