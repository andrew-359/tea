import { tg } from './telegram';

export type Route =
  | { kind: 'home' }
  | { kind: 'category'; slug: string }
  | { kind: 'subcategory'; slug: string; sub: string }
  | { kind: 'unknown' };

// Basic navigation helpers (no Router instance needed)
export function goHome() {
  location.hash = '#/';
}

export function goCategory(slug: string) {
  location.hash = `#/c/${slug}`;
}

export function goSubcategory(slug: string, sub: string) {
  location.hash = `#/c/${slug}/${sub}`;
}

export function goBack() {
  if (atRoot()) return; // do not exit the app
  history.back();
}

export function goForward() {
  history.forward();
}

export function atRoot(): boolean {
  return normalizeHash(location.hash) === '#/';
}

export function canGoBack(): boolean {
  // Heuristic: not at root or there is actual history depth
  return !atRoot() || history.length > 1;
}

export function currentRoute(): Route {
  const h = normalizeHash(location.hash);
  if (h === '#/') return { kind: 'home' };
  const m1 = /^#\/c\/([A-Za-z0-9-]+)$/.exec(h);
  if (m1) return { kind: 'category', slug: m1[1] };
  const m2 = /^#\/c\/([A-Za-z0-9-]+)\/([A-Za-z0-9-]+)$/.exec(h);
  if (m2) return { kind: 'subcategory', slug: m2[1], sub: m2[2] };
  return { kind: 'unknown' };
}

function normalizeHash(h: string): string {
  return h || '#/';
}

type RouteListener = (route: Route) => void;
const listeners = new Set<RouteListener>();
let started = false;

export function onRouteChange(cb: RouteListener) {
  listeners.add(cb);
  if (!started) startRouteWatcher();
  return () => listeners.delete(cb);
}

function startRouteWatcher() {
  started = true;
  window.addEventListener('hashchange', () => emit());
  // emit initial
  queueMicrotask(() => emit());
}

function emit() {
  const r = currentRoute();
  for (const cb of listeners) cb(r);
}

// Optional: integrate Telegram BackButton control
export function integrateTelegramBackButton() {
  const w = tg.webapp;
  if (!w) return;
  // Click → go back
  w.BackButton.onClick(() => goBack());
  const update = () => {
    if (atRoot()) w.BackButton.hide();
    else w.BackButton.show();
  };
  onRouteChange(update);
  update();
}
