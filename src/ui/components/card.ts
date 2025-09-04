import { el } from '../../utils/dom';
import { lucide } from '../icons';
import type { FlavorTag } from '../../types/catalog';
import { getTagIcon, getTagColor } from '../../config/tags';
import { toggleTag } from '../../store';

export function card(opts: {
  title: string;
  subtitle?: string;
  icon?: string;
  cover?: string;
  color?: string;
  tags?: string[];
  onClick?: () => void;
  vtName?: string;
}) {
  const root = el('div', { className: 'card', attrs: { role: 'button', tabindex: '0', 'aria-label': opts.title } });
  if (opts.vtName) (root as any).style.viewTransitionName = opts.vtName;

  if (opts.cover) {
    const img = el('img', { className: 'card__cover', attrs: { src: opts.cover, alt: '', loading: 'lazy', decoding: 'async' } });
    root.appendChild(img);
  } else if (opts.icon) {
    const img = el('img', { className: 'card__icon', attrs: { src: opts.icon, alt: '', loading: 'lazy', decoding: 'async' } });
    root.appendChild(img);
  }

  const content = el('div', { className: 'card__content' });
  const title = el('div', { className: 'card__title', text: opts.title });
  content.appendChild(title);
  if (opts.subtitle) content.appendChild(el('div', { className: 'card__subtitle', text: opts.subtitle }));

  if (opts.tags?.length) {
    const row = el('div', { className: 'card__tags' });
    for (const t of opts.tags) {
      row.appendChild(tagBadge(t as FlavorTag));
    }
    content.appendChild(row);
  }

  root.appendChild(content);

  if (opts.color) root.style.setProperty('--card-accent', opts.color);
  if (opts.onClick) {
    root.classList.add('card--clickable');
    root.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      opts.onClick!();
    });
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        opts.onClick!();
      }
    });
  }
  return root;
}

function tagBadge(tag: FlavorTag) {
  const span = document.createElement('span');
  span.className = 'tag tag--icon';
  span.style.setProperty('--tag-color', getTagColor(tag));
  const icon = lucide(getTagIcon(tag) as any, { size: 14, strokeWidth: 2 });
  if (icon) {
    (icon as SVGElement).style.color = getTagColor(tag);
    span.appendChild(icon);
  }
  span.title = tag;
  span.setAttribute('role', 'button');
  span.tabIndex = 0;
  span.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTag(tag);
    window.dispatchEvent(new CustomEvent('filters:open'));
  });
  span.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTag(tag);
      window.dispatchEvent(new CustomEvent('filters:open'));
    }
  });
  return span;
}
