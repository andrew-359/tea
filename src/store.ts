import type { FlavorTag } from './types/catalog';

type Listener = () => void;

const state = {
  query: '' as string,
  tags: [] as FlavorTag[]
};

const listeners = new Set<Listener>();

export function setQuery(q: string) {
  state.query = q;
  emit();
}

export function toggleTag(tag: FlavorTag) {
  if (state.tags.includes(tag)) state.tags = state.tags.filter((t) => t !== tag);
  else state.tags = [...state.tags, tag];
  emit();
}

export function clearFilters() {
  state.query = '';
  state.tags = [];
  emit();
}

export function getFilters() {
  return { query: state.query, tags: state.tags };
}

export function subscribe(fn: Listener) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit() {
  for (const fn of listeners) fn();
}
