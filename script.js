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
