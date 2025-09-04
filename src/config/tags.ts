import type { FlavorTag } from '../types/catalog';

// Per-tag config: icon name + color
export const TAGS_CONFIG: Record<FlavorTag, { icon: string; color: string }> = {
  'цветочный': { icon: 'Flower', color: '#D16BA5' },   // floral pink
  'фруктовый': { icon: 'Apple', color: '#FF7F50' },    // coral
  // В lucide этой версии нет Bee — используем Hexagon как намёк на соты
  'медовый': { icon: 'Hexagon', color: '#DDAF3B' },    // honey gold
  'ореховый': { icon: 'Nut', color: '#B77D4F' },       // nut brown
  'землистый': { icon: 'Sprout', color: '#6B8E23' }    // olive green
};

export const FLAVOR_TAGS: FlavorTag[] = Object.keys(TAGS_CONFIG) as FlavorTag[];

export function getTagIcon(tag: FlavorTag): string {
  return TAGS_CONFIG[tag].icon;
}

export function getTagColor(tag: FlavorTag): string {
  return TAGS_CONFIG[tag].color;
}
