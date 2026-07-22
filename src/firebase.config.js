// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjx8V9l6EXNPPNoGsMhUk8PlSHIsIUFcE",
  authDomain: "scaling-train-54894.firebaseapp.com",
  databaseURL: "https://scaling-train-54894-default-rtdb.firebaseio.com",
  projectId: "scaling-train-54894",
  storageBucket: "scaling-train-54894.firebasestorage.app",
  messagingSenderId: "811725820748",
  appId: "1:811725820748:web:7c43abe1ccdaa06a06f5e9",
  measurementId: "G-6NMV29P99S"
};

// Initialize Firebase Core
const app = initializeApp(firebaseConfig);

// Initialize & Export Analytics (Only works in browser environment)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Initialize & Export services for Astra Academy
export const auth = getAuth(app);         // For user login / authentication
export const db = getFirestore(app);      // For Firestore database (subjects, notes, tasks)

export default app;
