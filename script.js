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

    // 4. Team Member Modals
    const teamData = {
        wilbur: {
            name: 'Wilbur Moffitt',
            role: 'Founder & Frontend Specialist',
            img: 'about-photo-1.png',
            bio: '<p>Wilbur is the founder of WW Digital, specializing in creating flawless, modern frontend experiences. With a keen eye for design aesthetics and a passion for performance, he ensures every project not only looks stunning but runs lightning-fast across all devices.</p>'
        },
        will: {
            name: 'Will Hammond',
            role: 'Co-founder, Backend & Commerce Specialist',
            img: 'about-photo-2.png',
            bio: '<p>Will makes sure our digital solutions are as powerful under the hood as they are beautiful on the surface. Specializing in robust backend architectures and highly scalable e-commerce solutions, he builds the reliable systems that drive our clients\' businesses forward.</p>'
        }
    };

    const teamMembers = document.querySelectorAll('.team-member');
    const modal = document.getElementById('team-modal');

    if (teamMembers.length > 0 && modal) {
        const modalClose = document.querySelector('.modal-close');
        const modalImg = document.getElementById('modal-img');
        const modalName = document.getElementById('modal-name');
        const modalRole = document.getElementById('modal-role');
        const modalBio = document.getElementById('modal-bio');

        teamMembers.forEach(member => {
            member.addEventListener('click', () => {
                const memberId = member.getAttribute('data-member');
                const data = teamData[memberId];
                if (data) {
                    modalImg.src = data.img;
                    modalName.textContent = data.name;
                    modalRole.textContent = data.role;
                    modalBio.innerHTML = data.bio;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });

        // Close logic
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            // Close if clicking outside the modal container
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
        });
    }
    // 5. Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (filterButtons.length > 0 && portfolioCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filter === 'all' || filter === category) {
                        card.style.display = 'block';
                        // Trigger a small animation reflow
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 400); // Wait for transition
                    }
                });
            });
        });
    }
});
