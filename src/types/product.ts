// src/types/product.ts
export interface Benefit {
  icon: 'Zap' | 'Heart' | 'Shield' | 'Leaf' | 'Award' | 'Activity';
  title: string;
  description: string;
}

export interface Ingredient {
  name: string;
  description: string;
  image: string;
}

export interface NutritionFact {
  label: string;
  value: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface DosageInfo {
  standard: string;
  performance: string;
  maxDaily: string;
  storage: string;
}

export interface Precaution {
  title: string;
  description: string;
}