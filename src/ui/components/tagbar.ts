import { el } from '../../utils/dom';
import { subscribe, getFilters, toggleTag, setQuery, clearFilters } from '../../store';
import type { FlavorTag } from '../../types/catalog';
import { FLAVOR_TAGS, getTagIcon, getTagColor } from '../../config/tags';
import { lucide } from '../icons';

export function createTagBar() {
  const root = el('div', { className: 'subbar subbar--hidden', attrs: { role: 'toolbar', 'aria-label': 'Поиск и фильтры' } });
  const input = el('input', { className: 'search search--subbar', attrs: { type: 'search', placeholder: 'Поиск…', 'aria-label': 'Поиск' } }) as HTMLInputElement;
  // Debounce input to avoid re-render on each keystroke
  const debounce = <T extends (...args: any[]) => void>(fn: T, ms: number) => {
    let t = 0 as unknown as number;
    return (...args: Parameters<T>) => {
      clearTimeout(t);
      t = window.setTimeout(() => fn(...args), ms);
    };
  };
  const onInput = debounce(() => setQuery(input.value), 250);
  input.addEventListener('input', onInput);
  root.appendChild(input);

  const scroller = el('div', { className: 'subbar__scroll' });
  root.appendChild(scroller);

  const chips: HTMLButtonElement[] = [];
  for (const tag of FLAVOR_TAGS) {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.type = 'button';
    chip.dataset.tag = tag;
    // Apply per-tag color via CSS variable
    chip.style.setProperty('--chip-color', getTagColor(tag));
    chip.style.setProperty('--chip-stroke', 'color-mix(in oklab, var(--chip-color) 35%, transparent)');
    // Icon + label (icon box holds both base icon and check for animation)
    const iconBox = document.createElement('span');
    iconBox.className = 'chip__iconbox';
    const icon = lucide(getTagIcon(tag) as any, { size: 14, strokeWidth: 2 });
    if (icon) {
      // Более яркая иконка слева
      (icon as SVGElement).style.color = 'var(--chip-color)';
      (icon as SVGElement).classList.add('chip__icon');
      iconBox.appendChild(icon);

    }
    const label = document.createElement('span');
    label.textContent = tag;
    // Checkmark indicator (visible when active)
    const check = lucide('Check' as any, { size: 14, strokeWidth: 2 });
    if (check) {
      (check as SVGElement).classList.add('chip__check');
      iconBox.appendChild(check);
    }
    chip.appendChild(iconBox);
    chip.appendChild(label);
    chip.setAttribute('aria-pressed', 'false');
    chip.addEventListener('click', () => {
      toggleTag(tag);
      refresh();
    });
    chips.push(chip);
    scroller.appendChild(chip);
  }

  // Clear all filters button
  const clearBtn = document.createElement('button');
  clearBtn.className = 'chip';
  clearBtn.type = 'button';
  clearBtn.textContent = 'Очистить';
  clearBtn.setAttribute('aria-label', 'Очистить фильтры');
  clearBtn.addEventListener('click', () => {
    clearFilters();
    refresh();
  });
  scroller.appendChild(clearBtn);

  function refresh() {
    const { tags, query } = getFilters();
    input.value = query;
    chips.forEach((c) => {
      const active = tags.includes((c.dataset.tag as FlavorTag) || ('' as FlavorTag));
      c.classList.toggle('chip--active', active);
      c.setAttribute('aria-pressed', String(active));
      // Анимация переключения иконки управляется через CSS по классу .chip--active
    });
  }
  refresh();
  const unsub = subscribe(refresh);
  function show() { root.classList.remove('subbar--hidden'); }
  function hide() { root.classList.add('subbar--hidden'); }
  function toggle() { root.classList.toggle('subbar--hidden'); }
  window.addEventListener('filters:open', () => show());
  return { root, refresh, destroy: unsub, show, hide, toggle } as any;
}
