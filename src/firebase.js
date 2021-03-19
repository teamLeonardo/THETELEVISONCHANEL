import firebase from "firebase";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth"; // for authentication
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDlZyTNrdsbrQxQXiaw57AeUnvf8gEFz5w",
  authDomain: "thetelevisonchanel.firebaseapp.com",
  projectId: "thetelevisonchanel",
  storageBucket: "thetelevisonchanel.appspot.com",
  messagingSenderId: "879981740696",
  appId: "1:879981740696:web:059465eb0d6d91e3ae06ed",
  measurementId: "G-ZVCSCW3Q2Z"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
firebase.analytics();
export const db = firebase.firestore();
export const auth = firebase.auth;
