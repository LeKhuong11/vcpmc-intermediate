import { initializeApp } from "firebase/app";
import { getAuth }  from 'firebase/auth'
import { getStorage }  from 'firebase/storage'
import {
  getFirestore
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCZNUxqqVpwpRmcBMiCOjde2ys2GKfYeYg",
  authDomain: "vcpmc-intermediate.firebaseapp.com",
  projectId: "vcpmc-intermediate",
  storageBucket: "vcpmc-intermediate.appspot.com",
  messagingSenderId: "736416869276",
  appId: "1:736416869276:web:8d5efc849a0c4800873659",
  measurementId: "G-4YP5TBTG88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage
export default app