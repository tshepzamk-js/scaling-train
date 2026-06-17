// firebase-config.js

// 1. Import the modules directly from Google's official CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"; // Added Firestore

// 2. Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjx8V9l6EXNPPNoGsMhUk8PlSHIsIUFcE",
  authDomain: "scaling-train-54894.firebaseapp.com",
  projectId: "scaling-train-54894",
  storageBucket: "scaling-train-54894.firebasestorage.app",
  messagingSenderId: "811725820748",
  appId: "1:811725820748:web:77faa0686ccdab0606f5e9",
  measurementId: "G-3XF3H7943Z"
};

// 3. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 4. Initialize services and EXPORT them so other files can import them
export const analytics = getAnalytics(app);
export const db = getFirestore(app); // 'db' represents your Firestore database instance
