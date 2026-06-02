/* =========================================
   CHISCO SOLAR ENTERPRISES – JAVASCRIPT
   ========================================= */

/* ---------- CENTRAL BUSINESS CONFIG ----------
   Edit this single object to rebrand the entire website */
const CONFIG = {
  businessName: 'Chisco Solar Enterprises',
  phone: '08104269327',
  phoneIntl: '+2348104269327',
  whatsapp: '2348104269327',
  address: 'Alaba Rago Rd, Alaba International Market Rd, Ojo, Lagos 102113, Lagos, Nigeria',
  email: 'info@chiscosolar.com',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.703751311951!2d3.284239315371527!3d6.463395895314097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c3a8c6c70b7%3A0x5a6b0b2b3e5c8a1c!2sAlaba%20International%20Market%2C%20Ojo%2C%20Lagos!5e0!3m2!1sen!2sng!4v1620000000000',
  formspreeId: 'FORM_ID' // placeholder for Formspree
};

/* Pre-fill WhatsApp message */
function getWhatsAppMessage(additional = '') {
  return `Hello ${CONFIG.businessName}, I would like a free solar quote. ${additional}`;
}

document.addEventListener('DOMContentLoaded', () => {

  // ---------- MOBILE MENU ----------
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // ---------- NAVBAR SCROLL EFFECT (IntersectionObserver) ----------
  const navbar = document.querySelector('.navbar');
  const sentinel = document.getElementById('scroll-sentinel');
  if (navbar && sentinel) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        navbar.classList.toggle('scrolled', !entry.isIntersecting);
      });
    }, { threshold: 0 });
    observer.observe(sentinel);
  }

  // ---------- SCROLL REVEAL ANIMATIONS ----------
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ---------- SOLAR SAVINGS CALCULATOR ----------
  const calcForm = document.getElementById('calculator-form');
  const calcResult = document.getElementById('calc-result');
  if (calcForm && calcResult) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const monthlyBill = parseFloat(document.getElementById('monthlyBill')?.value) || 0;
      const dailyUsage = parseFloat(document.getElementById('dailyUsage')?.value) || 0;
      if (monthlyBill <= 0 || dailyUsage <= 0) {
        calcResult.innerHTML = '<p style="color:red;">Please enter valid numbers.</p>';
        return;
      }
      // Assumptions: solar can cover 80% of bill, annual savings = monthly * 12 * 0.8
      const monthlySavings = monthlyBill * 0.8;
      const annualSavings = monthlySavings * 12;
      const systemCost = monthlyBill * 12 * 2.5; // rough estimate
      const paybackYears = systemCost / annualSavings;

      calcResult.innerHTML = `
        <div class="glass-card" style="text-align:center; margin-top:2rem;">
          <h3 style="color:var(--green-accent);">Your Estimated Savings</h3>
          <p style="font-size:1.2rem;">Monthly Savings: <strong>₦${monthlySavings.toLocaleString()}</strong></p>
          <p style="font-size:1.2rem;">Annual Savings: <strong>₦${annualSavings.toLocaleString()}</strong></p>
          <p style="font-size:1.2rem;">Estimated System Cost: <strong>₦${systemCost.toLocaleString()}</strong></p>
          <p style="font-size:1.2rem;">Payback Period: <strong>${paybackYears.toFixed(1)} years</strong></p>
          <p style="margin-top:1rem;">Switch to solar and start saving today.</p>
          <a href="https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(getWhatsAppMessage('I want to install solar to save costs.'))}" 
             class="btn btn-primary" target="_blank">Get a Free Quote on WhatsApp</a>
        </div>
      `;
    });
  }

  // ---------- FORM HANDLING (for Quote / Contact forms) ----------
  const ajaxForms = document.querySelectorAll('.ajax-form');
  ajaxForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather form data
      const formData = new FormData(form);
      let message = `Hello ${CONFIG.businessName},\nI would like to request a quote.\n`;
      for (let [key, value] of formData.entries()) {
        message += `${key}: ${value}\n`;
      }

      // Option 1: Send to WhatsApp (recommended for this project)
      const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(waLink, '_blank');

      // Show inline confirmation
      const confirmation = form.nextElementSibling;
      if (confirmation && confirmation.classList.contains('confirmation')) {
        form.style.display = 'none';
        confirmation.classList.add('show');
      } else {
        // fallback if no sibling confirmation
        const confirmDiv = document.getElementById('confirmation-message');
        if (confirmDiv) {
          form.style.display = 'none';
          confirmDiv.classList.add('show');
        }
      }

      // Option 2: If using Formspree, uncomment the fetch block and comment out the WhatsApp part above
      /*
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          form.style.display = 'none';
          document.getElementById('confirmation-message').classList.add('show');
        }
      }).catch(error => {
        alert('Something went wrong. Please try again.');
      });
      */
    });
  });

  // ---------- INJECT STICKY MOBILE CALL BAR ----------
  if (window.innerWidth <= 576) {
    const callBar = document.createElement('div');
    callBar.className = 'mobile-call-bar';
    callBar.innerHTML = `<a href="tel:${CONFIG.phoneIntl}">📞 Call Now: ${CONFIG.phone}</a>`;
    document.body.appendChild(callBar);
  }

  // ---------- ENSURE FLOATING WHATSAPP BUTTON EXISTS ----------
  const floatingBtn = document.querySelector('.floating-wa');
  if (!floatingBtn) {
    const waBtn = document.createElement('a');
    waBtn.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(getWhatsAppMessage())}`;
    waBtn.className = 'floating-wa';
    waBtn.target = '_blank';
    waBtn.innerHTML = '💬'; // Use an icon or emoji
    document.body.appendChild(waBtn);
  }

  // ---------- COPYRIGHT YEAR ----------
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // ---------- BACK TO TOP BUTTON (optional) ----------
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
