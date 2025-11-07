// src/components/sections/Pricing.tsx
import React, { useState } from 'react';
import { Package, Check, ShoppingCart } from 'lucide-react';
import OrderModal from '../modals/OrderModal';

interface PricingTier {
  title: string;
  subtitle: string;
  price: number;
  unit: string;
  features: string[];
  icon: 'package';
}

interface PricingProps {
  onOrderClick?: (type: 'retail' | 'distributor') => void;
}

const Pricing: React.FC<PricingProps> = ({ }) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const pricingTier: PricingTier = {
    title: 'Per Piece',
    subtitle: 'Perfect for personal use',
    price: 100,
    unit: 'per pack (2 capsules)',
    features: [
      '2 Capsules per pack',
      'Premium herbal extracts',
      'Fast-acting formula',
      'Quality assured',
      'Ready to use'
    ],
    icon: 'package'
  };

  const handleOrderButtonClick = () => {
    setIsOrderModalOpen(true);
  };

  return (
    <section id="pricing" className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-24 px-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-yellow-500/5 rounded-full filter blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-yellow-400">Pricing</span> & <span className="text-red-600">Orders</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the option that fits your needs - from personal use to business opportunities
          </p>
        </div>

        {/* Product Image Showcase */}
        <div className="flex justify-center mb-16">
          <div className="relative w-64 h-80 md:w-80 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-yellow-500/20 rounded-full filter blur-2xl animate-pulse" />
            <img 
              src="/titan-ultra-productt.png" 
              alt="Titan Ultra Product"
              className="relative w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto">
          <div className="relative rounded-2xl p-8 bg-gradient-to-br from-red-600 to-red-700 shadow-2xl shadow-red-600/50">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/20">
                <Package className="w-8 h-8" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold text-center mb-2">{pricingTier.title}</h3>
            <p className="text-center text-sm opacity-90 mb-6">{pricingTier.subtitle}</p>

            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-black text-yellow-400">₱{pricingTier.price}</span>
                <span className="text-lg opacity-75">/ {pricingTier.unit}</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {pricingTier.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button
              onClick={handleOrderButtonClick}
              className="w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 bg-yellow-400 text-black hover:bg-yellow-300 shadow-lg shadow-yellow-400/50"
            >
              <ShoppingCart className="w-5 h-5" />
              Order Now
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-yellow-400/30 rounded-xl p-6">
            <h4 className="text-xl font-bold mb-3 text-yellow-400">💼 Interested in Becoming a Distributor?</h4>
            <p className="text-gray-300 mb-4">
              Join our growing network of distributors and enjoy exclusive benefits, competitive pricing, 
              and marketing support. Build your business with Titan Ultra!
            </p>
            <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              Contact Us for Distributor Pricing
            </button>
          </div>
        </div>

        {/* Payment & Shipping Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-3xl mb-2">🚚</div>
            <h5 className="font-semibold mb-2">Fast Delivery</h5>
            <p className="text-sm text-gray-400">Ships within 1-2 business days</p>
          </div>
          <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-3xl mb-2">💳</div>
            <h5 className="font-semibold mb-2">Secure Payment</h5>
            <p className="text-sm text-gray-400">Multiple payment options available</p>
          </div>
          <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700">
            <div className="text-3xl mb-2">✅</div>
            <h5 className="font-semibold mb-2">Quality Guaranteed</h5>
            <p className="text-sm text-gray-400">100% authentic products</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        orderType="retail"
      />
    </section>
  );
};

export default Pricing;