// Lucide icon helper for vanilla TS (ESM import)
// We import the `icons` map and build an inline SVG at runtime.
import { icons } from 'lucide';

export type IconName = keyof typeof icons & string;

function toPascalCase(s: string): string {
  return s
    .split(/[^a-zA-Z0-9]+/g)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

export function lucide(
  name: IconName,
  opts: { size?: number; strokeWidth?: number; className?: string } = {}
) {
  const { size = 22, strokeWidth = 2, className } = opts;

  type IconNode = Array<[string, Record<string, string | number>]>;
  const lib = icons as Record<string, IconNode>;

  let node = lib[name] as IconNode | undefined;
  if (!node) node = lib[toPascalCase(String(name))] as IconNode | undefined;
  if (!node) return null;

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', String(strokeWidth));
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  if (className) svg.setAttribute('class', className);

  for (const [tag, attrs] of node) {
    const el = document.createElementNS(svgNS, tag);
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, String(v));
    }
    svg.appendChild(el);
  }

  return svg;
}
