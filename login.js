document.addEventListener('DOMContentLoaded', function() {
    // Pre-fill login credentials for demo purposes
    document.getElementById('email').value = "user@parkease.com";
    document.getElementById('password').value = "parkease123";
    
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation - in a real app, you would validate against a backend
            if (email && password) {
                // Set login status in session storage
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userEmail', email);
                
                // Redirect to main page
                window.location.href = 'index.html';
            } else {
                alert('Please enter both email and password');
            }
        });
    }
});