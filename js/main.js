document.addEventListener('DOMContentLoaded', () => {

    // ─── MOBILE NAV TOGGLE ───
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // ─── HEADER SCROLL SHADOW ───
    const header = document.getElementById('site-header');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // ─── ACTIVE NAV LINK ON SCROLL ───
    const sections = document.querySelectorAll('main .section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === `#${id}`
                        );
                    });
                }
            });
        },
        {
            rootMargin: '-80px 0px -50% 0px',
            threshold: 0
        }
    );

    sections.forEach(section => sectionObserver.observe(section));

    // ─── SCROLL-REVEAL ANIMATIONS ───
    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion) {
        const fadeElements = document.querySelectorAll('.fade-in');

        const fadeObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        fadeObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        fadeElements.forEach(el => fadeObserver.observe(el));
    }

    // ─── UPDATE COPYRIGHT YEAR ───
    const yearEl = document.querySelector('.footer-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
