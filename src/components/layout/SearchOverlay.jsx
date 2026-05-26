import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, TrendingUp, History, ArrowRight, SearchX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, POPULAR_SEARCHES } from '../../data/products';

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useShop();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setSearchOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setSearchOpen]);

  const handleInput = (val) => {
    setQuery(val);
    if (!val.trim()) { setResults([]); return; }
    const q = val.toLowerCase();
    setResults(PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags?.some(t => t.includes(q))
    ));
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white/98 backdrop-blur-md z-[100] flex flex-col font-sans"
        >
          <button onClick={() => setSearchOpen(false)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-all hover:rotate-90 duration-300">
            <X className="w-8 h-8 text-[#2c2c2c]" />
          </button>

          <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full pt-20">
            <div className="relative mb-8">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleInput(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full text-4xl md:text-6xl font-serif border-b-2 border-[#2c2c2c] bg-transparent py-4 focus:outline-none focus:border-[#c4a484] transition-colors placeholder:text-gray-300 text-[#1a1a1a]"
              />
              <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400 pointer-events-none" />
            </div>

            {query ? (
              <div className="mt-4 max-h-[50vh] overflow-y-auto custom-scrollbar">
                <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase">{results.length} Results for "{query}"</p>
                {results.length > 0 ? (
                  <div className="space-y-2">
                    {results.map(product => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-all hover:translate-x-2 duration-300"
                      >
                        <img src={product.image} className="w-16 h-16 object-cover rounded-md bg-gray-100" alt={product.name} />
                        <div className="flex-1">
                          <h4 className="font-serif text-xl text-[#1a1a1a]">{product.name}</h4>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                        <span className="text-[#c4a484] font-medium">${product.price}</span>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <SearchX className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-4">No results found for "{query}"</p>
                    <Link to="/collections" onClick={() => setSearchOpen(false)} className="text-sm text-[#c4a484] underline">Browse all products</Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-8">
                <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase">Popular Searches</p>
                <div className="flex flex-wrap gap-3">
                  {POPULAR_SEARCHES.map(term => (
                    <button
                      key={term}
                      onClick={() => handleInput(term)}
                      className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-full hover:border-[#c4a484] hover:text-[#c4a484] transition-all hover:-translate-y-1 duration-300 bg-white text-sm text-[#4b5563]"
                    >
                      <TrendingUp className="w-4 h-4" />
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-8 text-center">
            <p className="text-sm text-gray-400">Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">ESC</kbd> to close</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
