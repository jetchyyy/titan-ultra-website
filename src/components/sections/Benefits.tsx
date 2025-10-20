// src/components/sections/Benefits.tsx
import React from 'react';
import { Zap, Heart, Shield, Leaf, Award } from 'lucide-react';
import Card from '../common/Card';
import { BENEFITS } from '../../constants';

const iconMap = {
  Zap: Zap,
  Heart: Heart,
  Shield: Shield,
  Leaf: Leaf,
  Award: Award
};

const Benefits: React.FC = () => {
  return (
    <section id="why" className="bg-black text-white py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
          Why <span className="text-yellow-400">TITAN</span>
        </h2>
        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">
          <span className="text-red-600">ULTRA?</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, idx) => {
            const Icon = iconMap[benefit.icon as keyof typeof iconMap];
            return (
              <Card key={idx} variant="hover">
                <Icon className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;