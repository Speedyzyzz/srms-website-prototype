document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Header/Navbar
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = `
            <header class="main-header">
                <div class="nav-container">
                    <a href="index.html" class="logo-area">
                        <!-- Red/White School Logo -->
                        <div class="logo-wrapper">
                            <img src="assets/logo.png" alt="School Logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" class="school-logo-img">
                            <div class="logo-fallback" style="display:none;">
                                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="48" fill="#D32F2F" stroke="#ffffff" stroke-width="2"/>
                                    <circle cx="50" cy="50" r="44" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3 3"/>
                                    <path d="M30 65 C40 60, 60 60, 70 65 C70 50, 70 40, 50 35 C30 40, 30 50, 30 65 Z" fill="#ffffff" opacity="0.9"/>
                                    <circle cx="50" cy="42" r="6" fill="#D32F2F"/>
                                    <path d="M50 48 L50 60" stroke="#D32F2F" stroke-width="2" stroke-linecap="round"/>
                                    <path d="M45 54 L55 54" stroke="#D32F2F" stroke-width="2" stroke-linecap="round"/>
                                </svg>
                            </div>
                        </div>
                        <div class="logo-text">
                            <span class="school-title">Shrimathi Ranganayaki Ammal</span>
                            <span class="school-subtitle">Nursery & Primary School</span>
                        </div>
                    </a>

                    <nav class="desktop-nav">
                        <ul class="nav-links">
                            <li><a href="index.html" class="nav-link" data-page="index">Home</a></li>
                            <li><a href="about.html" class="nav-link" data-page="about">About Us</a></li>
                            <li><a href="academics.html" class="nav-link" data-page="academics">Academics</a></li>
                            <li><a href="admissions.html" class="nav-link" data-page="admissions">Admissions</a></li>
                            <li><a href="events.html" class="nav-link" data-page="events">Events</a></li>
                            <li><a href="gallery.html" class="nav-link" data-page="gallery">Gallery</a></li>
                            <li><a href="contact.html" class="nav-link" data-page="contact">Contact</a></li>
                        </ul>
                    </nav>

                    <div class="nav-actions">
                        <a href="admissions.html" class="btn btn-gold btn-nav-cta">Enquire Now</a>
                        <button class="mobile-menu-toggle" aria-label="Toggle menu">
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </button>
                    </div>
                </div>

                <!-- Mobile Drawer Navigation -->
                <div class="mobile-nav-drawer">
                    <ul class="mobile-nav-links">
                        <li><a href="index.html" class="mobile-link" data-page="index">Home</a></li>
                        <li><a href="about.html" class="mobile-link" data-page="about">About Us</a></li>
                        <li><a href="academics.html" class="mobile-link" data-page="academics">Academics</a></li>
                        <li><a href="admissions.html" class="mobile-link" data-page="admissions">Admissions</a></li>
                        <li><a href="events.html" class="mobile-link" data-page="events">Events</a></li>
                        <li><a href="gallery.html" class="mobile-link" data-page="gallery">Gallery</a></li>
                        <li><a href="contact.html" class="mobile-link" data-page="contact">Contact</a></li>
                        <li><a href="admissions.html" class="btn btn-gold btn-mobile-cta">Enquire Now</a></li>
                    </ul>
                </div>
            </header>
        `;
    }

    // 2. Inject Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
            <footer class="site-footer">
                <div class="footer-container">
                    <div class="footer-brand">
                        <a href="index.html" class="footer-logo-area">
                            <div class="logo-wrapper">
                                <img src="assets/logo.png" alt="School Logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" class="school-logo-img">
                                <div class="logo-fallback" style="display:none;">
                                    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="48" fill="#D32F2F" stroke="#ffffff" stroke-width="2"/>
                                        <circle cx="50" cy="50" r="44" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="3 3"/>
                                        <path d="M30 65 C40 60, 60 60, 70 65 C70 50, 70 40, 50 35 C30 40, 30 50, 30 65 Z" fill="#ffffff" opacity="0.9"/>
                                        <circle cx="50" cy="42" r="6" fill="#D32F2F"/>
                                        <path d="M50 48 L50 60" stroke="#D32F2F" stroke-width="2" stroke-linecap="round"/>
                                        <path d="M45 54 L55 54" stroke="#D32F2F" stroke-width="2" stroke-linecap="round"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="logo-text">
                                <span class="school-title">Shrimathi Ranganayaki Ammal</span>
                                <span class="school-subtitle">Nursery & Primary School</span>
                            </div>
                        </a>
                        <p class="footer-tagline">"Mother's Touch" — Estd. 1997. Nurturing young minds through interactive, holistic, and stress-free education.</p>
                        <div class="footer-socials">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                            </a>
                        </div>
                    </div>

                    <div class="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="academics.html">Academics</a></li>
                            <li><a href="admissions.html">Admissions</a></li>
                            <li><a href="events.html">Events & Circulars</a></li>
                            <li><a href="gallery.html">Photo Gallery</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                        </ul>
                    </div>

                    <div class="footer-contact">
                        <h4>Contact Info</h4>
                        <p class="address">
                            <strong>Shrimathi Ranganayaki Ammal School</strong><br>
                            No. 62, L M School Street,<br>
                            Papanaickenpalayam,<br>
                            Coimbatore - 641037
                        </p>
                        <p class="meta">
                            <span><strong>Estd:</strong> 1997</span><br>
                            <span><strong>Location:</strong> Coimbatore, TN</span>
                        </p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Shrimathi Ranganayaki Ammal Nursery & Primary School. All Rights Reserved.</p>
                </div>
            </footer>
        `;
    }

    // 3. Highlight Active Navigation Links
    const currentPath = window.location.pathname;
    let pageName = 'index'; // default
    if (currentPath.includes('about.html')) pageName = 'about';
    else if (currentPath.includes('academics.html')) pageName = 'academics';
    else if (currentPath.includes('admissions.html')) pageName = 'admissions';
    else if (currentPath.includes('events.html')) pageName = 'events';
    else if (currentPath.includes('gallery.html')) pageName = 'gallery';
    else if (currentPath.includes('contact.html')) pageName = 'contact';

    // Desktop
    const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
    desktopLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });

    // Mobile
    const mobileLinks = document.querySelectorAll('.mobile-nav-drawer .mobile-link');
    mobileLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });

    // 4. Header Scroll styling
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        // Run once in case they reload scrolled down
        if (window.scrollY > 50) header.classList.add('scrolled');
    }

    // 5. Mobile Drawer Toggle
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');
    if (toggleBtn && drawer) {
        toggleBtn.addEventListener('click', () => {
            toggleBtn.classList.toggle('active');
            drawer.classList.toggle('open');
            document.body.classList.toggle('no-scroll');
        });

        // Close drawer when link clicked
        const drawerLinks = drawer.querySelectorAll('a');
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleBtn.classList.remove('active');
                drawer.classList.remove('open');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // 6. Intersection Observer for Scroll Animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-zoom');
    if ('IntersectionObserver' in window && animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Animates once
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }
});
