// ================================
// Scroll Animation
// ================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in-up class
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// ================================
// Smooth Scroll for anchor links
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Only prevent default if it's not just "#"
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ================================
// Parallax effect for blobs (optional)
// ================================

let scrollPosition = 0;

window.addEventListener('scroll', () => {
    scrollPosition = window.pageYOffset;

    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.05;
        const yPos = -(scrollPosition * speed);
        blob.style.transform = `translateY(${yPos}px)`;
    });
});

// ================================
// Mobile menu toggle (for future use)
// ================================

// Placeholder for hamburger menu functionality if needed later
// const menuToggle = document.querySelector('.menu-toggle');
// const nav = document.querySelector('.nav');
//
// if (menuToggle) {
//     menuToggle.addEventListener('click', () => {
//         nav.classList.toggle('active');
//     });
// }
