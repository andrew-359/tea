import { Router } from './router';
import { tg, applyThemeToDocument } from './telegram';
import { catalog } from './config/catalog';
import { HomeScreen } from './ui/screens/home';
import { CategoryScreen } from './ui/screens/category';
import { SubcategoryScreen } from './ui/screens/subcategory';
import { routeFromPayload } from './utils/qr';
import './styles/app.css';
import { createAppBar } from './ui/components/appbar';
import { createTagBar } from './ui/components/tagbar';
import { currentRoute, onRouteChange } from './controller';
import { getFilters, subscribe as subscribeStore } from './store';

const root = document.getElementById('app')!;
const container = document.createElement('div');
container.className = 'container';

// App Bar
const appbar = createAppBar();
const tagbar = createTagBar();
root.appendChild(appbar.root);
root.appendChild(tagbar.root);
root.appendChild(container);

tg.init();
// Apply Telegram theme params to CSS variables and react to changes
applyThemeToDocument(tg.theme());
tg.onThemeChanged(() => applyThemeToDocument(tg.theme()));

// Start on payload route if provided
const payloadRoute = routeFromPayload(tg.startParam());
if (payloadRoute) location.hash = payloadRoute;
if (!location.hash) location.hash = '#/';

const router = new Router();
router.setNotFound(() => {});
router.start();

function renderCurrent() {
  const r = currentRoute();
  const filters = getFilters();
  if (r.kind === 'home') {
    HomeScreen(container, catalog, (slug) => (location.hash = `#/c/${slug}`), filters);
  } else if (r.kind === 'category') {
    const cat = catalog.categories.find((c) => c.slug === r.slug);
    if (!cat) return notFound();
    CategoryScreen(container, cat, (sub) => (location.hash = `#/c/${r.slug}/${sub}`), filters);
  } else if (r.kind === 'subcategory') {
    const cat = catalog.categories.find((c) => c.slug === r.slug);
    const item = cat?.children?.find((s) => s.slug === r.sub);
    if (!cat || !item) return notFound();
    SubcategoryScreen(container, cat, item);
  } else {
    notFound();
  }
}

// Update app bar on navigation and add subtle view animation
onRouteChange(() => {
  appbar.updateByRoute();
  container.classList.remove('view-enter');
  // next frame to retrigger animation
  requestAnimationFrame(() => {
    container.classList.add('view-enter');
  });
  renderCurrent();
});

// Re-render on filter changes
subscribeStore(() => {
  appbar.refreshChips();
  renderCurrent();
});

// Appbar shadow on scroll
window.addEventListener('scroll', () => {
  const s = window.scrollY > 4;
  appbar.root.classList.toggle('appbar--shadow', s);
  tagbar.root.classList.toggle('appbar--shadow', s);
});

// Initial render
renderCurrent();

function notFound() {
  container.innerHTML = '<h1>Не найдено</h1>';
}
