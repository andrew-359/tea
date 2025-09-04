import type { Category, Subcategory, FlavorTag } from '../../types/catalog';
import { el, clear } from '../../utils/dom';
import { lucide } from '../icons';
import { getTagIcon, getTagColor } from '../../config/tags';
import { toggleTag } from '../../store';

export function SubcategoryScreen(
  root: HTMLElement,
  category: Category,
  sub: Subcategory
) {
  clear(root);

  const header = el('div', { className: 'page__header' });
  const h1 = el('h1', { text: sub.title });
  if (sub.icon) {
    const icon = el('img', { className: 'page__icon', attrs: { src: sub.icon, alt: '' } });
    const row = el('div', { className: 'row', });
    row.appendChild(icon);
    row.appendChild(h1);
    header.appendChild(row);
  } else {
    header.appendChild(h1);
  }
  if (sub.short) header.appendChild(el('div', { className: 'muted', text: sub.short }));
  // Breadcrumbs: Категория · Сорт
  const crumbs = el('div', { className: 'breadcrumbs' });
  crumbs.textContent = `${category.title} · ${sub.title}`;
  header.appendChild(crumbs);
  root.appendChild(header);

  if (sub.cover || category.cover) {
    const img = el('img', {
      className: 'cover',
      attrs: { src: sub.cover || category.cover || '', alt: '' }
    });
    root.appendChild(img);
  }

  if (sub.description) root.appendChild(el('p', { text: sub.description }));

  // Tags with small icons
  if (sub.tags?.length) {
    const wrap = el('div', { className: 'row' });
    for (const t of sub.tags) wrap.appendChild(tagChip(t));
    root.appendChild(wrap);
  }

  // Brewing badges if provided on sub; fallback to category
  const extras = sub.extras ?? category.extras;
  if (extras) {
    const badges = el('div', { className: 'badges' });
    const map: Record<string, string> = {
      temp_c: 'Темп °C',
      grams_per_100ml: 'Г/100мл',
      western_ratio: 'Западн.',
      rinses: 'Промывки',
      first_steep_sec: '1-й пролив',
      steeps: 'Проливов',
      tips: 'Совет'
    };
    for (const [k, v] of Object.entries(extras)) {
      if (!(k in map)) continue;
      const b = el('div', { className: 'badge' });
      const icon = svgForBadge(k);
      if (icon) b.appendChild(icon);
      b.appendChild(el('span', { className: 'badge__label', text: map[k] }));
      b.appendChild(el('span', { className: 'badge__value', text: String(v) }));
      badges.appendChild(b);
    }
    root.appendChild(badges);
  }
}

function tagChip(tag: FlavorTag) {
  const chip = document.createElement('span');
  chip.className = 'tag tag--icon';
  chip.style.setProperty('--tag-color', getTagColor(tag));
  const icon = svgForTag(tag);
  if (icon) {
    (icon as SVGElement).style.color = getTagColor(tag);
    chip.appendChild(icon);
  }
  chip.title = tag;
  chip.setAttribute('role', 'button');
  chip.tabIndex = 0;
  chip.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTag(tag);
    window.dispatchEvent(new CustomEvent('filters:open'));
  });
  chip.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTag(tag);
      window.dispatchEvent(new CustomEvent('filters:open'));
    }
  });
  return chip;
}

function svgForTag(tag: FlavorTag) {
  const name = getTagIcon(tag) as any;
  const svg = lucide(name, { size: 14, strokeWidth: 2 });
  if (svg) svg.style.verticalAlign = '-2px';
  return svg;
}

function svgForBadge(key: string) {
  const map: Record<string, string> = {
    temp_c: 'Thermometer',
    grams_per_100ml: 'Scale',
    western_ratio: 'CupSoda',
    rinses: 'Droplets',
    first_steep_sec: 'Clock',
    steeps: 'Timer',
    tips: 'Lightbulb'
  };
  const name = map[key] as any;
  return lucide(name, { size: 16, strokeWidth: 2 });
}
