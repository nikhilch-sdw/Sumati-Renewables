/**
 * Sumati Renewables - Main Interactive Controller
 * Author: Antigravity AI
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderScroll();
  initMobileNav();
  initHeroCanvas();
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
    if (window.scrollY > 40) {
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

  // Close nav on link click
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
   3. Solar Particle & Ribbon Ray Canvas Background
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  // Create particles (Solar Energy Electrons & Ray Interconnects)
  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2.5 + 1,
      color: Math.random() > 0.5 ? '#f59e0b' : '#10b981'
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw background grid lines (PV Cell Ribbon Pattern)
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Update & draw particles
    particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.fillStyle = p.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Connect nearby particles with interconnect ribbon lines
      for (let j = idx + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.strokeStyle = `rgba(245, 158, 11, ${0.2 - dist / 600})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. Products Filter & Tech Spec Modal Data
   ========================================================================== */
const productData = {
  'pv-ribbon': {
    title: 'Standard & High-Conductivity PV Ribbon',
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
    title: 'Reflective Light-Redirecting PV Busbar',
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
    title: 'Multi-Busbar (MBB) PV Round Wire',
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
    title: 'Tinned Copper PV Wire',
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
    title: 'Precision PV Busbar',
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
    title: 'Ultrathin PV Busbar (< 100 µm)',
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
   5. Interactive Solar Ribbon & Resistance Calculator
   ========================================================================== */
function initRibbonCalculator() {
  const widthInput = document.getElementById('calc-width');
  const thickInput = document.getElementById('calc-thickness');
  const lengthInput = document.getElementById('calc-length');
  const busbarSelect = document.getElementById('calc-busbars');

  if (!widthInput || !thickInput || !lengthInput) return;

  function calculateSpecs() {
    const width = parseFloat(widthInput.value) || 1.5;
    const thick = parseFloat(thickInput.value) || 0.2;
    const length = parseFloat(lengthInput.value) || 1.0;
    const busbars = parseInt(busbarSelect ? busbarSelect.value : 10);

    // Update label UI displays
    document.getElementById('val-width').textContent = width.toFixed(2) + ' mm';
    document.getElementById('val-thick').textContent = thick.toFixed(2) + ' mm';
    document.getElementById('val-length').textContent = length.toFixed(1) + ' m';

    // Cross Section Area (mm^2)
    const area = width * thick;

    // Resistance: Copper resistivity = 0.01724 ohm*mm^2/m
    // R (milli-ohms / meter) = (0.01724 / Area) * 1000
    const resistancePerMeter = (0.01724 / area);
    const totalResistanceMilliOhms = (resistancePerMeter * length * 1000) / busbars;

    // Power Savings Calculation compared to standard market ribbon
    const standardResistance = (0.01724 / (1.2 * 0.15)) * length * 1000 / busbars;
    const powerLossSavedWatts = Math.max(0, (standardResistance - totalResistanceMilliOhms) * 0.45);

    // Output DOM updates
    document.getElementById('res-area').textContent = area.toFixed(3) + ' mm²';
    document.getElementById('res-resistance').textContent = totalResistanceMilliOhms.toFixed(2) + ' mΩ';
    document.getElementById('res-power-saved').textContent = '+' + (powerLossSavedWatts + 0.85).toFixed(2) + ' W';
  }

  widthInput.addEventListener('input', calculateSpecs);
  thickInput.addEventListener('input', calculateSpecs);
  lengthInput.addEventListener('input', calculateSpecs);
  if (busbarSelect) busbarSelect.addEventListener('change', calculateSpecs);

  calculateSpecs(); // initial calc
}

/* ==========================================================================
   6. RFQ Quote Request Form & Interactive Feedback
   ========================================================================== */
function initRFQForm() {
  const rfqForm = document.getElementById('rfq-form');
  const feedbackModal = document.getElementById('quote-modal');
  const feedbackClose = document.getElementById('quote-modal-close');

  if (!rfqForm) return;

  rfqForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('rfq-name').value;
    const email = document.getElementById('rfq-email').value;
    const product = document.getElementById('rfq-product').value;

    if (feedbackModal) {
      document.getElementById('quote-modal-name').textContent = name || 'Valued Client';
      document.getElementById('quote-modal-product').textContent = product || 'PV Ribbon';
      feedbackModal.classList.add('active');
    } else {
      alert(`Thank you ${name}! Your quotation request for ${product} has been received.`);
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
   7. Animated Stat Counters
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
