// src/components/layout/Header.tsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onOrderClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOrderClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Why Titan', href: '#why' },
    { label: 'Ingredients', href: '#ingredients' },
    { label: 'How to Use', href: '#usage' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-red-600 rounded-lg flex items-center justify-center font-bold text-black text-sm">
              TU
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-yellow-400">TITAN</span>
              <span className="text-xs font-semibold text-red-600">ULTRA</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-yellow-400 transition duration-300 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <button
            onClick={onOrderClick}
            className="hidden md:block bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition duration-300 text-sm"
          >
            Order Now
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-3 border-t border-gray-700 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block hover:text-yellow-400 transition duration-300 text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                onOrderClick?.();
                setIsMenuOpen(false);
              }}
              className="w-full bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition duration-300 text-sm mt-4"
            >
              Order Now
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;