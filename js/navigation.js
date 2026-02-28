/* ===== ROAD TRIP ALGÉRIE 2026 - NAVIGATION ===== */

/**
 * Build the sidebar HTML and inject it into the page.
 * Call this from every page.
 * @param {string} activePage - filename of the current page (e.g. "index.html")
 */
function initNavigation(activePage) {
    const pages = [
        { href: 'index.html', icon: 'fa-map-location-dot', label: 'Carte interactive', num: null },
        { href: 'Recapitulatif-Contexte.html', icon: 'fa-clipboard-list', label: 'Récapitulatif', num: '0' },
        { href: '2-Itineraire.html', icon: 'fa-route', label: 'Itinéraire', num: '2' },
        { href: '3-Vehicule-Location.html', icon: 'fa-car-side', label: 'Véhicule & Location', num: '3' },
        { href: '4-Hebergement-Hotels-Resa.html', icon: 'fa-hotel', label: 'Hébergement', num: '4' },
        { href: '5-BudgetDetaille.html', icon: 'fa-money-bill-wave', label: 'Budget détaillé', num: '5' },
        { href: '6-7-Sante-PakingList.html', icon: 'fa-suitcase-medical', label: 'Santé & Packing', num: '6-7' },
        { href: '8-PlanningJourParJour.html', icon: 'fa-calendar-days', label: 'Planning jour/jour', num: '8' }
    ];

    const navLinks = pages.map(p => {
        const isActive = p.href === activePage ? ' active' : '';
        const numSpan = p.num !== null
            ? `<span class="step-num">${p.num}</span>`
            : `<i class="fa-solid ${p.icon}"></i>`;
        return `<a href="${p.href}" class="${isActive}">${numSpan} ${p.label}</a>`;
    }).join('\n');

    const flagSVG = '<svg viewBox="0 0 900 600" width="36" height="24"><rect width="450" height="600" fill="#006233"/><rect x="450" width="450" height="600" fill="#FFF"/><g transform="translate(450,300)"><circle r="150" fill="#D21034"/><circle cx="25" r="120" fill="#FFF"/></g><g transform="translate(490,300)" fill="#D21034"><polygon points="0,-70 18.3,-21.6 66.6,-21.6 26.5,8.3 41.1,56.6 0,26.7 -41.1,56.6 -26.5,8.3 -66.6,-21.6 -18.3,-21.6"/></g></svg>';

    const sidebarHTML = `
    <button class="menu-toggle" id="menuToggle" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
    <div class="sidebar-overlay" id="sidebarOverlay"></div>
    <nav class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <span class="flag">${flagSVG}</span>
            <h2>Road Trip Algérie 2026</h2>
            <div class="trip-dates">21 mars – 10 avril · 4 750 km</div>
        </div>
        <div class="sidebar-nav">
            ${navLinks}
        </div>
        <div class="sidebar-footer">© 2026 Road Trip Algérie</div>
    </nav>`;

    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // Toggle sidebar on mobile
    const toggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    });

    // Scroll-to-top button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        scrollBtn.classList.toggle('visible', window.scrollY > 400);
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
