/**
 * Google Cloud Summit 2026 — Main JavaScript
 * Handles search, filtering, navigation, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initSearch();
    initCategoryFilters();
    initSpeakerCardFilter();
    initSmoothScroll();
    initMobileNav();
});

/* ---------- Navbar Scroll Effect ---------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 60);
                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ---------- Search ---------- */
function initSearch() {
    const input = document.getElementById('searchInput');
    const clearBtn = document.getElementById('searchClear');

    if (!input) return;

    let debounceTimer;
    input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            applyFilters();
        }, 200);

        clearBtn.classList.toggle('visible', input.value.length > 0);
    });

    clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.classList.remove('visible');
        applyFilters();
        input.focus();
    });
}

/* ---------- Category Chips ---------- */
function initCategoryFilters() {
    const chips = document.querySelectorAll('.chip[data-category]');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('chip-active'));
            chip.classList.add('chip-active');
            applyFilters();
        });
    });

    // Reset button in no-results view
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.getElementById('searchInput').value = '';
            document.getElementById('searchClear').classList.remove('visible');
            chips.forEach(c => c.classList.remove('chip-active'));
            chips[0].classList.add('chip-active');  // "All Sessions"
            applyFilters();
        });
    }
}

/* ---------- Speaker Card Click → Filter ---------- */
function initSpeakerCardFilter() {
    document.querySelectorAll('.speaker-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't hijack LinkedIn button clicks
            if (e.target.closest('.speaker-linkedin-btn')) return;

            const speakerId = card.dataset.speakerId;
            const speakerName = card.querySelector('.speaker-card-name').textContent.trim();

            // Populate search with speaker name
            const input = document.getElementById('searchInput');
            input.value = speakerName;
            document.getElementById('searchClear').classList.add('visible');

            // Reset category to "All"
            document.querySelectorAll('.chip[data-category]').forEach(c => c.classList.remove('chip-active'));
            document.querySelector('.chip[data-category="all"]').classList.add('chip-active');

            applyFilters();

            // Scroll to schedule
            document.getElementById('schedule').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

/* ---------- Apply All Filters ---------- */
function applyFilters() {
    const searchQuery = (document.getElementById('searchInput').value || '').trim().toLowerCase();
    const activeChip = document.querySelector('.chip.chip-active');
    const selectedCategory = activeChip ? activeChip.dataset.category : 'all';

    const timelineItems = document.querySelectorAll('.timeline-item[data-talk-id]');
    const lunchBreak = document.querySelector('.timeline-item[data-slot="lunch"]');
    let visibleCount = 0;

    timelineItems.forEach(item => {
        const talkId = item.dataset.talkId;
        const categories = (item.dataset.categories || '').split(',');
        const card = item.querySelector('.talk-card');
        const title = card.querySelector('.talk-title')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.talk-description')?.textContent.toLowerCase() || '';
        const speakerNames = Array.from(card.querySelectorAll('.speaker-name')).map(el => el.textContent.toLowerCase());

        // Category filter
        let categoryMatch = selectedCategory === 'all' || categories.includes(selectedCategory);

        // Search filter
        let searchMatch = true;
        if (searchQuery) {
            const inTitle = title.includes(searchQuery);
            const inDesc = description.includes(searchQuery);
            const inSpeaker = speakerNames.some(name => name.includes(searchQuery));
            const inCategory = categories.some(cat => cat.toLowerCase().includes(searchQuery));
            searchMatch = inTitle || inDesc || inSpeaker || inCategory;
        }

        const visible = categoryMatch && searchMatch;
        item.classList.toggle('hidden', !visible);

        if (visible) visibleCount++;
    });

    // Show/hide lunch break based on whether any talks are visible
    if (lunchBreak) {
        lunchBreak.classList.toggle('hidden', visibleCount === 0);
    }

    // Show/hide no-results message
    const noResults = document.getElementById('noResults');
    const timeline = document.getElementById('timeline');
    if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        timeline.style.display = visibleCount === 0 ? 'none' : 'block';
    }
}

/* ---------- Smooth Scrolling ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Close mobile nav if open
                document.getElementById('navLinks')?.classList.remove('open');
            }
        });
    });
}

/* ---------- Mobile Navigation Toggle ---------- */
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');

    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('open');
        });
    }
}
