// js/awareness_hub.js - Page-specific JavaScript for Awareness Hub

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for subtopic cards
    document.querySelectorAll('.subtopic-card a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Scroll to the target with an offset for fixed header
                const headerOffset = document.querySelector('header').offsetHeight; // Get header height
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // 20px additional padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Add a temporary highlight to the section
                targetElement.classList.add('highlight-section');
                setTimeout(() => {
                    targetElement.classList.remove('highlight-section');
                }, 1500); // Remove highlight after 1.5 seconds
            }
        });
    });

    // --- Myth vs Fact Slider ---
    const mythFactSlider = document.querySelector('.myth-fact .slider-wrapper');
    const mythFactPrevBtn = document.querySelector('.myth-fact .slider-btn.prev-btn');
    const mythFactNextBtn = document.querySelector('.myth-fact .slider-btn.next-btn');
    const mythFactDotsContainer = document.querySelector('.myth-fact .slider-dots');
    const mythFactItems = document.querySelectorAll('.myth-fact .slider-item');
    let mythFactCurrentIndex = 0;

    function updateMythFactSlider() {
        const itemWidth = mythFactItems[0].clientWidth;
        mythFactSlider.style.transform = `translateX(-${mythFactCurrentIndex * itemWidth}px)`;
        updateMythFactDots();
    }

    function createMythFactDots() {
        mythFactDotsContainer.innerHTML = ''; // Clear existing dots
        mythFactItems.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === mythFactCurrentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                mythFactCurrentIndex = index;
                updateMythFactSlider();
            });
            mythFactDotsContainer.appendChild(dot);
        });
    }

    function updateMythFactDots() {
        document.querySelectorAll('.myth-fact .slider-dots .dot').forEach((dot, index) => {
            if (index === mythFactCurrentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    mythFactNextBtn.addEventListener('click', () => {
        mythFactCurrentIndex = (mythFactCurrentIndex + 1) % mythFactItems.length;
        updateMythFactSlider();
    });

    mythFactPrevBtn.addEventListener('click', () => {
        mythFactCurrentIndex = (mythFactCurrentIndex - 1 + mythFactItems.length) % mythFactItems.length;
        updateMythFactSlider();
    });

    // Initialize Myth vs Fact Slider
    createMythFactDots();
    updateMythFactSlider();
    window.addEventListener('resize', updateMythFactSlider);


    // --- Do's & Don'ts Carousel ---
    const dosDontsSlider = document.querySelector('.dos-donts .dos-donts-slider-wrapper');
    const dosDontsPrevBtn = document.querySelector('.dos-donts .dos-donts-slider-btn.prev-btn');
    const dosDontsNextBtn = document.querySelector('.dos-donts .dos-donts-slider-btn.next-btn');
    const dosDontsDotsContainer = document.querySelector('.dos-donts .dos-donts-slider-dots');
    const dosDontsItems = document.querySelectorAll('.dos-donts .dos-donts-item');
    let dosDontsCurrentIndex = 0;

    function updateDosDontsSlider() {
        const itemWidth = dosDontsItems[0].clientWidth;
        dosDontsSlider.style.transform = `translateX(-${dosDontsCurrentIndex * itemWidth}px)`;
        updateDosDontsDots();
    }

    function createDosDontsDots() {
        dosDontsDotsContainer.innerHTML = ''; // Clear existing dots
        dosDontsItems.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === dosDontsCurrentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                dosDontsCurrentIndex = index;
                updateDosDontsSlider();
            });
            dosDontsDotsContainer.appendChild(dot);
        });
    }

    function updateDosDontsDots() {
        document.querySelectorAll('.dos-donts .dos-donts-slider-dots .dot').forEach((dot, index) => {
            if (index === dosDontsCurrentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    dosDontsNextBtn.addEventListener('click', () => {
        dosDontsCurrentIndex = (dosDontsCurrentIndex + 1) % dosDontsItems.length;
        updateDosDontsSlider();
    });

    dosDontsPrevBtn.addEventListener('click', () => {
        dosDontsCurrentIndex = (dosDontsCurrentIndex - 1 + dosDontsItems.length) % dosDontsItems.length;
        updateDosDontsSlider();
    });

    // Initialize Do's & Don'ts Carousel
    createDosDontsDots();
    updateDosDontsSlider();
    window.addEventListener('resize', updateDosDontsSlider);

});