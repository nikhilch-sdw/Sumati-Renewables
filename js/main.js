/**
 * Sumati Renewables - Main Controller (Clean High-Visibility Video & Stats Edition)
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
  initRibbonCalculator();
  initRFQForm();
  initStatCounters();
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
   3. Interactive 3D Solar Light Refraction Simulator
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

  const btnReflective = document.getElementById('switch-reflective');
  const btnFlat = document.getElementById('switch-flat');
  const angleSlider = document.getElementById('sun-angle-slider');

  if (btnReflective && btnFlat) {
    btnReflective.addEventListener('click', () => {
      btnReflective.classList.add('active');
      btnFlat.classList.remove('active');
      mode = 'reflective';
      document.getElementById('refraction-status-text').innerHTML = 
        '<strong style="color: var(--accent-green);">Sumati Reflective PV Busbar:</strong> Incident light strikes 3D triangular micro-grooves and redirects 100% into silicon wafer cell substrate (+1.52% power gain!).';
    });

    btnFlat.addEventListener('click', () => {
      btnFlat.classList.add('active');
      btnReflective.classList.remove('active');
      mode = 'flat';
      document.getElementById('refraction-status-text').innerHTML = 
        '<strong style="color: #ef4444;">Standard Flat Ribbon:</strong> Incident light reflects off smooth copper back up into module glass and sky (Wasted Optical Loss!).';
    });
  }

  if (angleSlider) {
    angleSlider.addEventListener('input', (e) => {
      sunAngle = parseInt(e.target.value);
    });
  }

  let rayOffset = 0;

  function renderRefraction() {
    ctx.clearRect(0, 0, width, height);

    const centerY = height * 0.65;
    const ribWidth = 160;
    const startX = width / 2 - ribWidth / 2;

    // Silicon Substrate
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(40, centerY, width - 80, 100);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 60; x < width - 60; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, centerY);
      ctx.lineTo(x, centerY + 100);
      ctx.stroke();
    }

    // Glass Layer
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(20, centerY - 140);
    ctx.lineTo(width - 20, centerY - 140);
    ctx.stroke();

    ctx.fillStyle = 'rgba(6, 182, 212, 0.06)';
    ctx.fillRect(20, centerY - 140, width - 40, 140);

    // Ribbon Structure
    if (mode === 'flat') {
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(startX, centerY - 12, ribWidth, 12);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.strokeRect(startX, centerY - 12, ribWidth, 12);
    } else {
      ctx.fillStyle = '#d97706';
      ctx.fillRect(startX, centerY - 12, ribWidth, 12);

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      const grooveCount = 10;
      const step = ribWidth / grooveCount;
      for (let i = 0; i < grooveCount; i++) {
        const gx = startX + i * step;
        ctx.moveTo(gx, centerY - 4);
        ctx.lineTo(gx + step / 2, centerY - 16);
        ctx.lineTo(gx + step, centerY - 4);
      }
      ctx.closePath();
      ctx.fill();
    }

    // Incident Rays
    rayOffset = (rayOffset + 1) % 40;
    const rad = (sunAngle * Math.PI) / 180;

    const sunX = width / 2 + Math.cos(rad) * 220;
    const sunY = centerY - 200 - Math.sin(rad) * 50;

    ctx.fillStyle = '#f59e0b';
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#f59e0b';
    ctx.beginPath();
    ctx.arc(sunX, sunY, 16, 0, Math.PI * 2);
    ctx.fill();

    const rayTargets = [startX + 30, startX + 80, startX + 130];
    rayTargets.forEach(tx => {
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.85)';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([8, 6]);
      ctx.lineDashOffset = -rayOffset;

      ctx.beginPath();
      ctx.moveTo(sunX, sunY);
      ctx.lineTo(tx, centerY - 12);
      ctx.stroke();
      ctx.setLineDash([]);

      if (mode === 'flat') {
        const rx = tx - (sunX - tx);
        const ry = sunY;

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx, centerY - 12);
        ctx.lineTo(rx, ry);
        ctx.stroke();
      } else {
        const rx1 = tx - 45;
        const ry1 = centerY;

        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#10b981';

        ctx.beginPath();
        ctx.moveTo(tx, centerY - 12);
        ctx.lineTo(rx1, ry1);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(rx1, ry1);
        ctx.lineTo(rx1 - 30, centerY - 140);
        ctx.lineTo(rx1 - 60, ry1);
        ctx.stroke();
      }
    });

    requestAnimationFrame(renderRefraction);
  }

  renderRefraction();
}

/* ==========================================================================
   4. Manufacturing Machine Simulator
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

  let wireX = 0;

  function renderMfgSim() {
    ctx.clearRect(0, 0, width, height);

    wireX = (wireX + 2) % width;

    // Station 1: Copper Ingot Spool
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.arc(80, height / 2, 35, 0, Math.PI * 2);
    ctx.fill();

    // Station 2: Diamond Drawing Die Box
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(220, height / 2 - 40, 60, 80);
    ctx.strokeStyle = '#f59e0b';
    ctx.strokeRect(220, height / 2 - 40, 60, 80);

    // Station 3: Induction Annealing Heating Tube
    ctx.fillStyle = '#991b1b';
    ctx.shadowBlur = 25;
    ctx.shadowColor = '#ef4444';
    ctx.fillRect(360, height / 2 - 25, 100, 50);
    ctx.shadowBlur = 0;

    // Station 4: Hot-Dip Tin Bath
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(520, height / 2 + 10, 110, 40);

    // Station 5: Spool Reel
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(750, height / 2, 40, 0, Math.PI * 2);
    ctx.fill();

    // Continuous Wire Line
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(80, height / 2);
    ctx.lineTo(width - 50, height / 2);
    ctx.stroke();

    for (let x = wireX; x < width - 50; x += 120) {
      ctx.fillStyle = '#fef08a';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#f59e0b';
      ctx.beginPath();
      ctx.arc(x, height / 2, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(renderMfgSim);
  }

  renderMfgSim();
}

/* ==========================================================================
   5. Products Filter & Tech Spec Modal Data
   ========================================================================== */
const productData = {
  'pv-ribbon': {
    title: 'PV RIBBON',
    tagline: 'High yield strength, ultra-low resistance solar cell interconnects',
    desc: 'Sumati PV Ribbon is engineered for optimal soldering performance and thermal stability. Produced from 99.99% ETP Grade Copper with uniform hot-dip tin plating, ensuring maximum module efficiency and long-term durability under harsh environmental stress.',
    image: 'assets/images/pv_ribbon_product.jpg',
    specs: [
      { label: 'Base Material', value: 'ETP / OFC Copper (99.99% Purity)' },
      { label: 'Ribbon Width', value: '0.90 mm – 8.00 mm (Tolerance ±0.03mm)' },
      { label: 'Ribbon Thickness', value: '0.08 mm – 0.50 mm (Tolerance ±0.005mm)' },
      { label: 'Yield Strength ($R_{p0.2}$)', value: '< 80 MPa (Ultra-soft option available)' },
      { label: 'Elongation at Break', value: '≥ 25%' },
      { label: 'Coating Options', value: 'Sn60Pb40, Lead-Free Sn96.5Ag3.0Cu0.5, Low Temp Sn42Bi58' },
      { label: 'Coating Thickness', value: '10 µm – 30 µm per side' }
    ]
  },
  'reflective-busbar': {
    title: 'REFLECTIVE PV BUSBAR',
    tagline: 'Patented micro-grooved surface boosting module output by up to 1.5%',
    desc: 'Featuring a specialized engineered triangular or grooved surface texture, Reflective PV Busbar redirects incident sunlight back onto the active solar cell surface via total internal reflection inside the module glass, reducing optical shading losses dramatically.',
    image: 'assets/images/reflective_busbar_product.jpg',
    specs: [
      { label: 'Surface Texture', value: 'Micro-Grooved Triangular Prism Profile' },
      { label: 'Reflectivity Gain', value: '+1.2% to +1.8% Power Output Boost' },
      { label: 'Ribbon Width', value: '1.20 mm – 6.00 mm' },
      { label: 'Ribbon Thickness', value: '0.15 mm – 0.40 mm' },
      { label: 'Copper Purity', value: 'High Conductivity ETP Copper' },
      { label: 'Coating Type', value: 'Ultra-Shiny Lead-Free SnAgCu Alloy' },
      { label: 'Compatibility', value: 'Standard Laminators & Automatic Stringers' }
    ]
  },
  'multi-busbar': {
    title: 'MULTI BUSBAR PV WIRE',
    tagline: 'Precision micro-wires (0.25mm - 0.40mm) for 9BB to 16BB & SMBB modules',
    desc: 'Designed for high-density 9BB, 10BB, 12BB, and SMBB solar cell interconnects. Our Multi-Busbar PV Wire reduces silver paste consumption on cell busbars while lowering internal series resistance and minimizing micro-crack shading.',
    image: 'assets/images/multi_busbar_wire.jpg',
    specs: [
      { label: 'Wire Diameter', value: '0.22 mm – 0.40 mm (Tolerance ±0.003mm)' },
      { label: 'Yield Stress', value: '65 – 85 MPa' },
      { label: 'Roundness Deviation', value: '< 0.002 mm' },
      { label: 'Plating Uniformity', value: '5 µm – 15 µm Concentric Tin Layer' },
      { label: 'Solderability', value: '< 1.5 seconds Zero-Cross Time' },
      { label: 'Spool Packaging', value: 'DIN160, DIN200, K250 Plastic Reels' }
    ]
  },
  'pv-wire': {
    title: 'PV WIRE',
    tagline: 'High temperature resistant solar interconnect and string lead wire',
    desc: 'Superior tinned copper wire designed for inter-string connections and high current lead-outs. Delivers exceptional corrosion resistance and flexibility for outdoor solar applications.',
    image: 'assets/images/pv_ribbon_product.jpg',
    specs: [
      { label: 'Conductor Material', value: 'Class 5 Flexible Tinned Copper' },
      { label: 'Operating Temp', value: '-40°C to +120°C' },
      { label: 'Conductivity', value: '≥ 99.8% IACS' },
      { label: 'Corrosion Resistance', value: 'Salt-mist tested over 1000 hours' }
    ]
  },
  'pv-busbar': {
    title: 'PV BUSBAR',
    tagline: 'Heavy-duty tinned copper busbar for junction box connections & string leads',
    desc: 'Engineered for high current carrying capacity across solar module strings and junction box leads. Uniform tin plating guarantees robust solder joints and minimal heat generation.',
    image: 'assets/images/reflective_busbar_product.jpg',
    specs: [
      { label: 'Dimensions', value: 'Width 4.0mm – 12.0mm, Thickness 0.2mm – 0.8mm' },
      { label: 'Max Current Capacity', value: 'Up to 35 Amperes' },
      { label: 'Tin Layer', value: '15 µm – 40 µm' },
      { label: 'Edge Finish', value: 'Smooth Rounded Burr-Free Edge' }
    ]
  },
  'ultrathin-busbar': {
    title: 'ULTRATHIN PV BUSBAR',
    tagline: 'Ultra-thin interconnect ribbon for TOPCon, PERC & HJT cell technologies',
    desc: 'Specially developed for ultra-thin glass-glass solar panels and advanced TOPCon/HJT cell architectures. Reduces mechanical stress on wafer substrates to practically zero.',
    image: 'assets/images/multi_busbar_wire.jpg',
    specs: [
      { label: 'Thickness Range', value: '0.06 mm – 0.095 mm (60µm – 95µm)' },
      { label: 'Wafer Stress Relief', value: '98% Micro-crack Reduction' },
      { label: 'Elongation', value: '≥ 30%' },
      { label: 'Special Coating', value: 'Low Melting Point Lead-Free Alloy' }
    ]
  }
};

function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
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
  const viewBtns = document.querySelectorAll('.btn-view-spec');

  if (!modalOverlay || !closeBtn) return;

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const prodKey = btn.getAttribute('data-product');
      const data = productData[prodKey];

      if (data) {
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-tagline').textContent = data.tagline;
        document.getElementById('modal-desc').textContent = data.desc;
        document.getElementById('modal-img').src = data.image;

        const specTableBody = document.getElementById('modal-spec-tbody');
        specTableBody.innerHTML = '';

        data.specs.forEach(s => {
          const tr = document.createElement('tr');
          tr.innerHTML = `<td><strong>${s.label}</strong></td><td>${s.value}</td>`;
          specTableBody.appendChild(tr);
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
   6. Ribbon Resistance Calculator
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
   7. RFQ Form
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
   8. Animated Stat Counters
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
