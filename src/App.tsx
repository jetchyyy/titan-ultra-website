import React, { useRef, useState } from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Benefits from './components/sections/Benefits';
import Ingredients from './components/sections/Ingredients';
import Pricing from './components/sections/Pricing';
import HowToUse from './components/sections/HowToUse';
import Footer from './components/layout/Footer';
import OrderModal from './components/modals/OrderModal';

const App: React.FC = () => {
  const ingredientsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderType, setOrderType] = useState<'retail' | 'distributor'>('retail');

  const handleOrderClick = () => {
    setOrderType('retail');
    setIsOrderModalOpen(true);
  };

  const handleDistributorClick = () => {
    setOrderType('distributor');
    setIsOrderModalOpen(true);
  };

  const handleLearnMore = () => {
    ingredientsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCloseModal = () => {
    setIsOrderModalOpen(false);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header onOrderClick={handleOrderClick} />
      <main className="flex-grow">
        <Hero 
          onOrderClick={handleOrderClick} 
          onLearnMore={handleDistributorClick}
        />
        <Benefits />
        <div ref={ingredientsRef}>
          <Ingredients />
        </div>
        <div ref={pricingRef}>
          <Pricing />
        </div>
        <HowToUse />
      </main>
      <Footer onContactClick={handleOrderClick} />
      
      {/* Order Modal */}
      <OrderModal 
        isOpen={isOrderModalOpen}
        onClose={handleCloseModal}
        orderType={orderType}
      />
    </div>
  );
};

export default App;