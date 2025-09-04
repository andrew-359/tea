import { el } from '../../utils/dom';
import { canGoBack, goBack, goHome, currentRoute } from '../../controller';
import { getFilters } from '../../store';

export function createAppBar() {
  const root = el('div', { className: 'appbar' });
  const left = el('div', { className: 'appbar__side' });
  const center = el('div', { className: 'appbar__center' });
  const right = el('div', { className: 'appbar__side appbar__side--right' });

  const backBtn = iconButton('M12 19 5 12 12 5', 'Назад', () => goBack());
  const homeBtn = iconButton('M3 11l9-8 9 8v10H3z', 'Домой', () => goHome());

  left.appendChild(backBtn);
  left.appendChild(homeBtn);
  const title = el('div', { className: 'appbar__title', text: 'Каталог' });
  center.appendChild(title);

  root.appendChild(left);
  root.appendChild(center);
  root.appendChild(right);

  function setTitle(text: string) {
    title.textContent = text;
  }

  function updateByRoute() {
    const r = currentRoute();
    if (r.kind === 'home') setTitle('Каталог чая');
    else if (r.kind === 'category') setTitle(r.slug);
    else if (r.kind === 'subcategory') setTitle(r.sub);
    else setTitle('');
    backBtn.style.visibility = canGoBack() ? 'visible' : 'hidden';
  }

  updateByRoute();

  // No search UI here now; moved to tagbar
  function refreshChips() {
    /* no-op placeholder for backward compatibility */
  }

  return { root, setTitle, updateByRoute, refreshChips } as any;
}

function iconButton(pathD: string, aria: string, onClick: () => void) {
  const btn = el('button', { className: 'icon-btn', attrs: { 'aria-label': aria } });
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.classList.add('icon');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathD);
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', 'currentColor');
  path.setAttribute('stroke-width', '2');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(path);
  btn.appendChild(svg);
  btn.addEventListener('click', onClick);
  return btn as HTMLButtonElement;
}
