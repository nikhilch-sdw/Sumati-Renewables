/**
 * Sumati Renewables - Main Controller (Ultra-Premium 3D Refraction Simulator Edition)
 * Author: Antigravity AI
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderScroll();
  initMobileNav();
  initRefractionSimulator();
  initMfgSimulator();
  initProductFilter();
  initProductModal();
  initGalleryLightbox();
  initRibbonCalculator();
  initRFQForm();
  initStatCounters();
  initProductSlider();
});

/* ==========================================================================
   1. Theme Switcher (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('sumati_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(themeBtn, savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('sumati_theme', newTheme);
    updateThemeIcon(themeBtn, newTheme);
  });
}

function updateThemeIcon(btn, theme) {
  btn.innerHTML = theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
}

/* ==========================================================================
   2. Sticky Header & Mobile Nav Toggle
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    });
  });
}

/* ==========================================================================
   3. Ultra-Premium Interactive 3D Solar Light Refraction Simulator
   ========================================================================== */
function initRefractionSimulator() {
  const canvas = document.getElementById('refraction-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  let mode = 'reflective'; // 'reflective' or 'flat'
  let sunAngle = 45;
  let photonOffset = 0;

  const btnReflective = document.getElementById('switch-reflective');
  const btnFlat = document.getElementById('switch-flat');
  const angleSlider = document.getElementById('sun-angle-slider');
  const angleLabel = document.getElementById('sun-angle-val');
  const boostMetric = document.getElementById('metric-boost-val');
  const statusText = document.getElementById('refraction-status-text');

  if (btnReflective && btnFlat) {
    btnReflective.addEventListener('click', () => {
      btnReflective.classList.add('active');
      btnFlat.classList.remove('active');
      mode = 'reflective';
      if (boostMetric) {
        boostMetric.textContent = '+1.52% Efficiency';
        boostMetric.style.color = 'var(--accent-green)';
      }
      if (statusText) {
        statusText.innerHTML = 
          '<strong style="color: var(--accent-green);">Sumati Reflective PV Busbar:</strong> 120° micro-grooves redirect 100% of incident light directly into silicon wafer substrate (+1.52% energy boost!).';
      }
    });

    btnFlat.addEventListener('click', () => {
      btnFlat.classList.add('active');
      btnReflective.classList.remove('active');
      mode = 'flat';
      if (boostMetric) {
        boostMetric.textContent = '0.00% Optical Loss';
        boostMetric.style.color = '#ef4444';
      }
      if (statusText) {
        statusText.innerHTML = 
          '<strong style="color: #ef4444;">Standard Flat Ribbon:</strong> Incident sunlight strikes flat copper and bounces straight back up out into sky (Wasted Optical Loss!).';
      }
    });
  }

  if (angleSlider) {
    angleSlider.addEventListener('input', (e) => {
      sunAngle = parseInt(e.target.value);
      if (angleLabel) angleLabel.textContent = `${sunAngle}°`;
    });
  }

  function renderRefraction() {
    ctx.clearRect(0, 0, width, height);

    photonOffset = (photonOffset + 1.2) % 30;

    const centerY = height * 0.72;
    const ribWidth = Math.min(320, width * 0.62);
    const startX = width / 2 - ribWidth / 2;

    // 1. Silicon Wafer Substrate Base (Deep Metallic Wafer with Photovoltaic Finger Grid)
    const subY = centerY + 10;
    const subH = height - subY - 15;
    const subW = width - 40;

    const waferGrad = ctx.createLinearGradient(0, subY, 0, subY + subH);
    waferGrad.addColorStop(0, '#061324');
    waferGrad.addColorStop(1, '#020610');
    ctx.fillStyle = waferGrad;
    ctx.fillRect(20, subY, subW, subH);

    ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(20, subY, subW, subH);

    // Fine Silicon Busbar Finger Grid Lines
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
    ctx.lineWidth = 1;
    for (let gx = 35; gx < width - 30; gx += 20) {
      ctx.beginPath();
      ctx.moveTo(gx, subY);
      ctx.lineTo(gx, subY + subH);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(6, 182, 212, 0.85)';
    ctx.font = '700 12px Outfit, sans-serif';
    ctx.fillText('ACTIVE SILICON CELL SUBSTRATE (99.9% PHOTON ABSORPTION)', 35, subY + 24);

    // 2. Glass Cover & Encapsulant Layer
    const glassY = centerY - 130;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(20, glassY, subW, 115);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.strokeRect(20, glassY, subW, 115);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillText('SOLAR MODULE TEMPERED GLASS & EVA ENCAPSULANT', 35, glassY + 22);

    // 3. 3D Interconnect Ribbon Body
    const ribH = 22;
    const ribY = centerY - ribH;

    if (mode === 'reflective') {
      // 3D Metallic Royal Blue Base
      const ribGrad = ctx.createLinearGradient(startX, ribY, startX + ribWidth, ribY);
      ribGrad.addColorStop(0, '#1e3a8a');
      ribGrad.addColorStop(0.5, '#305EBA');
      ribGrad.addColorStop(1, '#1e3a8a');
      ctx.fillStyle = ribGrad;
      ctx.fillRect(startX, ribY, ribWidth, ribH);

      // 3D Grooved Prisms
      const numPrisms = 16;
      const prismW = ribWidth / numPrisms;
      for (let i = 0; i < numPrisms; i++) {
        const px = startX + i * prismW;
        
        // Left Facet (Bright Royal Blue Highlight)
        ctx.fillStyle = '#60a5fa';
        ctx.beginPath();
        ctx.moveTo(px, ribY);
        ctx.lineTo(px + prismW / 2, ribY - 10);
        ctx.lineTo(px + prismW / 2, ribY);
        ctx.closePath();
        ctx.fill();

        // Right Facet (Deep Royal Blue Shadow)
        ctx.fillStyle = '#1d4ed8';
        ctx.beginPath();
        ctx.moveTo(px + prismW / 2, ribY - 10);
        ctx.lineTo(px + prismW, ribY);
        ctx.lineTo(px + prismW / 2, ribY);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = '#1e3a8a';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    } else {
      // Smooth Flat Copper Ribbon
      const flatGrad = ctx.createLinearGradient(startX, ribY, startX, ribY + ribH);
      flatGrad.addColorStop(0, '#f97316');
      flatGrad.addColorStop(0.5, '#ea580c');
      flatGrad.addColorStop(1, '#9a3412');
      ctx.fillStyle = flatGrad;
      ctx.fillRect(startX, ribY, ribWidth, ribH);
      ctx.strokeStyle = '#c2410c';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(startX, ribY, ribWidth, ribH);
    }

    // 4. Sun & Dynamic Laser Photons
    const rad = (sunAngle * Math.PI) / 180;
    const rayDist = 240;
    const sunX = Math.min(width - 60, Math.max(60, width / 2 + Math.cos(rad) * rayDist));
    const sunY = Math.min(glassY - 35, Math.max(40, glassY - Math.sin(rad) * 100));

    // Multi-Layer Outer Sun Aura
    const sunAura = ctx.createRadialGradient(sunX, sunY, 5, sunX, sunY, 45);
    sunAura.addColorStop(0, 'rgba(253, 224, 71, 1)');
    sunAura.addColorStop(0.4, 'rgba(245, 158, 11, 0.45)');
    sunAura.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.fillStyle = sunAura;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 45, 0, Math.PI * 2);
    ctx.fill();

    // Solid Sun Core
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 14, 0, Math.PI * 2);
    ctx.fill();

    // Incident Sunlight Beams & Animated Photon Pulses
    const numBeams = 9;
    for (let i = 0; i < numBeams; i++) {
      const offset = (i - (numBeams - 1) / 2) * (ribWidth / (numBeams + 1));
      const hitX = width / 2 + offset;
      const hitY = mode === 'reflective' ? ribY - 5 : ribY;

      // Incident Sunlight Ray (Golden Laser Line)
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.85)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.lineDashOffset = -photonOffset;
      ctx.beginPath();
      ctx.moveTo(sunX, sunY);
      ctx.lineTo(hitX, hitY);
      ctx.stroke();

      // Photons Traveling Downwards
      ctx.setLineDash([]);
      const pct = (photonOffset / 30 + i * 0.12) % 1;
      const px = sunX + (hitX - sunX) * pct;
      const py = sunY + (hitY - sunY) * pct;

      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Refracted / Reflected Ray Behavior
      if (mode === 'reflective') {
        // Redirection downward into Silicon Substrate (Green Laser)
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.9)';
        ctx.lineWidth = 2.5;

        const dir = hitX < width / 2 ? -1 : 1;
        const subX = Math.max(30, Math.min(width - 30, hitX + dir * 110));
        const subTargetY = subY + 12;

        ctx.beginPath();
        ctx.moveTo(hitX, hitY);
        ctx.lineTo(subX, subTargetY);
        ctx.stroke();

        // Energy Absorption Pulse Ring on Silicon Surface
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(subX, subTargetY, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(subX, subTargetY, 8, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Wasted Reflection upward into Sky/Glass (Red Warning Ray)
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.85)';
        ctx.lineWidth = 2;

        const escapeX = hitX + (hitX - sunX) * 0.85;
        const escapeY = glassY - 50;

        ctx.beginPath();
        ctx.moveTo(hitX, hitY);
        ctx.lineTo(escapeX, escapeY);
        ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(escapeX, escapeY, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    requestAnimationFrame(renderRefraction);
  }

  renderRefraction();
}

/* ==========================================================================
   4. Manufacturing Process Simulation
   ========================================================================== */
function initMfgSimulator() {
  const canvas = document.getElementById('mfg-sim-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  let wireProgress = 0;

  function renderMfg() {
    ctx.clearRect(0, 0, width, height);

    const lineY = height / 2;
    wireProgress = (wireProgress + 2) % width;

    // Cable Line
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, lineY);
    ctx.lineTo(width, lineY);
    ctx.stroke();

    // Moving Particles
    ctx.fillStyle = '#f59e0b';
    for (let x = wireProgress; x < width; x += 120) {
      ctx.beginPath();
      ctx.arc(x, lineY, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(renderMfg);
  }

  renderMfg();
}

/* ==========================================================================
   5. Product Filter & Spec Modal
   ========================================================================== */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.products-filter-bar .filter-btn');
  const cards = document.querySelectorAll('.product-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initProductModal() {
  const modalOverlay = document.getElementById('product-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modalOverlay || !closeBtn) return;

  const specData = {
    'pv-ribbon': {
      title: 'PV RIBBON (INTERCONNECT)',
      tagline: '99.99% ETP Copper Interconnect for Solar Modules',
      desc: 'Our Interconnect PV Ribbon is manufactured using high-purity ETP copper rod with continuous hot-dip tinning, offering ultra-soft yield strength to eliminate cell micro-cracking.',
      img: 'assets/images/pv_ribbon_product.jpg',
      specs: [
        ['Base Metal', 'ETP Copper (TU1) ≥ 99.99%'],
        ['Width Range', '0.90 mm – 8.00 mm (± 0.05 mm)'],
        ['Thickness Range', '0.08 mm – 0.50 mm (± 0.005 mm)'],
        ['Yield Strength', '< 80 MPa'],
        ['Elongation', '≥ 25%'],
        ['Solder Layer', 'Sn60Pb40 / Sn96.5Ag3.0Cu0.5 (Lead-Free)'],
        ['Coating Thickness', '10 µm – 30 µm per side']
      ]
    },
    'reflective-busbar': {
      title: 'REFLECTIVE PV BUSBAR',
      tagline: 'Prismatic Light-Redirecting Surface Technology',
      desc: 'Featuring precision micro-grooved triangular prisms that reflect incident sunlight back onto the module cover glass for total internal reflection into active silicon wafer area.',
      img: 'assets/images/reflective_busbar_product.jpg',
      specs: [
        ['Power Output Gain', '+ 1.2% to + 1.8%'],
        ['Prism Angle', '120° Precision Optical Prism'],
        ['Base Material', 'High-Conductivity Tinned Copper'],
        ['Width Specs', '1.20 mm – 3.00 mm'],
        ['Thickness Specs', '0.15 mm – 0.30 mm'],
        ['Solder Compatibility', 'Standard Automated Tabber-Stringers'],
        ['Certifications', 'ISO 9001, RoHS, REACH']
      ]
    },
    'multi-busbar': {
      title: 'MULTI-BUSBAR (MBB) WIRE',
      tagline: 'Micro Round Tinned Wire for 9BB - 16BB Modules',
      desc: 'Designed for next-generation MBB solar module architectures, our micro round tinned copper wire reduces shading loss while boosting current collection efficiency.',
      img: 'assets/images/multi_busbar_wire.jpg',
      specs: [
        ['Wire Diameter', '0.22 mm – 0.40 mm (± 0.003 mm)'],
        ['Roundness Tolerance', '< 0.002 mm'],
        ['Conductivity', '≥ 99.8% IACS'],
        ['Yield Strength', '< 90 MPa'],
        ['Coating Alloy', 'Sn-Pb, Sn-Ag-Cu Lead-Free'],
        ['Packaging', 'DIN160 / DIN200 Reel Spools'],
        ['Application', 'TOPCon, PERC, HJT 9BB-16BB Modules']
      ]
    },
    'pv-wire': {
      title: 'TINNED COPPER PV WIRE',
      tagline: 'Flexible High-Current Solar Interconnect Lead Wire',
      desc: 'Engineered for inter-string jumpers and junction box connection leads, providing maximum weather resistance and current carrying capacity.',
      img: 'assets/images/pv_ribbon_product.jpg',
      specs: [
        ['Conductor', 'Flexible Tinned Stranded/Flat Copper'],
        ['Temperature Rating', '-40°C to +120°C'],
        ['Corrosion Resistance', 'Salt Mist & Acid Resistant'],
        ['Solderability', 'Zero-Cross Time < 1.0 sec'],
        ['Voltage Grade', '1000V / 1500V DC Compatible']
      ]
    },
    'pv-busbar': {
      title: 'PRECISION PV BUSBAR',
      tagline: 'Zero-Burr Tinned Copper Busbar for Solar Arrays',
      desc: 'Heavy-duty tinned copper busbar for string connections, featuring ultra-flat surface parallelism and zero burr edges.',
      img: 'assets/images/reflective_busbar_product.jpg',
      specs: [
        ['Width Range', '4.0 mm – 12.0 mm'],
        ['Thickness', '0.20 mm – 0.50 mm'],
        ['Max Current Rating', 'Up to 35 A'],
        ['Edge Quality', '100% Burr-Free Precision Slit'],
        ['Tin Coating', 'Continuous Hot-Dip Plated']
      ]
    },
    'ultrathin-busbar': {
      title: 'ULTRATHIN PV BUSBAR',
      tagline: 'Sub-100 Micron Ribbon for TOPCon & HJT Modules',
      desc: 'Specially engineered ultra-thin tinned ribbon (<100µm) designed for delicate glass-glass TOPCon and Heterojunction (HJT) module architectures.',
      img: 'assets/images/multi_busbar_wire.jpg',
      specs: [
        ['Ribbon Thickness', '60 µm – 95 µm (± 0.003 mm)'],
        ['Mechanical Cell Stress', '98% Reduction vs Standard Ribbon'],
        ['Yield Stress', '< 75 MPa Ultra-Soft'],
        ['Cell Compatibility', 'N-Type TOPCon, HJT, PERC']
      ]
    }
  };

  document.querySelectorAll('.btn-view-spec').forEach(btn => {
    btn.addEventListener('click', () => {
      const productKey = btn.getAttribute('data-product');
      const data = specData[productKey];

      if (data) {
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-tagline').textContent = data.tagline;
        document.getElementById('modal-desc').textContent = data.desc;
        document.getElementById('modal-img').src = data.img;

        const tbody = document.getElementById('modal-spec-tbody');
        tbody.innerHTML = '';

        data.specs.forEach(([param, detail]) => {
          const row = document.createElement('tr');
          row.innerHTML = `<td><strong>${param}</strong></td><td>${detail}</td>`;
          tbody.appendChild(row);
        });

        modalOverlay.classList.add('active');
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
}

/* ==========================================================================
   6. Ultra-Premium Interactive Media Gallery & Lightbox Modal
   ========================================================================== */
function initGalleryLightbox() {
  const galleryGrid = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('gallery-lightbox');
  const mediaWrapper = document.getElementById('lightbox-media-wrapper');
  const titleElem = document.getElementById('lightbox-title');
  const descElem = document.getElementById('lightbox-desc');
  const counterElem = document.getElementById('lightbox-counter');

  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');

  if (!galleryGrid || !lightbox) return;

  const galleryCards = Array.from(galleryGrid.querySelectorAll('.gallery-card'));
  let activeCards = [...galleryCards];
  let currentIndex = 0;

  // Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      activeCards = [];

      galleryCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          activeCards.push(card);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Open Lightbox on Click
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const indexInActive = activeCards.indexOf(card);
      currentIndex = indexInActive >= 0 ? indexInActive : 0;
      openLightbox(currentIndex);
    });
  });

  function openLightbox(index) {
    if (activeCards.length === 0) return;

    const currentCard = activeCards[index];
    const type = currentCard.getAttribute('data-type');
    const src = currentCard.getAttribute('data-src');
    const title = currentCard.getAttribute('data-title');
    const desc = currentCard.getAttribute('data-desc');

    mediaWrapper.innerHTML = '';

    if (type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      video.autoplay = true;
      video.loop = true;
      video.controls = true;
      video.playsInline = true;
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'contain';
      mediaWrapper.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'contain';
      mediaWrapper.appendChild(img);
    }

    if (titleElem) titleElem.textContent = '';
    if (descElem) descElem.textContent = '';
    if (counterElem) counterElem.textContent = `${index + 1} / ${activeCards.length}`;

    lightbox.classList.add('active');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    mediaWrapper.innerHTML = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + activeCards.length) % activeCards.length;
      openLightbox(currentIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % activeCards.length;
      openLightbox(currentIndex);
    });
  }

  // Keyboard Arrow Navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + activeCards.length) % activeCards.length;
      openLightbox(currentIndex);
    }
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % activeCards.length;
      openLightbox(currentIndex);
    }
  });
}

/* ==========================================================================
   7. Ribbon Resistance Calculator
   ========================================================================== */
function initRibbonCalculator() {
  const widthInput = document.getElementById('calc-width');
  const thickInput = document.getElementById('calc-thickness');
  const lengthInput = document.getElementById('calc-length');
  const busbarSelect = document.getElementById('calc-busbars');
  const meterCircle = document.getElementById('meter-circle');

  if (!widthInput || !thickInput || !lengthInput) return;

  function calculateSpecs() {
    const width = parseFloat(widthInput.value) || 1.5;
    const thick = parseFloat(thickInput.value) || 0.2;
    const length = parseFloat(lengthInput.value) || 1.0;
    const busbars = parseInt(busbarSelect ? busbarSelect.value : 10);

    document.getElementById('val-width').textContent = width.toFixed(2) + ' mm';
    document.getElementById('val-thick').textContent = thick.toFixed(2) + ' mm';
    document.getElementById('val-length').textContent = length.toFixed(1) + ' m';

    const area = width * thick;
    const resistancePerMeter = (0.01724 / area);
    const totalResistanceMilliOhms = (resistancePerMeter * length * 1000) / busbars;

    const standardResistance = (0.01724 / (1.2 * 0.15)) * length * 1000 / busbars;
    const powerLossSavedWatts = Math.max(0, (standardResistance - totalResistanceMilliOhms) * 0.45);

    document.getElementById('res-area').textContent = area.toFixed(3) + ' mm²';
    document.getElementById('res-resistance').textContent = totalResistanceMilliOhms.toFixed(2) + ' mΩ';
    document.getElementById('res-power-saved').textContent = '+' + (powerLossSavedWatts + 0.85).toFixed(2) + ' W';

    if (meterCircle) {
      const maxOffset = 251;
      const pct = Math.min(1, (powerLossSavedWatts + 0.85) / 3.0);
      const newOffset = maxOffset - (maxOffset * pct);
      meterCircle.style.strokeDashoffset = newOffset;
    }
  }

  widthInput.addEventListener('input', calculateSpecs);
  thickInput.addEventListener('input', calculateSpecs);
  lengthInput.addEventListener('input', calculateSpecs);
  if (busbarSelect) busbarSelect.addEventListener('change', calculateSpecs);

  calculateSpecs();
}

/* ==========================================================================
   8. RFQ Form
   ========================================================================== */
function initRFQForm() {
  const rfqForm = document.getElementById('rfq-form');
  const feedbackModal = document.getElementById('quote-modal');
  const feedbackClose = document.getElementById('quote-modal-close');

  if (!rfqForm) return;

  rfqForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('rfq-name').value;
    const product = document.getElementById('rfq-product').value;

    if (feedbackModal) {
      document.getElementById('quote-modal-name').textContent = name || 'Valued Client';
      document.getElementById('quote-modal-product').textContent = product || 'PV Ribbon';
      feedbackModal.classList.add('active');
    }

    rfqForm.reset();
  });

  if (feedbackClose && feedbackModal) {
    feedbackClose.addEventListener('click', () => {
      feedbackModal.classList.remove('active');
    });
  }
}

/* ==========================================================================
   9. Animated Stat Counters
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function checkScroll() {
    if (animated) return;
    
    const triggerPos = window.innerHeight * 0.85;
    statNumbers.forEach(stat => {
      const top = stat.getBoundingClientRect().top;
      if (top < triggerPos) {
        animated = true;
        animateNumber(stat);
      }
    });
  }

  function animateNumber(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const prefix = element.getAttribute('data-prefix') || '';
    const suffix = element.getAttribute('data-suffix') || '';
    let current = 0;
    const step = target / 40;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = prefix + target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = prefix + Math.floor(current) + suffix;
      }
    }, 30);
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll();
}

/* ==========================================================================
   11. Product Internal Pages - 4-in-a-Row Image Slider
   ========================================================================== */
function initProductSlider() {
  const wrappers = document.querySelectorAll('.product-slider-wrapper');
  if (!wrappers.length) return;

  wrappers.forEach(wrapper => {
    const track = wrapper.querySelector('.product-slider-track');
    const prevBtn = wrapper.querySelector('.prev-arrow');
    const nextBtn = wrapper.querySelector('.next-arrow');
    if (!track) return;

    const getScrollAmount = () => {
      const item = track.querySelector('.product-slide-item');
      return item ? item.offsetWidth + 20 : 260;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      });
    }

    // Auto-scroll loop
    let autoInterval = null;
    const startAuto = () => {
      stopAuto();
      autoInterval = setInterval(() => {
        const scrollAmt = getScrollAmount();
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 15) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: scrollAmt, behavior: 'smooth' });
        }
      }, 3500);
    };

    const stopAuto = () => {
      if (autoInterval) clearInterval(autoInterval);
    };

    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('mouseleave', startAuto);
    track.addEventListener('touchstart', stopAuto, { passive: true });
    track.addEventListener('touchend', startAuto, { passive: true });

    startAuto();
  });
}

