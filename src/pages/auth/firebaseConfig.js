import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyCDGY7dYHzzBUrTAl7YAvnHjNHNMtVez64",
  authDomain: "ecommerce-87849.firebaseapp.com",
  projectId: "ecommerce-87849",
  storageBucket: "ecommerce-87849.appspot.com",
  messagingSenderId: "140493867521",
  appId: "1:140493867521:web:a06e300dcf1b52ec9fce00"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
