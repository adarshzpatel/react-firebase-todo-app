import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA16ZoPRIm9BbcqpAKcmbBOk_kJodBaG2Y",
    authDomain: "react-firebase-todo-app-5fa35.firebaseapp.com",
    databaseURL: "https://react-firebase-todo-app-5fa35.firebaseio.com",
    projectId: "react-firebase-todo-app-5fa35",
    storageBucket: "react-firebase-todo-app-5fa35.appspot.com",
    messagingSenderId: "526247294918",
    appId: "1:526247294918:web:9281e7b98efe4f029224c7",
    measurementId: "G-K5LZJDS6ZD"
  };

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();

export default db;
