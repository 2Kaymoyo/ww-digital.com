/**
 * WW Digital - Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Navigation on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const mobileIcon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            mobileIcon.classList.remove('fa-bars');
            mobileIcon.classList.add('fa-xmark');
        } else {
            mobileIcon.classList.remove('fa-xmark');
            mobileIcon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileIcon.classList.remove('fa-xmark');
            mobileIcon.classList.add('fa-bars');
        });
    });

    // 3. Intersection Observer for Scroll Animations
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it has faded in
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
