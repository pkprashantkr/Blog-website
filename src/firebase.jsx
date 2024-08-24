import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCGFUGUhxDWIB7HA49MtiZcwl-1XDVSKX0",
    authDomain: "blog-website-1e19c.firebaseapp.com",
    databaseURL: "https://blog-website-1e19c-default-rtdb.firebaseio.com",
    projectId: "blog-website-1e19c",
    storageBucket: "blog-website-1e19c.appspot.com",
    messagingSenderId: "506131301489",
    appId: "1:506131301489:web:3d3e2993086cd6f3dbc7d0"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, facebookProvider, db };
