import { el } from '../../utils/dom';

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
    for (const t of opts.tags) row.appendChild(el('span', { className: 'tag', text: t }));
    content.appendChild(row);
  }

  root.appendChild(content);

  if (opts.color) root.style.setProperty('--card-accent', opts.color);
  if (opts.onClick) {
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
