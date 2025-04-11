// Import the functions you need from the SDKs you need
import { initializeApp ,getApp,getApps} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIpm5Otma2_r55iXb1ILymaSn86Gh9CsI",
  authDomain: "mockinterview-f85f2.firebaseapp.com",
  projectId: "mockinterview-f85f2",
  storageBucket: "mockinterview-f85f2.firebasestorage.app",
  messagingSenderId: "919432086184",
  appId: "1:919432086184:web:389d24cc6ab06bcde9f89d",
  measurementId: "G-ZW7W3Y8BNN"
};

// Initialize Firebase
const app = !getApps.length?initializeApp(firebaseConfig):getApp();

export const auth=getAuth(app);
export const db=getFirestore(app);