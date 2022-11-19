// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGotn-pwtjeHnzC6IqzPT3Wsa1Km3O0eE",
  authDomain: "next-class-d91e5.firebaseapp.com",
  projectId: "next-class-d91e5",
  storageBucket: "next-class-d91e5.appspot.com",
  messagingSenderId: "231049869970",
  appId: "1:231049869970:web:738c33d3a1bb890d3dc44b",
  measurementId: "G-SYQ9EFJDT0"
};


//document.addEventListener("DOMContentLoaded", event => {
//  const app = firebase.app();
//  console.log(app)
//})

//function googleLogin() {
//  const provider = new firebase.auth.GoogleAuthProvider();

//  firebase.auth().signInWithPopup(provider)

//          .then(result => {
//             const user = result.user;
//              document.write(`Hello ${user.displayName}`);
//              console.log(user)
//          })
//          .catch (console.log)
//
//}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;