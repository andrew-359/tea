// Simple IntersectionObserver-based reveal-on-enter utility
// Adds a subtle fade+translate animation when elements enter viewport.

type Revealer = {
  scan: (container?: Element | Document) => void;
};

export function setupReveal(): Revealer {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          // Ensure transition runs: add .reveal first, then .is-in on next frame
          const t = e.target as Element;
          if (!t.classList.contains('reveal')) t.classList.add('reveal');
          requestAnimationFrame(() => {
            requestAnimationFrame(() => t.classList.add('is-in'));
          });
          observer.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.01 }
  );

  const mark = (el: Element) => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    observer.observe(el);
  };

  const selector = [
    '.card',
    '.tag',
    '.chip',
    '.badge',
    '.cover',
    '.breadcrumbs',
    '.page__header > *',
    '.row > *'
  ].join(',');

  const scan = (container: Element | Document = document) => {
    container.querySelectorAll(selector).forEach(mark);
  };

  // Initial scan
  scan(document);

  return { scan };
}
