// src/components/sections/HowToUse.tsx
import React from 'react';
import { AlertCircle, Clock, Droplet, Package } from 'lucide-react';
import Card from '../common/Card';
import { DOSAGE, PRECAUTIONS } from '../../constants';

const HowToUse: React.FC = () => {
  const usageSteps = [
    {
      icon: Droplet,
      title: 'Standard Usage',
      description: DOSAGE.standard
    },
    {
      icon: Clock,
      title: 'For Performance',
      description: DOSAGE.performance
    },
    {
      icon: AlertCircle,
      title: 'Maximum Daily',
      description: DOSAGE.maxDaily
    },
    {
      icon: Package,
      title: 'Storage',
      description: DOSAGE.storage
    }
  ];

  return (
    <section id="usage" className="bg-gray-900 text-white py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
          How to <span className="text-yellow-400">Use</span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Follow these guidelines to maximize the benefits of Titan Ultra
        </p>

        {/* Usage Steps */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {usageSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Card key={idx} variant="elevated">
                <div className="flex items-start gap-4">
                  <Icon className="w-8 h-8 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Precautions */}
        <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 border-2 border-red-600/50 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-red-500" />
            Precautions
          </h3>
          
          <div className="space-y-6">
            {PRECAUTIONS.map((precaution, idx) => (
              <div key={idx} className="border-l-4 border-yellow-400 pl-4">
                <h4 className="font-bold text-yellow-400 mb-2">{precaution.title}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{precaution.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Warning */}
        <div className="mt-8 bg-black border-2 border-yellow-400 rounded-lg p-6 text-center">
          <p className="font-bold text-yellow-400">For adult men (18+) only</p>
          <p className="text-gray-400 text-sm mt-2">Keep out of reach of children</p>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;