// ================================
// Smooth Scroll & Navigation
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
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

// Scroll down indicator click
const scrollDown = document.querySelector('.scroll-down');
if (scrollDown) {
    scrollDown.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ================================
// Intersection Observer for Animations
// ================================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    animateOnScroll.observe(section);
});

// Observe lesson cards with stagger
const lessonCards = document.querySelectorAll('.lesson-card');
lessonCards.forEach((card, index) => {
    card.style.setProperty('--stagger-delay', `${index * 0.1}s`);
    animateOnScroll.observe(card);
});

// ================================
// Parallax Effect for Hero
// ================================

let lastScrollY = window.pageYOffset;
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.pageYOffset;
    
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ================================
// Story Content Fade-in on Scroll
// ================================

const storyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const paragraphs = entry.target.querySelectorAll('p');
            paragraphs.forEach((p, index) => {
                setTimeout(() => {
                    p.style.opacity = '1';
                    p.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.2 });

const storyContent = document.querySelector('.story-content');
if (storyContent) {
    storyObserver.observe(storyContent);
}

// ================================
// Gallery Hover Effects Enhancement
// ================================

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ================================
// Button Ripple Effect
// ================================

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
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
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ================================
// Page Load Animation
// ================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ================================
// Smooth Fade-in for Images
// ================================

const images = document.querySelectorAll('img');
images.forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    }
});
