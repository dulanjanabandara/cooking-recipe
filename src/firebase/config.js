import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuMrmbZkAn8WfTCa0-L7NU4Zs2tZPldaU",
  authDomain: "cooking-recipe-site-49418.firebaseapp.com",
  projectId: "cooking-recipe-site-49418",
  storageBucket: "cooking-recipe-site-49418.appspot.com",
  messagingSenderId: "589331358182",
  appId: "1:589331358182:web:bbd33838304abdfd163627",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
