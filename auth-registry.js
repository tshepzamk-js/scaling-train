import { db } from './firebase-config.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('.signup-form');
  
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const playerName = document.getElementById('playerName').value;
      localStorage.setItem('playerName', playerName);
      
      try {
        console.log("Registering new player in the cloud registry...");
        
        // Maps folder collection path specifically to user selection
        const playerDocRef = doc(db, "players", playerName);
        
        await setDoc(playerDocRef, {
          username: playerName,
          registeredAt: new Date().toISOString(),
          status: "Active",
          level: 1
        });
        
        console.log(`Player "${playerName}" successfully registered cleanly.`);
        window.location.href = './Homepage/homepage.html';
        
      } catch (error) {
        console.error("Critical: Registration failed.", error);
        alert("System Link Failure. Check your network configuration.");
      }
    });
  }
});