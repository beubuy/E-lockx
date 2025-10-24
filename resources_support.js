// resources_support.js

document.addEventListener('DOMContentLoaded', () => {
    // Accordion functionality for FAQ section
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = header.nextElementSibling; // The content div

            // Toggle active class on header
            header.classList.toggle('active');
            // Toggle active class on content for styling and height adjustment
            accordionContent.classList.toggle('active');

            // Adjust max-height for smooth transition
            if (accordionContent.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            } else {
                accordionContent.style.maxHeight = "0";
            }

            // Close other open accordions
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    const otherContent = otherHeader.nextElementSibling;
                    otherContent.classList.remove('active');
                    otherContent.style.maxHeight = "0";
                }
            });
        });
    });

    // Ensure max-height is recalculated on window resize for responsive accordions
    window.addEventListener('resize', () => {
        document.querySelectorAll('.accordion-content.active').forEach(content => {
            content.style.maxHeight = content.scrollHeight + "px";
        });
    });

    // Add AOS (Animate On Scroll) initialization if you decide to use it
    // if (typeof AOS !== 'undefined') {
    //     AOS.init({
    //         duration: 800,
    //         easing: 'ease-out',
    //         once: true
    //     });
    // }
});