// src/components/layout/Footer.tsx
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  onContactClick?: () => void;
}

const Footer: React.FC<FooterProps> = ({ }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Why Titan', href: '#why' },
    { label: 'Ingredients', href: '#ingredients' },
    { label: 'How to Use', href: '#usage' },
    { label: 'Contact', href: '#contact' }
  ];

  const contactInfo = [
    { icon: Phone, label: '+1 (800) 123-4567', href: 'tel:+18001234567' },
    { icon: Mail, label: 'support@titanultra.com', href: 'mailto:support@titanultra.com' },
    { icon: MapPin, label: 'New York, USA', href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' }
  ];

  return (
    <footer className="bg-black text-white border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-red-600 rounded-lg flex items-center justify-center font-bold text-black text-sm">
                TU
              </div>
              <div>
                <div className="text-sm font-semibold text-yellow-400">TITAN</div>
                <div className="text-sm font-semibold text-red-600">ULTRA</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium male performance supplement with all-natural herbal extracts
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <nav className="space-y-5">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-yellow-400 transition text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact</h4>
            <div className="space-y-3">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 transition text-sm"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{info.label}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center hover:bg-red-600 transition duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Bottom Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-yellow-400">Disclaimer:</span> These statements have not been evaluated. This product is not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} Titan Ultra. All rights reserved. | 
              <a href="#" className="hover:text-yellow-400 transition ml-2">Privacy Policy</a> | 
              <a href="#" className="hover:text-yellow-400 transition ml-2">Terms of Service</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;