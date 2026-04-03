document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stops the page from just refreshing

            // Get the name from the first input field
            const playerName = signupForm.querySelector('input[type="text"]').value;
            
            // Save it so you can display "Welcome, [Name]" on the next page
            localStorage.setItem('playerName', playerName);

            // Redirect to the entry point
            window.location.href = '/Homepage/entry-point.html'; 
        });
    }
});
