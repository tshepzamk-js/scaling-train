document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Grab the name to use in the system later
            const playerName = signupForm.querySelector('input[type="text"]').value;
            localStorage.setItem('playerName', playerName);
            
            // Navigate to the next stage
            // Ensure this path matches your file structure exactly
            window.location.href = '/Homepage/entry-point.html';
        });
    }
});