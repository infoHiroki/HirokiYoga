// ================================
// GSAP Scroll Animations
// ================================

// Wait for GSAP to load
window.addEventListener('load', () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        initAnimations();
    }
});

function initAnimations() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ================================
    // Hero Section Animations
    // ================================

    // Hero title fade in animation
    gsap.from('.hero-title', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power2.out'
    });

    // Hero fade out on scroll
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        opacity: 0,
        scale: 0.8,
        y: -100
    });

    // ================================
    // About Section - Split Screen
    // ================================

    // Pin the fixed image
    if (window.innerWidth > 768) {
        ScrollTrigger.create({
            trigger: '.about',
            start: 'top top',
            end: 'bottom bottom',
            pin: '.fixed-image',
            anticipatePin: 1
        });
    }

    // Info cards stagger animation
    gsap.from('.info-card', {
        scrollTrigger: {
            trigger: '.info-cards',
            start: 'top 80%'
        },
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
    });

    // ================================
    // Story Section - Horizontal Scroll
    // ================================

    if (window.innerWidth > 768) {
        const timelineWrapper = document.querySelector('.timeline-track');
        if (timelineWrapper) {
            const scrollWidth = timelineWrapper.scrollWidth - window.innerWidth;

            gsap.to(timelineWrapper, {
                scrollTrigger: {
                    trigger: '.story',
                    start: 'top top',
                    end: () => `+=${scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                },
                x: -scrollWidth,
                ease: 'none'
            });
        }
    }

    // Timeline items fade in
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.story',
            start: 'top 50%'
        },
        y: 30,
        stagger: 0.3,
        duration: 0.8
    });

    // ================================
    // Lesson Section - Cards Animation
    // ================================

    // Temporarily disabled to debug
    /*
    gsap.from('.lesson-card', {
        scrollTrigger: {
            trigger: '.lesson',
            start: 'top 70%'
        },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
    });
    */

    // ================================
    // Gallery Section
    // ================================

    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '.gallery',
            start: 'top 70%'
        },
        scale: 0.95,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out'
    });

    // ================================
    // Progress Indicator
    // ================================

    const sections = document.querySelectorAll('section');
    const currentSectionEl = document.querySelector('.current-section');
    const progressBar = document.querySelector('.progress-bar');

    if (sections.length > 0 && currentSectionEl) {
        sections.forEach((section, index) => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                onEnter: () => {
                    currentSectionEl.textContent = String(index + 1).padStart(2, '0');
                    updateProgressBar(index / (sections.length - 1));
                },
                onEnterBack: () => {
                    currentSectionEl.textContent = String(index + 1).padStart(2, '0');
                    updateProgressBar(index / (sections.length - 1));
                }
            });
        });
    }

    function updateProgressBar(progress) {
        if (progressBar) {
            gsap.to(progressBar.querySelector('::after') || progressBar, {
                height: `${progress * 100}%`,
                duration: 0.3
            });
        }
    }

    // ================================
    // Smooth Scroll for Nav Links
    // ================================

    // Removed: Using native smooth scroll in script.js instead
    // (GSAP ScrollToPlugin not loaded)

    // ================================
    // Cursor Glow Effect
    // ================================

    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursorGlow, {
                x: e.clientX - 150,
                y: e.clientY - 150,
                duration: 0.3,
                ease: 'power2.out'
            });

            // Show glow in hero section
            const hero = document.querySelector('.hero');
            if (hero) {
                const rect = hero.getBoundingClientRect();
                const isInHero = e.clientY >= rect.top && e.clientY <= rect.bottom;

                gsap.to(cursorGlow, {
                    opacity: isInHero ? 0.3 : 0,
                    duration: 0.3
                });
            }
        });
    }
}
