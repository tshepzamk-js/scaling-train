// Firebase App & Service SDK Imports (v9+ Modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase Configuration Object
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "scaling-train.firebaseapp.com",
    projectId: "scaling-train",
    storageBucket: "scaling-train.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Core Firebase Services
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

/**
 * Registers or updates a player's designation in local storage and Firestore.
 * @param {string} playerName - The user's chosen designation/username.
 */
export async function registerPlayer(playerName) {
    if (!playerName) return;

    // 1. Store in Local Storage for immediate client-side access
    localStorage.setItem('playerName', playerName);

    // Sanitize designation to create a web-safe document ID
    const sanitizedId = playerName.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');

    // 2. Sync / Save Player Document to Firestore Database
    const playerRef = doc(db, 'players', sanitizedId);
    
    await setDoc(playerRef, {
        displayName: playerName,
        lastActive: serverTimestamp(),
        updatedAt: new Date().toISOString()
    }, { merge: true }); // Merge ensures we update existing users without overwriting other fields
}
