import { DEEPLINK } from '../config/settings';

export function sanitizeSlug(slug: string): string {
  return slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
}

export function payloadForCategory(categorySlug: string) {
  return `c:${sanitizeSlug(categorySlug)}`;
}

export function payloadForSubcategory(categorySlug: string, subSlug: string) {
  return `s:${sanitizeSlug(categorySlug)}.${sanitizeSlug(subSlug)}`;
}

export function deepLinkForCategory(categorySlug: string) {
  return DEEPLINK(payloadForCategory(categorySlug));
}

export function deepLinkForSub(categorySlug: string, subSlug: string) {
  return DEEPLINK(payloadForSubcategory(categorySlug, subSlug));
}

export function routeFromPayload(payload?: string | null): string | null {
  if (!payload) return null;
  try {
    const decoded = decodeURIComponent(payload);
    if (decoded.startsWith('c:')) {
      const c = decoded.slice(2);
      return `#/c/${sanitizeSlug(c)}`;
    }
    if (decoded.startsWith('s:')) {
      const s = decoded.slice(2);
      const [c, sub] = s.split('.', 2);
      if (c && sub) return `#/c/${sanitizeSlug(c)}/${sanitizeSlug(sub)}`;
    }
  } catch {}
  return null;
}
