export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  opts: {
    className?: string;
    text?: string;
    attrs?: Record<string, string>;
    html?: string;
  } = {}
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (opts.className) node.className = opts.className;
  if (opts.text) node.textContent = opts.text;
  if (opts.html) node.innerHTML = opts.html;
  if (opts.attrs) {
    for (const [k, v] of Object.entries(opts.attrs)) node.setAttribute(k, v);
  }
  return node;
}

export function clear(node: Element) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

export function mount(parent: Element, child: Element) {
  parent.appendChild(child);
  return child;
}

export function button(
  label: string,
  onClick: (ev: MouseEvent) => void,
  className = ''
) {
  const b = el('button', { className: `btn ${className}`.trim(), text: label });
  b.addEventListener('click', onClick);
  return b;
}

