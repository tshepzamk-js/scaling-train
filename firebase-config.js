// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjx8V9l6EXNPPNoGsMhUk8PlSHIsIUFcE",
  authDomain: "scaling-train-54894.firebaseapp.com",
  databaseURL: "https://scaling-train-54894-default-rtdb.firebaseio.com",
  projectId: "scaling-train-54894",
  storageBucket: "scaling-train-54894.firebasestorage.app",
  messagingSenderId: "811725820748",
  appId: "1:811725820748:web:7ba2cefe1d287eaf06f5e9",
  measurementId: "G-4S3WX6P18L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);