export type FlavorTag = 'цветочный' | 'фруктовый' | 'медовый' | 'ореховый' | 'землистый';

export interface Subcategory {
  slug: string;
  title: string;
  short?: string;
  description?: string;
  icon?: string; // relative path to icon
  cover?: string; // relative path to cover
  color?: string; // accent color
  tags?: FlavorTag[];
  extras?: Record<string, string | number | boolean>;
}

export interface Category extends Omit<Subcategory, 'slug'> {
  slug: string;
  children?: Subcategory[];
}

export interface CatalogConfig {
  version: string; // cache busting
  categories: Category[];
}
