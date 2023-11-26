// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCA5flhz7Wo_R4450vl3VPBdAYtsvIBhdo",
  authDomain: "amplify-ca8fd.firebaseapp.com",
  projectId: "amplify-ca8fd",
  storageBucket: "amplify-ca8fd.appspot.com",
  messagingSenderId: "100918336712",
  appId: "1:100918336712:web:6a943ead186c30b13b59fd",
  measurementId: "G-FVPM7ZTNZV",
};
// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
