/* ===== ROAD TRIP ALGÉRIE 2026 - INTERACTIVE MAP ===== */

function initMap() {
    /* ---------- City data ---------- */
    const cities = [
        {
            name: 'Ibazizen',
            lat: 36.75, lng: 5.08,
            day: 'J0 & J19-J20',
            type: 'depart',
            hotel: '—',
            info: 'Point de départ et d\'arrivée. Famille, dernières préparations.',
            details: 'Arrivée France → Algérie. Briefing familial, vérification finale du matériel.',
            anchor: 'j0'
        },
        {
            name: 'Laghouat',
            lat: 33.80, lng: 2.88,
            day: 'J1',
            type: 'etape',
            hotel: 'Hôtel Hercules ⭐⭐⭐',
            info: '550 km depuis Ibazizen · 6h30 de route · Conducteur : Ali',
            details: 'Porte du désert. Visite possible du centre ancien et de la palmeraie.',
            anchor: 'j1'
        },
        {
            name: 'Ghardaïa',
            lat: 32.49, lng: 3.67,
            day: 'J2-J3',
            type: 'repos',
            hotel: 'Hôtel El-Djazair ⭐⭐⭐',
            info: '200 km depuis Laghouat · 3h de route · Conducteur : Jean',
            details: 'Patrimoine UNESCO – Vallée du M\'Zab. Visite des Ksars Beni Isguen et El Ateuf. Marché aux tapis. Repos actif J3.',
            anchor: 'j2'
        },
        {
            name: 'In Salah',
            lat: 27.19, lng: 2.47,
            day: 'J4',
            type: 'etape',
            hotel: 'Hôtel Zeribat ⭐⭐⭐',
            info: '550 km depuis Ghardaïa · 7h30 de route · Conducteur : Ali',
            details: 'Oasis saharienne. Repos total l\'après-midi – étape de transition vers le Grand Sud.',
            anchor: 'j4'
        },
        {
            name: 'Tamanrasset',
            lat: 22.79, lng: 5.52,
            day: 'J5-J7',
            type: 'repos',
            hotel: 'Hôtel Tahat ⭐⭐⭐',
            info: '700 km depuis In Salah · 10h de route · ⚠️ Journée très dure',
            details: 'Capitale du Hoggar. Musée, tombeau de Tin Hinan. Excursion Assekrem possible (J6-J7). 3 nuits de repos.',
            anchor: 'j5'
        },
        {
            name: 'Djanet',
            lat: 24.55, lng: 9.48,
            day: 'J8-J11',
            type: 'visite',
            hotel: 'Hôtel Zeribas ⭐⭐',
            info: '686 km depuis Tamanrasset · 10h de route · Piste N3 critique',
            details: 'Joyau du Tassili n\'Ajjer. Peintures rupestres Sefar, Tazarift et Jabbaren. Circuit 4×4 guidé. Dîner touareg. 4 nuits.',
            anchor: 'j8'
        },
        {
            name: 'Illizi',
            lat: 26.51, lng: 8.48,
            day: 'J12-J13',
            type: 'repos',
            hotel: 'Hôtel Dar Dhiaf ⭐⭐⭐',
            info: '412 km depuis Djanet · 6h de route',
            details: 'Repos et excursions optionnelles en 4×4 dans le Tassili. 2 nuits.',
            anchor: 'j12'
        },
        {
            name: 'In Amenas',
            lat: 28.05, lng: 9.57,
            day: 'J14',
            type: 'etape',
            hotel: 'Hôtel Ayanis ⭐⭐⭐',
            info: '174 km depuis Illizi · 3h de route',
            details: 'Étape courte de transition pour le retour vers le nord.',
            anchor: 'j14'
        },
        {
            name: 'Ouargla',
            lat: 31.95, lng: 5.33,
            day: 'J15-J16',
            type: 'repos',
            hotel: 'Hôtel El-Bey ⭐⭐⭐⭐',
            info: '760 km depuis In Amenas · 10-11h de route · Grand Erg Oriental',
            details: 'Remplace Hassi Messaoud. Visite du Ksar et des oasis. 2 nuits de repos.',
            anchor: 'j15'
        },
        {
            name: 'Biskra',
            lat: 34.85, lng: 5.73,
            day: 'J17-J18',
            type: 'etape',
            hotel: 'Hôtel Vescera ⭐⭐⭐',
            info: '205 km depuis Ouargla · 3h de route',
            details: 'Oasis des Ziban. Bains thermaux Hammam Salhine (recommandé pour Ahmed). 1 nuit.',
            anchor: 'j17'
        }
    ];

    /* ---------- Colour by type ---------- */
    const typeColors = {
        depart: '#e53935',
        etape: '#1976d2',
        repos: '#ff9800',
        visite: '#2e7d32'
    };

    const typeLabels = {
        depart: 'Départ / Arrivée',
        etape: 'Étape route',
        repos: 'Repos prolongé',
        visite: 'Visite majeure'
    };

    /* ---------- Create map ---------- */
    const map = L.map('map', {
        center: [29.5, 5.5],
        zoom: 6,
        zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18
    }).addTo(map);

    /* ---------- Route segments ---------- */
    const routeStyles = {
        aller:  { color: '#d32f2f', weight: 3.5, opacity: 0.85 },
        retour: { color: '#1565c0', weight: 3.5, opacity: 0.85, dashArray: '10, 8' }
    };

    const segments = [];
    for (let i = 0; i < cities.length - 1; i++) {
        segments.push({
            from: [cities[i].lat, cities[i].lng],
            to:   [cities[i + 1].lat, cities[i + 1].lng],
            type: 'aller'
        });
    }
    /* Return leg: Biskra → Ibazizen */
    segments.push({
        from: [cities[cities.length - 1].lat, cities[cities.length - 1].lng],
        to:   [cities[0].lat, cities[0].lng],
        type: 'retour'
    });

    /* ---------- OSRM routing helpers ---------- */
    async function fetchOSRMRoute(waypoints) {
        var coords = waypoints.map(function (p) { return p[1] + ',' + p[0]; }).join(';');
        var url = 'https://router.project-osrm.org/route/v1/driving/' + coords + '?overview=full&geometries=geojson';
        var response = await fetch(url);
        if (!response.ok) throw new Error('HTTP ' + response.status + ': ' + response.statusText);
        var data = await response.json();
        if (data.code === 'Ok' && data.routes.length > 0) {
            return data.routes[0].geometry.coordinates.map(function (c) { return [c[1], c[0]]; });
        }
        throw new Error(data.code || 'No route');
    }

    /* Draw all route segments concurrently (real roads via OSRM, fallback to straight lines) */
    async function drawRoutes() {
        var results = await Promise.allSettled(
            segments.map(function (seg) { return fetchOSRMRoute([seg.from, seg.to]); })
        );
        results.forEach(function (result, i) {
            var seg = segments[i];
            var style = routeStyles[seg.type];
            if (result.status === 'fulfilled') {
                L.polyline(result.value, style).addTo(map);
            } else {
                console.warn('OSRM route fallback (straight line) for segment ' + i +
                    ' (' + seg.from + ' → ' + seg.to + '):', result.reason.message);
                L.polyline([seg.from, seg.to], {
                    color: style.color,
                    weight: style.weight,
                    opacity: 0.5,
                    dashArray: '4, 8'
                }).addTo(map);
            }
        });
    }

    drawRoutes();

    /* ---------- Markers ---------- */
    const markers = [];

    cities.forEach((city, idx) => {
        const color = typeColors[city.type];
        const size = city.type === 'depart' ? 14 : city.type === 'visite' ? 12 : 10;

        const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="
                width:${size}px;height:${size}px;
                background:${color};
                border:2px solid #fff;
                border-radius:50%;
                box-shadow:0 1px 4px rgba(0,0,0,0.4);
            "></div>`,
            iconSize: [size, size],
            iconAnchor: [size/2, size/2],
            popupAnchor: [0, -size/2 - 4]
        });

        const popupHTML = `
            <div class="city-popup">
                <h3>${city.name}</h3>
                <div class="popup-day">${city.day}</div>
                <div class="popup-info">
                    <strong>🏨</strong> ${city.hotel}<br>
                    <strong>🛣️</strong> ${city.info}<br><br>
                    ${city.details}
                </div>
                <a class="popup-link" href="8-PlanningJourParJour.html#${city.anchor}">
                    📅 Voir le planning détaillé
                </a>
            </div>`;

        const marker = L.marker([city.lat, city.lng], { icon })
            .addTo(map)
            .bindPopup(popupHTML, { maxWidth: 300 });

        // Tooltip on hover
        marker.bindTooltip(city.name, {
            permanent: false,
            direction: 'top',
            offset: [0, -size/2 - 2],
            className: 'city-tooltip'
        });

        markers.push(marker);
    });

    /* ---------- Fit bounds ---------- */
    const group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));

    /* ---------- Legend ---------- */
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'map-legend');
        div.innerHTML = '<h4>Légende</h4>' +
            '<div class="legend-item">' +
                '<span class="legend-line" style="border-top:3px solid #d32f2f"></span> Trajet aller' +
            '</div>' +
            '<div class="legend-item">' +
                '<span class="legend-line" style="border-top:3px dashed #1565c0"></span> Trajet retour' +
            '</div>' +
            '<hr style="margin:6px 0;border:none;border-top:1px solid #ddd">' +
            Object.entries(typeLabels).map(([key, label]) =>
                `<div class="legend-item">
                    <span class="legend-dot" style="background:${typeColors[key]}"></span> ${label}
                </div>`
            ).join('');
        return div;
    };
    legend.addTo(map);
}
