// Import Firebase functions directly from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

// Your web app's Firebase configuration
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

// Form Submission Logic
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('playerName');
            const playerName = nameInput ? nameInput.value.trim() : '';

            if (!playerName) return;

            const submitBtn = signupForm.querySelector('.accept-btn');
            if (submitBtn) {
                submitBtn.innerText = "INITIALIZING...";
                submitBtn.disabled = true;
            }

            // Save to local storage
            localStorage.setItem('playerName', playerName);

            // Redirect to Homepage
            setTimeout(() => {
                window.location.href = './Homepage/homepage.html';
            }, 400);
        });
    }
});
