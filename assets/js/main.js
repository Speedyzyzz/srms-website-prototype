'use strict';

/**
 * Shrimathi Ranganayaki Ammal Nursery & Primary School
 * main.js — Navigation, Animations, JSON Data Loaders, EmailJS
 * Version 2.0 — No DOM injection (header/footer are hardcoded in HTML)
 */

// ============================================================
// SITE CONFIGURATION
// Update these values before going live.
// ============================================================
const SITE = {
    phone: '919952569111',
    waAdmissionsMsg: 'Hi%2C%20I%20would%20like%20to%20enquire%20about%20admissions%20(Pre%20KG%20to%20Std%20V)%20at%20Shrimathi%20Ranganayaki%20Ammal%20School%20for%20the%20academic%20year%202025%E2%80%9326.',
    waContactMsg: 'Hi%2C%20I%20have%20a%20general%20enquiry%20about%20Shrimathi%20Ranganayaki%20Ammal%20School.',
    dataPath: 'assets/data/'
};

// ============================================================
// DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initActiveNav();
    initHeaderScroll();
    initMobileDrawer();
    initScrollAnimations();

    // JSON-driven sections — only runs on pages that have the container
    if (document.getElementById('announcementsContainer')) loadAnnouncements();
    if (document.getElementById('galleryGrid'))            loadGallery();
    if (document.getElementById('facilitiesGrid'))         loadFacilities();
    if (document.getElementById('achievementsGrid'))       loadAchievements();
    if (document.getElementById('circularsContainer'))     loadCirculars();

    // Contact form (EmailJS)
    if (document.getElementById('contactForm'))  initContactForm();

    // Gallery filter (runs after gallery JSON loads — called from within loadGallery)
    // Circular search (runs after circulars JSON loads — called from within loadCirculars)
});

// ============================================================
// 1. ACTIVE NAV LINK
// ============================================================
function initActiveNav() {
    const path = window.location.pathname;
    let page = 'index';
    if (path.includes('about'))      page = 'about';
    else if (path.includes('academics'))  page = 'academics';
    else if (path.includes('admissions')) page = 'admissions';
    else if (path.includes('events'))     page = 'events';
    else if (path.includes('gallery'))    page = 'gallery';
    else if (path.includes('contact'))    page = 'contact';

    document.querySelectorAll('[data-page]').forEach(el => {
        if (el.getAttribute('data-page') === page) {
            el.classList.add('active');
        }
    });
}

// ============================================================
// 2. HEADER SCROLL STYLING
// ============================================================
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    const toggle = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };

    window.addEventListener('scroll', toggle, { passive: true });
    toggle(); // Run once on load in case page is pre-scrolled
}

// ============================================================
// 3. MOBILE DRAWER TOGGLE
// ============================================================
function initMobileDrawer() {
    const btn    = document.querySelector('.mobile-menu-toggle');
    const drawer = document.querySelector('.mobile-nav-drawer');
    if (!btn || !drawer) return;

    btn.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('open');
        btn.classList.toggle('active', isOpen);
        btn.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('no-scroll', isOpen);
    });

    // Close when a link is clicked
    drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            drawer.classList.remove('open');
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && drawer.classList.contains('open')) {
            drawer.classList.remove('open');
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
            btn.focus();
        }
    });
}

// ============================================================
// 4. INTERSECTION OBSERVER — SCROLL ANIMATIONS
// ============================================================
function initScrollAnimations() {
    const els = document.querySelectorAll('.animate-on-scroll, .animate-zoom');
    if (!els.length) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        els.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all immediately
        els.forEach(el => el.classList.add('is-visible'));
    }
}

// ============================================================
// 5. JSON LOADER UTILITY
// ============================================================
async function fetchJSON(file) {
    try {
        const res = await fetch(SITE.dataPath + file + '?v=' + new Date().getTime());
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (err) {
        console.warn(`[SRA] Failed to load ${file}:`, err.message);
        return null;
    }
}

function showLoadingSpinner(container) {
    container.innerHTML = `
        <div class="loading-placeholder">
            <div class="loading-spinner"></div>
            <p>Loading...</p>
        </div>`;
}

// ============================================================
// 6. LOAD ANNOUNCEMENTS (index.html & events.html home strip)
// ============================================================
async function loadAnnouncements() {
    const container = document.getElementById('announcementsContainer');
    if (!container) return;
    showLoadingSpinner(container);

    const data = await fetchJSON('announcements.json');
    if (!data) {
        container.innerHTML = '<p class="loading-placeholder">Could not load announcements.</p>';
        return;
    }

    // Show max 3 on home, all on events page
    const isEventsPage = window.location.pathname.includes('events');
    const items = isEventsPage ? data : data.slice(0, 3);

    container.innerHTML = items.map(item => `
        <div class="card-notice animate-on-scroll">
            <div class="notice-meta">
                <span>${escHtml(item.category)}</span>
                <span>${escHtml(item.displayDate)}</span>
            </div>
            <h3 class="notice-title">${escHtml(item.title)}</h3>
            <p class="notice-body">${escHtml(item.body)}</p>
            <a href="${escHtml(item.link)}" class="notice-link">Read Details &rarr;</a>
        </div>
    `).join('');

    // Re-run scroll animations on new elements
    initScrollAnimations();
}

// ============================================================
// 7. LOAD CIRCULARS (events.html notice board)
// ============================================================
async function loadCirculars() {
    const container = document.getElementById('circularsContainer');
    if (!container) return;
    showLoadingSpinner(container);

    const data = await fetchJSON('announcements.json');
    if (!data) {
        container.innerHTML = '<p class="loading-placeholder">Could not load notices.</p>';
        return;
    }

    container.innerHTML = data.map(item => `
        <div class="circular-item" data-keywords="${escHtml(item.keywords)}">
            <div class="circular-info">
                <div class="circular-icon">${item.icon}</div>
                <div class="circular-text">
                    <h4>${escHtml(item.title)}</h4>
                    <span>Published: ${formatDate(item.date)} &middot; Category: ${escHtml(item.category)}</span>
                </div>
            </div>
            <a href="${escHtml(item.link)}" class="btn btn-outline btn-nav-cta">View Details</a>
        </div>
    `).join('');

    // Wire up search after rendering
    initCircularSearch();
}

function initCircularSearch() {
    const input = document.getElementById('circularSearch');
    const noResults = document.getElementById('noResults');
    if (!input) return;

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase().trim();
        const items = document.querySelectorAll('.circular-item');
        let visible = 0;

        items.forEach(item => {
            const title    = item.querySelector('h4').textContent.toLowerCase();
            const keywords = item.getAttribute('data-keywords').toLowerCase();
            const match    = title.includes(query) || keywords.includes(query);
            item.style.display = match ? 'flex' : 'none';
            if (match) visible++;
        });

        if (noResults) {
            noResults.style.display = visible === 0 ? 'block' : 'none';
        }
    });
}

// ============================================================
// 8. LOAD GALLERY (gallery.html)
// ============================================================
async function loadGallery() {
    const grid = document.getElementById('galleryGrid');
    const filtersContainer = document.getElementById('galleryFilters');
    if (!grid) return;
    showLoadingSpinner(grid);

    const data = await fetchJSON('gallery.json');
    if (!data) {
        grid.innerHTML = '<p class="loading-placeholder">Could not load gallery.</p>';
        return;
    }

    // Build unique category list
    const categories = ['all', ...new Set(data.map(i => i.category))];

    if (filtersContainer) {
        filtersContainer.innerHTML = categories.map(cat => `
            <button class="filter-btn ${cat === 'all' ? 'active' : ''}"
                    data-filter="${escHtml(cat)}">
                ${cat === 'all' ? 'All Photos' : capitalize(cat)}
            </button>
        `).join('');

        // Attach filter events
        filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                filtersContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterGallery(btn.getAttribute('data-filter'));
            });
        });
    }

    grid.innerHTML = data.map(item => {
        if (item.placeholder) {
            return `
                <div class="gallery-item" data-category="${escHtml(item.category)}">
                    <div class="placeholder-img">
                        <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M21 15L16 10 5 21"/><circle cx="8.5" cy="8.5" r="1.5"/>
                        </svg>
                        <span>${escHtml(item.title)}</span>
                    </div>
                </div>`;
        }
        return `
            <div class="gallery-item" data-category="${escHtml(item.category)}">
                <img src="${escHtml(item.src)}" alt="${escHtml(item.alt)}" loading="lazy">
            </div>`;
    }).join('');
}

function filterGallery(category) {
    document.querySelectorAll('.gallery-item').forEach(item => {
        const show = category === 'all' || item.getAttribute('data-category') === category;
        item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        if (show) {
            item.style.display = 'block';
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 20);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.85)';
            setTimeout(() => { item.style.display = 'none'; }, 360);
        }
    });
}

// ============================================================
// 9. LOAD FACILITIES (academics.html)
// ============================================================
async function loadFacilities() {
    const grid = document.getElementById('facilitiesGrid');
    if (!grid) return;
    showLoadingSpinner(grid);

    const data = await fetchJSON('facilities.json');
    if (!data) {
        grid.innerHTML = '<p class="loading-placeholder">Could not load facilities.</p>';
        return;
    }

    grid.innerHTML = data.map((item, i) => `
        <div class="program-card animate-on-scroll animate-delay-${(i % 3) + 1}">
            <span class="program-icon">${item.icon}</span>
            <h3>${escHtml(item.title)}</h3>
            <p>${escHtml(item.description)}</p>
        </div>
    `).join('');

    initScrollAnimations();
}

// ============================================================
// 10. LOAD ACHIEVEMENTS (about.html / index.html)
// ============================================================
async function loadAchievements() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;
    showLoadingSpinner(grid);

    const data = await fetchJSON('achievements.json');
    if (!data) {
        grid.innerHTML = '<p class="loading-placeholder">Could not load achievements.</p>';
        return;
    }

    grid.innerHTML = data.map((item, i) => `
        <div class="achievement-card animate-on-scroll animate-delay-${(i % 5) + 1}">
            <span class="achievement-icon">${item.icon}</span>
            <h4>${escHtml(item.title)}</h4>
            <p>${escHtml(item.description)}</p>
        </div>
    `).join('');

    initScrollAnimations();
}

// ============================================================
// 11. WHATSAPP CONTACT FORM
// ============================================================
function initContactForm() {
    const form      = document.getElementById('contactForm');
    const success   = document.getElementById('formSuccess');
    const submitBtn = form.querySelector('[type="submit"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const phone = form.parentPhone ? form.parentPhone.value : form.querySelector('#parentPhone')?.value || '';
        if (phone.length !== 10) {
            showFormAlert('Please enter a valid 10-digit phone number.');
            return;
        }

        const pName   = form.parentName ? form.parentName.value : form.querySelector('#parentName')?.value || '';
        const cName   = form.childName ? form.childName.value : form.querySelector('#childName')?.value || '';
        const email   = form.parentEmail ? form.parentEmail.value : form.querySelector('#parentEmail')?.value || '';
        const enqCls  = form.enquiryClass ? form.enquiryClass.value : form.querySelector('#enquiryClass')?.value || '';
        const msg     = form.message ? form.message.value : form.querySelector('#message')?.value || '';

        // Build WhatsApp Message
        let waText = `*New Enquiry from Website*%0A%0A`;
        waText += `*Name:* ${pName}%0A`;
        if (cName) waText += `*Child's Name:* ${cName}%0A`;
        waText += `*Phone:* ${phone}%0A`;
        if (email) waText += `*Email:* ${email}%0A`;
        if (enqCls) waText += `*Enquiry For:* ${enqCls}%0A`;
        if (msg) waText += `%0A*Message:*%0A${msg}`;

        // Redirect to WhatsApp
        const waUrl = `https://wa.me/${SITE.phone}?text=${waText}`;
        window.open(waUrl, '_blank');

        form.style.display = 'none';
        if (success) success.style.display = 'block';
    });
}

function resetContactForm() {
    const form    = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (form)    { form.reset(); form.style.display = 'block'; }
    if (success) { success.style.display = 'none'; }
}

// Expose globally for inline onclick
window.resetContactForm = resetContactForm;

function showFormAlert(msg) {
    // Use a styled inline alert instead of browser alert()
    let el = document.getElementById('formAlert');
    if (!el) {
        el = document.createElement('div');
        el.id = 'formAlert';
        el.style.cssText = 'background:#FFEBEE;border:1px solid #C62828;color:#8B0000;padding:0.75rem 1rem;border-radius:8px;margin-bottom:1rem;font-size:0.9rem;font-weight:600;';
        document.getElementById('contactForm').prepend(el);
    }
    el.textContent = msg;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 5000);
}

// ============================================================
// HELPER UTILITIES
// ============================================================
function escHtml(str) {
    if (typeof str !== 'string') return str;
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}
