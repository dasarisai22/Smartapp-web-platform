document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // 3. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 4. Form Validation (Demo purposes)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.classList.contains('search-form')) {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                if (!btn) return;
                const originalText = btn.innerHTML;

                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                btn.disabled = true;
                btn.style.opacity = '0.7';

                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-check-circle"></i> Success!';
                    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

                    setTimeout(() => {
                        if (window.location.pathname.includes('login.html')) {
                            window.location.href = 'dashboard.html';
                        } else if (window.location.pathname.includes('register.html')) {
                            window.location.href = 'login.html';
                        } else {
                            btn.innerHTML = originalText;
                            btn.disabled = false;
                            btn.style.opacity = '1';
                            btn.style.background = '';
                            form.reset();
                        }
                    }, 1000);
                }, 1500);
            }
        });
    });

    // 5. Dashboard Sidebar Logic (Single Page App)
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a[data-target]');
    const contentSections = document.querySelectorAll('.content-section');

    if (sidebarLinks.length > 0 && contentSections.length > 0) {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all links
                sidebarLinks.forEach(item => item.classList.remove('active'));

                // Add active class to clicked link
                link.classList.add('active');

                // Get target section id
                const targetId = link.getAttribute('data-target');

                // Hide all sections then show target
                contentSections.forEach(section => {
                    if (section.id === targetId) {
                        section.style.display = 'block';
                        section.style.opacity = '1';
                    } else {
                        section.style.display = 'none';
                    }
                });
            });
        });
    }

    // 6. Logout Button Logic
    const logoutBtn = document.querySelector('a[href="index.html"].btn-outline');
    if (logoutBtn && window.location.pathname.includes('dashboard')) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging out...';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 800);
        });
    }
});
