// js/contact.js

document.addEventListener('DOMContentLoaded', () => {
    // Contact Form Submission (Client-side simulation)
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission

            // Simple client-side validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const privacyChecked = document.getElementById('privacy').checked;

            if (!name || !email || !subject || !message) {
                displayFormMessage('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                displayFormMessage('Please enter a valid email address.', 'error');
                return;
            }

            if (!privacyChecked) {
                displayFormMessage('You must agree to the privacy policy.', 'error');
                return;
            }

            // Simulate form submission success
            displayFormMessage('Thank you for your message! We will get back to you shortly.', 'success');
            contactForm.reset(); // Clear the form
            
            // Optionally, disable the form or button temporarily
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            setTimeout(() => {
                submitButton.disabled = false;
                formMessage.style.display = 'none'; // Hide message after a few seconds
            }, 5000); // Re-enable after 5 seconds
        });
    }

    function isValidEmail(email) {
        // Basic email regex
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function displayFormMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = `form-message ${type}`; // Add success or error class
        formMessage.style.display = 'block';
    }

    // Dynamic year for footer (assuming script.js also has this, but good to ensure here)
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Navigation Toggle (assuming a global script.js handles the main one)
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('nav-open');
            hamburgerMenu.querySelector('i').classList.toggle('fa-bars');
            hamburgerMenu.querySelector('i').classList.toggle('fa-times'); // Change to 'X' icon
        });
    }
});