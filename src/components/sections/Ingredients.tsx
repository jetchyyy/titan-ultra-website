// src/components/sections/Ingredients.tsx
import React from 'react';
import Card from '../common/Card';
import { INGREDIENTS } from '../../constants';

const Ingredients: React.FC = () => {
  return (
    <section id="ingredients" className="bg-gray-900 text-white py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
          Premium <span className="text-yellow-400">Ingredients</span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Each ingredient is carefully selected for its traditional use and proven effectiveness
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INGREDIENTS.map((ingredient, idx) => (
            <Card key={idx} variant="elevated">
              <div className="text-4xl mb-4">{ingredient.image}</div>
              <h3 className="text-lg font-bold mb-2 text-yellow-400">{ingredient.name}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{ingredient.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-red-600/20 to-yellow-500/20 border border-red-600/30 rounded-lg p-8 text-center">
          <p className="text-lg text-gray-300">
            All ingredients are natural herbal extracts with a long history of traditional use
          </p>
        </div>
      </div>
    </section>
  );
};

export default Ingredients;