// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth"; //getAuth is the authentication object
import { getFirestore } from "firebase/firestore"; //Get Cloud Firestore database


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,

  authDomain: process.env.REACT_APP_AUTH_DOMAIN ,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "jobtracker-60d12.appspot.com",
  messagingSenderId: "54160281952",
  appId: "1:54160281952:web:da078f85b8e2d9c0bd8e05",
  measurementId: "G-FEXMF1M456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);//auth is the authentication object
export const googleProvider = new GoogleAuthProvider(); //googleProvider is the google authentication object
export const db = getFirestore(app); //db is the database object