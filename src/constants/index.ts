// src/constants/index.ts
import type { Benefit, Ingredient, NutritionFact, DosageInfo, Precaution } from '../types/product';

export const BENEFITS: Benefit[] = [
  {
    icon: 'Zap',
    title: 'Maximum Stamina',
    description: 'Helps you stay energized longer, in and out of the bedroom'
  },
  {
    icon: 'Heart',
    title: 'Fast-Acting Design',
    description: 'Formulated for rapid absorption. Many users feel benefits after consumption'
  },
  {
    icon: 'Shield',
    title: 'Enhanced Performance',
    description: 'Supports drive, strength, and confidence'
  },
  {
    icon: 'Leaf',
    title: 'All-Natural Ingredients',
    description: 'Herbal extracts with a long history of traditional use'
  },
  {
    icon: 'Award',
    title: 'Quality Assured',
    description: 'Produced in a GMP-compliant facility and tested for quality'
  }
];

export const INGREDIENTS: Ingredient[] = [
  {
    name: 'Tongkat Ali (Eurycoma Longifolia)',
    description: 'Traditional herbal extract for vitality and endurance',
    image: '🌿'
  },
  {
    name: 'L-Arginine',
    description: 'Amino acid supporting blood flow and performance',
    image: '⚗️'
  },
  {
    name: 'Maca Root',
    description: 'Natural energy and endurance enhancer',
    image: '🌱'
  },
  {
    name: 'Ginseng Extract',
    description: 'Adaptogens for stamina and mental focus',
    image: '🌿'
  },
  {
    name: 'Ginkgo Biloba',
    description: 'Supports circulation and cognitive function',
    image: '🍃'
  },
  {
    name: 'Epimedium (Horny Goat Weed)',
    description: 'Traditional herbal support ingredient',
    image: '🌺'
  }
];

export const NUTRITION_FACTS: NutritionFact[] = [
  { label: 'Serving Size', value: '1 Capsule' },
  { label: 'Servings Per Pack', value: '2 Capsules' },
  { label: 'Calories', value: '0 kcal' },
  { label: 'Total Fat', value: '0g' },
  { label: 'Saturated Fat', value: '0g' },
  { label: 'Trans Fat', value: '0g' },
  { label: 'Cholesterol', value: '0mg' },
  { label: 'Sodium', value: '0mg' },
  { label: 'Total Carbohydrates', value: '0g' },
  { label: 'Dietary Fiber', value: '0g' },
  { label: 'Sugar', value: '0g' },
  { label: 'Total Protein', value: '0g' }
];

export const DOSAGE: DosageInfo = {
  standard: 'Take 1 capsule daily, or as recommended by your physician.',
  performance: 'For performance support, take 1 capsule 30-60 minutes before activity.',
  maxDaily: 'Do not exceed 2 capsules in 24 hours.',
  storage: 'Store in a cool, dry place away from direct sunlight. Keep out of reach of children.'
};

export const PRECAUTIONS: Precaution[] = [
  {
    title: 'Age Requirement',
    description: 'For adult men (18+) only.'
  },
  {
    title: 'Medical Conditions',
    description: 'If you have a medical condition, are taking medications (especially for heart, blood pressure, or hormones), or are planning surgery, consult your doctor before use.'
  },
  {
    title: 'Individual Results',
    description: 'Individual results may vary based on personal health and lifestyle factors.'
  }
];