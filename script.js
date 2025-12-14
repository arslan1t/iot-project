// Simple enhancements: smooth anchors, fake form submit, fade-in on scroll
(function(){
  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // fake form
  const btn = document.getElementById('sendBtn');
  const status = document.getElementById('formStatus');
  if(btn && status){
    btn.addEventListener('click', ()=>{
      status.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
      setTimeout(()=> status.textContent = '', 4000);
    });
  }

  // fade-in on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('in');
    });
  }, {threshold: 0.15});
  document.querySelectorAll('.card, .perf-card, .stat, .section-title, .hero-text, .hero-media').forEach(el=>{
    el.classList.add('fade');
    observer.observe(el);
  });
})();

const hotspots = document.querySelectorAll('.hotspot');
const descriptions = document.querySelectorAll('.desc');

function activate(id) {
  hotspots.forEach(h => h.classList.toggle('active', h.dataset.id === id));
  descriptions.forEach(d => d.classList.toggle('active', d.dataset.id === id));
}

hotspots.forEach(h => {
  h.addEventListener('mouseenter', () => activate(h.dataset.id));
});

descriptions.forEach(d => {
  d.addEventListener('mouseenter', () => activate(d.dataset.id));
});
// === SIMPLE IMAGE SLIDER ===

const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".slider-btn.right");
const prevBtn = document.querySelector(".slider-btn.left");

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

// Swipe support (touch / trackpad)
let startX = 0;

document.querySelector(".slider").addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

document.querySelector(".slider").addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextBtn.click();
  if (endX - startX > 50) prevBtn.click();
});
function toggleFusionMap() {
  const map = document.getElementById("fusion-map");
  map.classList.toggle("hidden");
}
