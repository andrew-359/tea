import { el } from '../../utils/dom';

export function modal(title: string, content: HTMLElement, onClose: () => void) {
  const backdrop = el('div', { className: 'modal__backdrop' });
  const sheet = el('div', { className: 'modal__sheet' });
  const header = el('div', { className: 'modal__header' });
  const h = el('div', { className: 'modal__title', text: title });
  const close = el('button', { className: 'btn btn--ghost', text: 'Закрыть' });
  close.addEventListener('click', () => {
    document.body.removeChild(backdrop);
    onClose();
  });
  header.appendChild(h);
  header.appendChild(close);
  sheet.appendChild(header);
  sheet.appendChild(content);
  backdrop.appendChild(sheet);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      document.body.removeChild(backdrop);
      onClose();
    }
  });
  document.body.appendChild(backdrop);
  return backdrop;
}

