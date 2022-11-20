import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaeIg6j6__iZOq-jG-JFWMHsDyBKvbOJM",
  authDomain: "next-class2.firebaseapp.com",
  projectId: "next-class2",
  storageBucket: "next-class2.appspot.com",
  messagingSenderId: "1040292642375",
  appId: "1:1040292642375:web:7450f7fbbf18d938697b62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth};
