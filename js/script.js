// ================================
// Interactive Elements
// ================================

document.addEventListener('DOMContentLoaded', () => {
    // ================================
    // 3D Tilt Effect for Cards
    // ================================

    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', handleTilt);
        element.addEventListener('mouseleave', resetTilt);
    });

    function handleTilt(e) {
        const card = e.currentTarget;
        // シンプルな浮き上がり効果のみ
        card.style.transform = 'translateY(-10px) scale(1.02)';
    }

    function resetTilt(e) {
        const card = e.currentTarget;
        card.style.transform = '';
    }

    // ================================
    // Lightbox for Gallery Images
    // ================================

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');

    const galleryItems = document.querySelectorAll('[data-lightbox]');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && lightbox && lightboxImg) {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;

                if (lightboxCaption) {
                    lightboxCaption.textContent = img.alt || '';
                }

                // Prevent body scroll
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });

    function closeLightbox() {
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // ================================
    // Horizontal Timeline Scroll
    // ================================

    const timelineWrapper = document.querySelector('.timeline-wrapper');

    if (timelineWrapper && window.innerWidth <= 768) {
        // Enable touch scrolling for mobile
        let isDown = false;
        let startX;
        let scrollLeft;

        timelineWrapper.addEventListener('mousedown', (e) => {
            isDown = true;
            timelineWrapper.style.cursor = 'grabbing';
            startX = e.pageX - timelineWrapper.offsetLeft;
            scrollLeft = timelineWrapper.scrollLeft;
        });

        timelineWrapper.addEventListener('mouseleave', () => {
            isDown = false;
            timelineWrapper.style.cursor = 'grab';
        });

        timelineWrapper.addEventListener('mouseup', () => {
            isDown = false;
            timelineWrapper.style.cursor = 'grab';
        });

        timelineWrapper.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - timelineWrapper.offsetLeft;
            const walk = (x - startX) * 2;
            timelineWrapper.scrollLeft = scrollLeft - walk;
        });
    }

    // ================================
    // Active Nav Link on Scroll
    // ================================

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ================================
    // Smooth Scroll for Anchor Links
    // ================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ================================
    // Neon Button Ripple Effect
    // ================================

    const neonButtons = document.querySelectorAll('.btn-neon');

    neonButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-effect 0.6s ease-out';
            ripple.style.pointerEvents = 'none';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ================================
    // Performance Optimization
    // ================================

    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ================================
    // Accessibility: Keyboard Navigation
    // ================================

    // Focus trap for lightbox
    if (lightbox) {
        lightbox.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                if (lightboxClose) {
                    lightboxClose.focus();
                }
            }
        });
    }

    // Skip to main content (for screen readers)
    // Removed: causing visual issue in top-left corner

    // ================================
    // Console Log - Easter Egg
    // ================================

    console.log(
        '%c Body in Motion %c',
        'background: linear-gradient(135deg, #00F5FF 0%, #FF00E5 100%); color: white; font-size: 20px; padding: 10px; font-weight: bold;',
        ''
    );
    console.log('✨ Designed with GSAP + Three.js + Modern CSS');
    console.log('📧 Contact: info.hirokitakamura@gmail.com');
});
