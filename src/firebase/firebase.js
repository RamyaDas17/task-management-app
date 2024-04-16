import firebase from "firebase/compat/app";
import  "firebase/compat/auth";
import  "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA1IRNIidLWICBiB0nsb6aqI2PnhZJYE20",
    authDomain: "task-manager-d9166.firebaseapp.com",
    projectId: "task-manager-d9166",
    storageBucket: "task-manager-d9166.appspot.com",
    messagingSenderId: "1045792013059",
    appId: "1:1045792013059:web:b316b01a8fb5c2315f0736",
    measurementId: "G-5Y69CXKC6N"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export default db;

