import type { CatalogConfig } from '../../types/catalog';
import { card } from '../components/card';
import { el, clear } from '../../utils/dom';
import type { FlavorTag } from '../../types/catalog';
import { startViewTransition } from '../../utils/transition';

export function HomeScreen(
  root: HTMLElement,
  catalog: CatalogConfig,
  goCategory: (slug: string) => void,
  filter?: { query?: string; tags?: FlavorTag[] }
) {
  clear(root);
  const grid = el('div', { className: 'grid' });
  const q = filter?.query?.trim().toLowerCase();
  const tags = new Set((filter?.tags ?? []).map((t) => t.toLowerCase()));
  const cats = catalog.categories
    .map((cat) => {
      const tagOk =
        tags.size === 0 ||
        (cat.tags ?? []).some((t) => tags.has(t.toLowerCase())) ||
        (cat.children ?? []).some((s) => (s.tags ?? []).some((t) => tags.has(t.toLowerCase())));
      if (!q) return { cat, ok: tagOk, weak: false };
      const titleMatch = cat.title.toLowerCase().includes(q);
      const tagsMatch = (cat.tags ?? []).some((t) => t.toLowerCase().includes(q));
      const shortMatch = (cat.short ?? '').toLowerCase().includes(q);
      const descMatch = (cat.description ?? '').toLowerCase().includes(q);
      const subTitleMatch = (cat.children ?? []).some((s) => s.title.toLowerCase().includes(q));
      const subTagsMatch = (cat.children ?? []).some((s) => (s.tags ?? []).some((t) => t.toLowerCase().includes(q)));
      const subDescMatch = (cat.children ?? []).some((s) => (s.description ?? '').toLowerCase().includes(q));
      const ok = tagOk && (titleMatch || tagsMatch || shortMatch || descMatch || subTitleMatch || subTagsMatch || subDescMatch);
      const strong = titleMatch || tagsMatch || subTitleMatch || subTagsMatch;
      const weak = q ? ok && !strong : false;
      return { cat, ok, weak };
    })
    .filter((r) => r.ok);

  for (const { cat, weak } of cats) {
    const node = card({
      title: cat.title,
      subtitle: cat.short,
      icon: cat.icon,
      cover: cat.cover,
      color: cat.color,
      tags: cat.tags,
      vtName: `cat-${cat.slug}`,
      onClick: () => startViewTransition(() => goCategory(cat.slug))
    });
    if (weak) node.classList.add('is-weak');
    grid.appendChild(node);
  }
  root.appendChild(grid);
  if (cats.length === 0) {
    root.appendChild(el('div', { className: 'muted', text: 'Ничего не найдено' }));
  }
}
