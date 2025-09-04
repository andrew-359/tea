import type { Category } from '../../types/catalog';
import { card } from '../components/card';
import { el, clear } from '../../utils/dom';

export interface FilterOpts {
  query?: string;
  tags?: string[];
}

function textMatch(text: string | undefined, q: string) {
  if (!text) return false;
  return text.toLowerCase().includes(q);
}

export function CategoryScreen(
  root: HTMLElement,
  category: Category,
  goSub: (sub: string) => void,
  filter?: FilterOpts
) {
  clear(root);
  const header = el('div', { className: 'page__header' });
  (header as any).style.viewTransitionName = `cat-${category.slug}`;
  header.appendChild(el('h1', { text: category.title }));
  if (category.short) header.appendChild(el('div', { className: 'muted', text: category.short }));
  // Brewing badges
  if (category.extras) {
    const badges = el('div', { className: 'badges' });
    const map: Record<string, string> = {
      temp_c: 'Темп °C',
      grams_per_100ml: 'Г/100мл',
      western_ratio: 'Западн.',
      rinses: 'Промывки',
      first_steep_sec: '1-й пролив',
      steeps: 'Проливов'
    };
    for (const [k, v] of Object.entries(category.extras)) {
      if (!(k in map)) continue;
      const b = el('div', { className: 'badge' });
      b.appendChild(el('span', { className: 'badge__label', text: map[k] }));
      b.appendChild(el('span', { className: 'badge__value', text: String(v) }));
      badges.appendChild(b);
    }
    header.appendChild(badges);
  }
  root.appendChild(header);

  const list = el('div', { className: 'list' });
  const q = filter?.query?.trim().toLowerCase();
  const tags = new Set((filter?.tags ?? []).map((t) => t.toLowerCase()));
  const items = (category.children ?? [])
    .map((sub) => {
      const tagOk = tags.size === 0 || (sub.tags ?? []).some((t) => tags.has(t.toLowerCase()));
      if (!q) return { sub, ok: tagOk, weak: false };
      const titleMatch = textMatch(sub.title, q!);
      const tagsMatch = (sub.tags ?? []).some((t) => t.toLowerCase().includes(q!));
      const shortMatch = textMatch(sub.short, q!);
      const descMatch = textMatch(sub.description, q!);
      const ok = tagOk && (titleMatch || tagsMatch || shortMatch || descMatch);
      const strong = titleMatch || tagsMatch;
      const weak = q ? ok && !strong : false;
      return { sub, ok, weak };
    })
    .filter((r) => r.ok);
  for (const { sub, weak } of items) {
    list.appendChild(
      (() => {
        const node = card({
          title: sub.title,
          subtitle: sub.short,
          icon: sub.icon ?? category.icon,
          color: sub.color ?? category.color,
          onClick: () => goSub(sub.slug)
        });
        if (weak) node.classList.add('is-weak');
        return node;
      })()
    );
  }
  root.appendChild(list);
  if (items.length === 0) root.appendChild(el('div', { className: 'muted', text: 'Ничего не найдено' }));
}
