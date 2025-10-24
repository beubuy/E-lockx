document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active'); // For hamburger animation
            // Toggle aria-expanded for accessibility
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close nav menu when a link is clicked (for single-page navigation or on mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }


    // --- Cyber Tip of the Day Rotator (for index.html) ---
    const tips = [
        "Always use strong, unique passwords for every account.",
        "Enable Two-Factor Authentication (2FA) wherever possible.",
        "Beware of unsolicited emails asking for personal information – it could be phishing!",
        "Regularly review your social media privacy settings.",
        "Keep your software and operating system updated to patch vulnerabilities.",
        "Back up your important data regularly to an external drive or cloud service.",
        "Use a reputable antivirus software and firewall.",
        "Be cautious on public Wi-Fi; avoid sensitive transactions.",
        "Think before you click: hover over links to check their destination."
    ];

    const tipTextElement = document.getElementById('tip-text');
    let currentTipIndex = 0;

    function rotateTip() {
        if (tipTextElement) { // Ensure element exists on the page
            tipTextElement.style.opacity = 0; // Fade out current tip
            setTimeout(() => {
                currentTipIndex = (currentTipIndex + 1) % tips.length;
                tipTextElement.textContent = tips[currentTipIndex];
                tipTextElement.style.opacity = 1; // Fade in new tip
            }, 500); // Wait for fade out to complete before changing text
        }
    }

    if (tipTextElement) {
        tipTextElement.textContent = tips[currentTipIndex]; // Set initial tip
        setInterval(rotateTip, 8000); // Change tip every 8 seconds
    }
});