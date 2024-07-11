// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgz0NxkabcXtKkth71zbN3R7AJp3KbiFQ",
  authDomain: "react-couser.firebaseapp.com",
  projectId: "react-couser",
  storageBucket: "react-couser.appspot.com",
  messagingSenderId: "825950897688",
  appId: "1:825950897688:web:77faad5233af2dd401256d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)