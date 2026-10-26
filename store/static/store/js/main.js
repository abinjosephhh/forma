(() => {
  const slides = [...document.querySelectorAll(".hero-image")];
  const dots = [...document.querySelectorAll(".dot")];
  const title = document.getElementById("product-title");
  const category = document.getElementById("product-category");
  const scenes = [
    {title: "Luxe Sofa", category: "Radical Form Series"},
    {title: "Modern armchair", category: "Minimalist Collection"},
    {title: "Quiet Luxury", category: "The Living Edit"},
    {title: "Natural Living", category: "Timeless Interiors"}
  ];
  let current = 0;
  function showScene(index) {
    current = index;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
      if (i === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    if (title && category) {
      title.textContent = scenes[index].title;
      category.textContent = scenes[index].category;
      title.classList.remove("scene-title-in");
      void title.offsetWidth;
      title.classList.add("scene-title-in");
    }
  }
  dots.forEach((dot, i) => dot.addEventListener("click", () => showScene(i)));
  window.setInterval(() => showScene((current + 1) % slides.length), 6500);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .12});
  document.querySelectorAll(".product-card,.category-grid a,.blog-grid article,.stats>div").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = "opacity .7s ease, transform .7s ease";
    observer.observe(el);
  });
  const style = document.createElement("style");
  style.textContent = ".in-view{opacity:1!important;transform:translateY(0)!important}";
  document.head.appendChild(style);
})();
// Persistent iOS-style light/dark mode switch.
(() => {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  const applyTheme = (dark) => {
    document.body.classList.toggle('dark-mode', dark);
    toggle.setAttribute('aria-checked', dark ? 'true' : 'false');
    toggle.setAttribute('aria-label', dark ? 'Dark mode on; switch to light mode' : 'Dark mode off; switch to dark mode');
    toggle.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
  };
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('forma-theme'); } catch (e) {}
  applyTheme(savedTheme === 'dark');
  toggle.addEventListener('click', () => {
    const dark = !document.body.classList.contains('dark-mode');
    applyTheme(dark);
    try { localStorage.setItem('forma-theme', dark ? 'dark' : 'light'); } catch (e) {}
  });
})();

// Front-end product filtering keeps search useful even when using the starter demo data.
(() => {
  const params = new URLSearchParams(window.location.search);
  const query = (params.get('q') || '').trim().toLowerCase();
  const cards = [...document.querySelectorAll('#product-grid .product-card')];
  const noResults = document.getElementById('no-results');
  if (!query || !cards.length) return;
  let visibleCount = 0;
  cards.forEach(card => {
    const searchable = ((card.dataset.search || '') + ' ' + card.textContent).toLowerCase();
    const match = query.split(/\s+/).every(term => searchable.includes(term));
    card.hidden = !match;
    if (match) visibleCount++;
  });
  if (noResults) noResults.hidden = visibleCount !== 0;
})();
