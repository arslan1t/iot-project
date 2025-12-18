// Simple enhancements: smooth anchors, demo form submit, fade-in on scroll,
// interactive component map, and a small image slider.
(function () {
  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href) return;

      const id = href.slice(1);
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      event.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Demo contact form (no backend)
  const btn = document.getElementById("sendBtn");
  const status = document.getElementById("formStatus");
  let statusTimer = null;
  if (btn && status) {
    btn.addEventListener("click", () => {
      status.textContent = "Thanks! Message sent (demo).";
      if (statusTimer) clearTimeout(statusTimer);
      statusTimer = setTimeout(() => {
        status.textContent = "";
        statusTimer = null;
      }, 4000);
    });
  }

  // Fade-in on scroll
  const targets = document.querySelectorAll(
    ".card, .perf-card, .stat, .section-title, .hero-text, .hero-media",
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      },
      { threshold: 0.15 },
    );

    targets.forEach((el) => {
      el.classList.add("fade");
      observer.observe(el);
    });
  } else {
    targets.forEach((el) => el.classList.add("in"));
  }

  // Interactive component map (hotspots)
  const hotspots = Array.from(document.querySelectorAll(".hotspot"));
  const descriptions = Array.from(document.querySelectorAll(".desc"));

  if (hotspots.length && descriptions.length) {
    const activate = (id) => {
      if (!id) return;
      hotspots.forEach((h) =>
        h.classList.toggle("active", h.dataset.id === id),
      );
      descriptions.forEach((d) =>
        d.classList.toggle("active", d.dataset.id === id),
      );
    };

    const bindActivate = (el, id) => {
      if (!id) return;
      el.addEventListener("mouseenter", () => activate(id));
      el.addEventListener("focus", () => activate(id));
      el.addEventListener("click", () => activate(id));
    };

    hotspots.forEach((h) => bindActivate(h, h.dataset.id));
    descriptions.forEach((d) => bindActivate(d, d.dataset.id));
  }

  // Simple image slider
  const slider = document.querySelector(".slider");
  const slides = slider ? Array.from(slider.querySelectorAll(".slide")) : [];
  const nextBtn = document.querySelector(".slider-btn.right");
  const prevBtn = document.querySelector(".slider-btn.left");

  if (slider && slides.length && nextBtn && prevBtn) {
    let currentSlide = slides.findIndex((s) => s.classList.contains("active"));
    if (currentSlide < 0) currentSlide = 0;

    const showSlide = (index) => {
      const safeIndex = ((index % slides.length) + slides.length) % slides.length;
      slides.forEach((slide) => slide.classList.remove("active"));
      slides[safeIndex].classList.add("active");
      currentSlide = safeIndex;
    };

    nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
    prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));

    // Swipe support (touch / trackpad)
    let startX = 0;

    slider.addEventListener(
      "touchstart",
      (e) => {
        if (!e.touches || !e.touches.length) return;
        startX = e.touches[0].clientX;
      },
      { passive: true },
    );

    slider.addEventListener("touchend", (e) => {
      if (!e.changedTouches || !e.changedTouches.length) return;
      const endX = e.changedTouches[0].clientX;
      const delta = startX - endX;
      if (Math.abs(delta) < 50) return;
      if (delta > 0) nextBtn.click();
      else prevBtn.click();
    });
  }
})();

window.toggleFusionMap = function toggleFusionMap() {
  const map = document.getElementById("fusion-map");
  if (!map) return;
  map.classList.toggle("hidden");
};
