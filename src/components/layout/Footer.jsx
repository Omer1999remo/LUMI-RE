import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-20 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-serif text-2xl mb-6 text-[#1a1a1a]">LUMIÈRE</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Redefining modern elegance through sustainable practices and timeless design.
            </p>
            <div className="flex space-x-4">
              <Instagram className="w-5 h-5 text-gray-400 hover:text-[#c4a484] cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-gray-400 hover:text-[#c4a484] cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-[#c4a484] cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-6 tracking-widest text-sm text-[#1a1a1a]">QUICK LINKS</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                { label: 'New Arrivals', href: '/new-arrivals' },
                { label: 'Collections', href: '/collections' },
                { label: 'Sale', href: '/sale' },
                { label: 'Wishlist', href: '/wishlist' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href} className="hover:text-[#c4a484] transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-6 tracking-widest text-sm text-[#1a1a1a]">CUSTOMER CARE</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              {[
                { label: 'Contact Us', href: '/contact' },
                { label: 'Shipping & Returns', href: '/shipping-returns' },
                { label: 'Size Guide', href: '/size-guide' },
                { label: 'FAQ', href: '/faq' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.href} className="hover:text-[#c4a484] transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-6 tracking-widest text-sm text-[#1a1a1a]">CONTACT</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#c4a484] flex-shrink-0" />
                <span>123 Fashion Avenue<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#c4a484] flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#c4a484] flex-shrink-0" />
                <span>hello@lumiere.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2026 Lumière Fashion. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-[#c4a484] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#c4a484] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
