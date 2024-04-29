
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDkBL5GvwbBP1LSkz6d5H5IY5VCtSEkYd0",
  authDomain: "application-framework2.firebaseapp.com",
  projectId: "application-framework2",
  storageBucket: "application-framework2.appspot.com",
  messagingSenderId: "231057618524",
  appId: "1:231057618524:web:b477f1be6e609e56ced899"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



export { app, auth, db };