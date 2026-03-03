/* ═══════════════════════════════════════════════════════
   PORTFOLIO — Shubh Ansh Kesharwani
   JavaScript: Animations & Interactivity
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─── SMOOTH SCROLL NAV ─── */
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu
                navMenu.classList.remove('open');
                navToggle.classList.remove('open');
            }
        });
    });

    /* ─── ACTIVE NAV LINK ON SCROLL ─── */
    function updateActiveLink() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    /* ─── MOBILE HAMBURGER ─── */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        navToggle.classList.toggle('open');
    });

    /* Close menu when clicking outside */
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('open');
            navToggle.classList.remove('open');
        }
    });

    /* ─── FADE-IN ON SCROLL (IntersectionObserver) ─── */
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for siblings
                const delay = index * 80;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    /* ─── HEADER SHADOW ON SCROLL ─── */
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
    }, { passive: true });

    /* ─── PARALLAX GLOW EFFECT ON HERO ─── */
    const hero = document.querySelector('.hero');
    const heroBefore = hero;

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        hero.style.setProperty('--glow-x', `${50 + x}%`);
        hero.style.setProperty('--glow-y', `${50 + y}%`);
    });

});
