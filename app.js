// ==========================================================================
// Club Lo Arcaya - Multi-Sport Interactive JS Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar Glassmorphism effect on scroll
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Hero Multi-Branch Visual Slider
  const slides = document.querySelectorAll('.slide-item');
  const sliderCaptionTitle = document.getElementById('sliderCaptionTitle');
  const sliderCaptionSub = document.getElementById('sliderCaptionSub');
  let currentSlide = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');

      const title = slides[currentSlide].getAttribute('data-caption');
      const sub = slides[currentSlide].getAttribute('data-sub');

      if (sliderCaptionTitle) sliderCaptionTitle.textContent = title;
      if (sliderCaptionSub) sliderCaptionSub.textContent = sub;
    }, 3500);
  }

  // 3. VIP Lead Form Submission
  const vipForm = document.getElementById('vipForm');
  const vipModal = document.getElementById('vipModal');
  const modalNombreUser = document.getElementById('modalNombreUser');
  const modalWspUser = document.getElementById('modalWspUser');
  const modalVipCode = document.getElementById('modalVipCode');
  const modalDisciplinaUser = document.getElementById('modalDisciplinaUser');

  if (vipForm) {
    vipForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value.trim();
      const whatsapp = document.getElementById('whatsapp').value.trim();
      const nivel = document.getElementById('nivel').value;
      const disciplina = document.getElementById('disciplina').value;

      if (!nombre || !whatsapp || !nivel || !disciplina) {
        alert('Por favor completa todos los campos para asegurar tu beneficio VIP.');
        return;
      }

      // Generate unique VIP Code
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const vipCode = `CLUB-ARCAYA-${randomId}`;

      // Save lead locally
      const leadData = {
        nombre,
        whatsapp,
        nivel,
        disciplina,
        vipCode,
        fecha: new Date().toISOString()
      };

      const existingLeads = JSON.parse(localStorage.getItem('arcaya_leads') || '[]');
      existingLeads.push(leadData);
      localStorage.setItem('arcaya_leads', JSON.stringify(existingLeads));

      // Update Modal DOM
      if (modalNombreUser) modalNombreUser.textContent = nombre;
      if (modalWspUser) modalWspUser.textContent = whatsapp;
      if (modalVipCode) modalVipCode.textContent = vipCode;
      if (modalDisciplinaUser) modalDisciplinaUser.textContent = disciplina;

      // Show Modal
      if (vipModal) vipModal.classList.add('active');

      // Reset Form
      vipForm.reset();
    });
  }
});

// Close Modal Function
function closeModal() {
  const vipModal = document.getElementById('vipModal');
  if (vipModal) {
    vipModal.classList.remove('active');
  }
}
