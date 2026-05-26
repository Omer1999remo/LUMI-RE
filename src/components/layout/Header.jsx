import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, Heart, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';

const NAV_LINKS = [
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Collections', href: '/collections' },
  { label: 'Women', href: '/women' },
  { label: 'Men', href: '/men' },
  { label: 'Accessories', href: '/accessories' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, setCartOpen, setSearchOpen, wishlist, user } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Determine if we're on a transparent-hero page
  const isHeroPage = window.location.pathname === '/';
  const transparent = isHeroPage && !scrolled;

  return (
    <>
      <header className={`fixed w-full top-0 z-40 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`lg:hidden p-2 transition-colors ${transparent ? 'text-white' : 'text-[#2c2c2c]'}`}
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link to="/" className={`font-serif text-3xl font-light tracking-widest z-50 ${transparent ? 'text-white' : 'text-[#1a1a1a]'}`}>
            LUMIÈRE
          </Link>

          <div className={`hidden lg:flex items-center space-x-8 ${transparent ? 'text-white' : 'text-[#2c2c2c]'}`}>
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm tracking-wide opacity-90 hover:opacity-100 relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#c4a484] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              to="/sale"
              className="text-sm tracking-wide opacity-90 hover:opacity-100 relative group py-2 text-red-500"
            >
              Sale
              <span className="absolute bottom-0 left-0 w-0 h-px bg-red-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          <div className={`flex items-center space-x-5 ${transparent ? 'text-white' : 'text-[#2c2c2c]'}`}>
            <button onClick={() => setSearchOpen(true)} className="hover:text-[#c4a484] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/wishlist" className="hover:text-[#c4a484] transition-colors relative hidden sm:block">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#c4a484] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to={user ? '/account' : '/login'} className="hover:text-[#c4a484] transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </Link>
            <button onClick={() => setCartOpen(true)} className="hover:text-[#c4a484] transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#c4a484] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-white z-50 shadow-2xl lg:hidden flex flex-col font-sans"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <span className="font-serif text-2xl text-[#1a1a1a]">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:text-[#c4a484] transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 p-6 space-y-1">
                {[...NAV_LINKS, { label: 'Sale', href: '/sale' }].map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-4 text-lg font-light border-b border-gray-100 hover:text-[#c4a484] hover:pl-2 transition-all ${item.label === 'Sale' ? 'text-red-600' : 'text-[#2c2c2c]'}`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg font-light border-b border-gray-100 hover:text-[#c4a484] hover:pl-2 transition-all text-[#2c2c2c]">
                  Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
                </Link>
                <Link to={user ? '/account' : '/login'} onClick={() => setMobileMenuOpen(false)} className="block py-4 text-lg font-light border-b border-gray-100 hover:text-[#c4a484] hover:pl-2 transition-all text-[#2c2c2c]">
                  {user ? 'My Account' : 'Sign In'}
                </Link>
              </nav>
              <div className="p-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-4">Follow Us</p>
                <div className="flex space-x-4 text-gray-400">
                  <Instagram className="w-5 h-5 hover:text-[#c4a484] cursor-pointer" />
                  <Facebook className="w-5 h-5 hover:text-[#c4a484] cursor-pointer" />
                  <Twitter className="w-5 h-5 hover:text-[#c4a484] cursor-pointer" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
