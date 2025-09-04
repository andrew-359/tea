import type { Category, Subcategory } from '../../types/catalog';
import { el, clear } from '../../utils/dom';

export function SubcategoryScreen(
  root: HTMLElement,
  category: Category,
  sub: Subcategory
) {
  clear(root);

  const header = el('div', { className: 'page__header' });
  header.appendChild(el('h1', { text: sub.title }));
  if (sub.short) header.appendChild(el('div', { className: 'muted', text: sub.short }));
  root.appendChild(header);

  if (sub.cover || category.cover) {
    const img = el('img', {
      className: 'cover',
      attrs: { src: sub.cover || category.cover || '', alt: '' }
    });
    root.appendChild(img);
  }

  if (sub.description) root.appendChild(el('p', { text: sub.description }));

  // No share/QR for now per requirements.
}
