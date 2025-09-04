import { el } from '../../utils/dom';
import { canGoBack, goBack, goHome, currentRoute } from '../../controller';
import { catalog } from '../../config/catalog';
import { lucide } from '../icons';

export function createAppBar() {
  const root = el('div', { className: 'appbar' });
  const left = el('div', { className: 'appbar__side' });
  const center = el('div', { className: 'appbar__center' });
  const right = el('div', { className: 'appbar__side appbar__side--right' });

  let onToggleFilters: (() => void) | undefined;
  let filtersOpen = false;

  const menuBtn = iconButton('Menu', 'Фильтры', () => {
    onToggleFilters?.();
    setFiltersOpen(!filtersOpen);
  });

  const backBtn = iconButton('ArrowLeft', 'Назад', () => goBack());

  left.appendChild(menuBtn);
  left.appendChild(backBtn);
  const title = el('div', { className: 'appbar__title', text: 'Каталог' });
  center.appendChild(title);

  const logo = document.createElement('img');
  logo.className = 'appbar__logo';
  logo.alt = 'Домой';
  logo.src = '/logo.jpeg';
  logo.title = 'На главную';
  logo.tabIndex = 0;
  logo.setAttribute('role', 'button');
  logo.addEventListener('click', () => goHome());
  logo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goHome();
    }
  });
  right.appendChild(logo);

  root.appendChild(left);
  root.appendChild(center);
  root.appendChild(right);

  function setTitle(text: string) {
    title.textContent = text;
  }

  function updateByRoute() {
    const r = currentRoute();
    if (r.kind === 'home') {
      setTitle('Каталог чая');
      backBtn.style.visibility = 'hidden';
    } else if (r.kind === 'category') {
      const cat = catalog.categories.find((c) => c.slug === r.slug);
      setTitle(cat?.title ?? r.slug);
      backBtn.style.visibility = 'visible';
    } else if (r.kind === 'subcategory') {
      const cat = catalog.categories.find((c) => c.slug === r.slug);
      const sub = cat?.children?.find((s) => s.slug === r.sub);
      setTitle(sub?.title ?? r.sub);
      backBtn.style.visibility = 'visible';
    } else {
      setTitle('');
      backBtn.style.visibility = canGoBack() ? 'visible' : 'hidden';
    }
  }

  updateByRoute();

  // No search UI here now; moved to tagbar
  function refreshChips() {
    /* no-op placeholder for backward compatibility */
  }

  function setFiltersOpen(open: boolean) {
    filtersOpen = open;
    menuBtn.setAttribute('aria-pressed', String(open));
    menuBtn.classList.toggle('icon-btn--active', open);
  }

  function setOnToggleFilters(cb: () => void) {
    onToggleFilters = cb;
  }

  return { root, setTitle, updateByRoute, refreshChips, setOnToggleFilters, setFiltersOpen } as any;
}

function iconButton(name: string, aria: string, onClick: () => void) {
  const btn = el('button', { className: 'icon-btn', attrs: { 'aria-label': aria } });
  const svg = lucide(name as any, { size: 22, strokeWidth: 2, className: 'icon' });
  if (svg) btn.appendChild(svg);
  btn.addEventListener('click', onClick);
  return btn as HTMLButtonElement;
}
