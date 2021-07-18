import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB4Rb-2v1HAovGw_OOqmmwcfp0Z7q5T-44",
    authDomain: "whysapp-72bd4.firebaseapp.com",
    databaseURL: "https://whysapp-72bd4.firebaseio.com",
    projectId: "whysapp-72bd4",
    storageBucket: "whysapp-72bd4.appspot.com",
    messagingSenderId: "341726133111",
    appId: "1:341726133111:web:645e1b2314dd7340fe7f72"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;