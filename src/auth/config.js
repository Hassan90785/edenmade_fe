import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0pVUOCdI3gt9LUFNBn-QETOP_qfM5yks",
  authDomain: "edenmade-5ccf2.firebaseapp.com",
  projectId: "edenmade-5ccf2",
  storageBucket: "edenmade-5ccf2.appspot.com",
  messagingSenderId: "17331622720",
  appId: "1:17331622720:web:270b4c26196a0b49eaa0a5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

export default auth;
