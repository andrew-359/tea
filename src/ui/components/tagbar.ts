import { el } from '../../utils/dom';
import { subscribe, getFilters, toggleTag, setQuery, clearFilters } from '../../store';
import type { FlavorTag } from '../../types/catalog';
import { FLAVOR_TAGS } from '../../config/tags';

export function createTagBar() {
  const root = el('div', { className: 'subbar', attrs: { role: 'toolbar', 'aria-label': 'Поиск и фильтры' } });
  const scroller = el('div', { className: 'subbar__scroll' });
  root.appendChild(scroller);

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
  scroller.appendChild(input);

  const chips: HTMLButtonElement[] = [];
  for (const tag of FLAVOR_TAGS) {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.type = 'button';
    chip.textContent = tag;
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
      const active = tags.includes(c.textContent as FlavorTag);
      c.classList.toggle('chip--active', active);
      c.setAttribute('aria-pressed', String(active));
    });
  }
  refresh();
  const unsub = subscribe(refresh);
  return { root, refresh, destroy: unsub };
}
