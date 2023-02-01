// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth }  from 'firebase/auth'
import {
  getFirestore
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv3hFWn9F47inpGni5ylyNXwBU4SdfnT8",
  authDomain: "vcpmc-3d92c.firebaseapp.com",
  projectId: "vcpmc-3d92c",
  storageBucket: "vcpmc-3d92c.appspot.com",
  messagingSenderId: "597393737305",
  appId: "1:597393737305:web:8a8d4fb6dc08834aaf1348",
  measurementId: "G-Q93LW1P846"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export default app