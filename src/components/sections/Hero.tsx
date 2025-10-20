// src/components/sections/Hero.tsx
import React from 'react';
import { ChevronDown } from 'lucide-react';
import Button from '../common/Button';

interface HeroProps {
  onOrderClick?: () => void;
  onLearnMore?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOrderClick, onLearnMore }) => {
  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-4 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full filter blur-3xl opacity-20" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full filter blur-3xl opacity-20" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter">
          <span className="text-yellow-400 block">TITAN</span>
          <span className="text-red-600 block">ULTRA</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
          Maximum Stamina & Enhanced Performance
        </p>
        
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Experience the power of premium, all-natural herbal extracts designed for peak male vitality
        </p>

        {/* Rotating Product Image with Custom Styling */}
        <div className="mb-12 flex justify-center perspective-container">
          <div className="relative w-72 h-96 md:w-96 md:h-[500px]">
            {/* Animated glow rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-full h-full bg-gradient-to-r from-red-600/20 via-yellow-500/20 to-red-600/20 rounded-full filter blur-3xl animate-pulse-glow" />
              <div className="absolute w-4/5 h-4/5 bg-gradient-to-br from-yellow-500/30 to-red-600/30 rounded-full filter blur-2xl animate-pulse-glow-delayed" />
            </div>
            
            {/* 3D Rotating container */}
            <div className="product-showcase relative w-full h-full flex items-center justify-center">
              <div className="rotating-product w-full h-full flex items-center justify-center">
                <img 
                  src="/titan-ultra-productt.png" 
                  alt="Titan Ultra Dietary Supplement Package"
                  className="max-w-full max-h-full object-contain drop-shadow-2xl product-image"
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(220, 38, 38, 0.5)) drop-shadow(0 10px 30px rgba(234, 179, 8, 0.3))'
                  }}
                />
              </div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="particle particle-1" />
              <div className="particle particle-2" />
              <div className="particle particle-3" />
              <div className="particle particle-4" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            variant="primary"
            size="lg"
            onClick={onOrderClick}
          >
            🛒 Order Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onLearnMore}
          >
            💼 Become A Distributor
          </Button>
        </div>

        <div className="flex justify-center animate-bounce">
          <ChevronDown className="w-8 h-8 text-yellow-400" />
        </div>
      </div>

      {/* Custom Animations and Styles */}
      <style>{`
        .perspective-container {
          perspective: 1500px;
        }

        /* 3D Rotation Animation */
        @keyframes rotate3d {
          0% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          25% {
            transform: rotateY(90deg) rotateX(5deg);
          }
          50% {
            transform: rotateY(180deg) rotateX(0deg);
          }
          75% {
            transform: rotateY(270deg) rotateX(-5deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(0deg);
          }
        }

        .rotating-product {
          animation: rotate3d 10s ease-in-out infinite;
          transform-style: preserve-3d;
        }

        /* Smooth scale on hover */
        .product-showcase:hover .rotating-product {
          animation-play-state: paused;
        }

        .product-image {
          transition: transform 0.3s ease;
        }

        .product-showcase:hover .product-image {
          transform: scale(1.05);
        }

        /* Pulsing glow animations */
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-glow-delayed {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1.1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-pulse-glow-delayed {
          animation: pulse-glow-delayed 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }

        /* Floating particles */
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(135deg, #fbbf24, #dc2626);
          border-radius: 50%;
          opacity: 0.6;
          animation: float 4s ease-in-out infinite;
        }

        .particle-1 {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .particle-2 {
          top: 60%;
          right: 15%;
          animation-delay: 1s;
        }

        .particle-3 {
          bottom: 30%;
          left: 20%;
          animation-delay: 2s;
        }

        .particle-4 {
          top: 40%;
          right: 10%;
          animation-delay: 3s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
          50% {
            transform: translateY(-40px) translateX(-5px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-20px) translateX(-10px);
            opacity: 1;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .rotating-product {
            animation: rotate3d 12s ease-in-out infinite;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;