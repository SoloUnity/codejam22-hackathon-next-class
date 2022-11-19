import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGotn-pwtjeHnzC6IqzPT3Wsa1Km3O0eE",
  authDomain: "next-class-d91e5.firebaseapp.com",
  projectId: "next-class-d91e5",
  storageBucket: "next-class-d91e5.appspot.com",
  messagingSenderId: "231049869970",
  appId: "1:231049869970:web:738c33d3a1bb890d3dc44b",
  measurementId: "G-SYQ9EFJDT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth = getAuth();