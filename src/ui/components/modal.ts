import { el } from '../../utils/dom';

export function modal(title: string, content: HTMLElement, onClose: () => void) {
  const backdrop = el('div', { className: 'modal__backdrop' });
  const sheet = el('div', { className: 'modal__sheet', attrs: { role: 'dialog', 'aria-modal': 'true' } });
  const header = el('div', { className: 'modal__header' });
  const titleId = `modal-title-${Math.random().toString(36).slice(2)}`;
  const h = el('div', { className: 'modal__title', text: title, attrs: { id: titleId } });
  sheet.setAttribute('aria-labelledby', titleId);
  const close = el('button', { className: 'btn btn--ghost', text: 'Закрыть' });

  const prevActive = document.activeElement as HTMLElement | null;

  function doClose() {
    document.body.removeChild(backdrop);
    document.removeEventListener('keydown', onKeyDown);
    if (prevActive && typeof prevActive.focus === 'function') prevActive.focus();
    onClose();
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      doClose();
    }
  }

  close.addEventListener('click', () => doClose());
  header.appendChild(h);
  header.appendChild(close);
  sheet.appendChild(header);
  sheet.appendChild(content);
  backdrop.appendChild(sheet);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) doClose();
  });
  document.body.appendChild(backdrop);
  document.addEventListener('keydown', onKeyDown);
  // Focus the close button by default for keyboard users
  queueMicrotask(() => close.focus());
  return backdrop;
}
