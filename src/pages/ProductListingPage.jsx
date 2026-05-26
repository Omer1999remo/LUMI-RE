import React, { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import Breadcrumb from '../components/ui/Breadcrumb';

const PAGE_CONFIG = {
  'new-arrivals': { title: 'New Arrivals', subtitle: 'JUST LANDED', filter: p => p.isNew },
  'collections': { title: 'All Collections', subtitle: 'EXPLORE', filter: () => true },
  'women': { title: 'Women', subtitle: 'WOMENSWEAR', filter: p => p.gender === 'Women' },
  'men': { title: 'Men', subtitle: 'MENSWEAR', filter: p => p.gender === 'Men' },
  'accessories': { title: 'Accessories', subtitle: 'THE DETAILS', filter: p => p.category === 'Accessories' },
  'sale': { title: 'Sale', subtitle: 'UP TO 50% OFF', filter: p => p.isSale },
};

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function ProductListingPage() {
  const location = useLocation();
  const section = location.pathname.replace('/', '') || 'collections';
  const config = PAGE_CONFIG[section] || PAGE_CONFIG['collections'];

  const [sort, setSort] = useState('featured');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const baseProducts = useMemo(() => PRODUCTS.filter(config.filter), [section]);

  const filtered = useMemo(() => {
    let list = baseProducts.filter(p =>
      p.price >= priceRange[0] && p.price <= priceRange[1] &&
      (selectedCategories.length === 0 || selectedCategories.includes(p.category))
    );

    switch (sort) {
      case 'price-asc': return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...list].sort((a, b) => b.price - a.price);
      case 'rating': return [...list].sort((a, b) => b.rating - a.rating);
      case 'newest': return [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default: return list;
    }
  }, [baseProducts, sort, selectedCategories, priceRange]);

  const availableCategories = [...new Set(baseProducts.map(p => p.category))];

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setSort('featured');
  };

  const activeFilters = selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0);

  const breadcrumb = [
    { label: 'Home', href: '/' },
    { label: config.title },
  ];

  return (
    <div className="min-h-screen bg-[#f5f2ed]">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb items={breadcrumb} />
          <div className="mt-4">
            <p className="text-[#c4a484] text-xs tracking-widest mb-2 font-sans">{config.subtitle}</p>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-[#1a1a1a]">{config.title}</h1>
            <p className="text-gray-500 mt-2 text-sm font-sans">{filtered.length} products</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 hover:border-[#c4a484] transition-colors text-sm font-sans text-[#2c2c2c] relative"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilters > 0 && (
                <span className="ml-1 bg-[#c4a484] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilters}
                </span>
              )}
            </button>

            {/* Active filter chips */}
            {selectedCategories.map(cat => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] text-white text-xs rounded-sm font-sans"
              >
                {cat} <X className="w-3 h-3" />
              </button>
            ))}
            {activeFilters > 0 && (
              <button onClick={clearFilters} className="text-xs text-gray-500 hover:text-[#c4a484] underline font-sans">
                Clear all
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 border border-gray-300 focus:outline-none focus:border-[#c4a484] transition-colors text-sm font-sans bg-white text-[#2c2c2c] cursor-pointer"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            <div className="flex items-center border border-gray-300 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-[#1a1a1a] text-white' : 'text-gray-500 hover:text-[#2c2c2c]'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-[#1a1a1a] text-white' : 'text-gray-500 hover:text-[#2c2c2c]'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="font-serif text-3xl mb-4 text-[#2c2c2c]">No products found</p>
            <p className="text-sm mb-8">Try adjusting your filters</p>
            <button onClick={clearFilters} className="px-8 py-3 border border-[#2c2c2c] text-sm tracking-widest hover:bg-[#2c2c2c] hover:text-white transition-colors text-[#2c2c2c]">
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
            : 'space-y-6'
          }>
            {filtered.map((product, idx) =>
              viewMode === 'grid' ? (
                <ProductCard key={product.id} product={product} idx={idx} onQuickView={setQuickViewProduct} />
              ) : (
                <ListViewProduct key={product.id} product={product} onQuickView={setQuickViewProduct} />
              )
            )}
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-80 bg-white z-50 shadow-2xl flex flex-col font-sans overflow-y-auto"
            >
              <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                <h3 className="font-serif text-xl text-[#1a1a1a]">Filters</h3>
                <button onClick={() => setFilterOpen(false)} className="hover:text-[#c4a484] transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 flex-1">
                {/* Sort (mobile) */}
                <div className="mb-8 md:hidden">
                  <h4 className="text-xs tracking-widest text-[#2c2c2c] mb-4">SORT BY</h4>
                  <div className="space-y-2">
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setSort(opt.value)}
                        className={`w-full text-left py-2 px-3 text-sm rounded transition-colors ${sort === opt.value ? 'bg-[#1a1a1a] text-white' : 'hover:bg-gray-50 text-[#2c2c2c]'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category filter */}
                <div className="mb-8">
                  <h4 className="text-xs tracking-widest text-[#2c2c2c] mb-4">CATEGORY</h4>
                  <div className="space-y-2">
                    {availableCategories.map(cat => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                        <div
                          onClick={() => toggleCategory(cat)}
                          className={`w-4 h-4 border-2 flex items-center justify-center transition-colors cursor-pointer ${selectedCategories.includes(cat) ? 'bg-[#1a1a1a] border-[#1a1a1a]' : 'border-gray-300 group-hover:border-[#c4a484]'}`}
                        >
                          {selectedCategories.includes(cat) && <div className="w-2 h-2 bg-white" />}
                        </div>
                        <span onClick={() => toggleCategory(cat)} className="text-sm text-[#2c2c2c]">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price filter */}
                <div className="mb-8">
                  <h4 className="text-xs tracking-widest text-[#2c2c2c] mb-4">PRICE RANGE</h4>
                  <div className="space-y-3">
                    {[[0, 100], [100, 200], [200, 350], [350, 500]].map(([min, max]) => (
                      <button
                        key={`${min}-${max}`}
                        onClick={() => setPriceRange([min, max])}
                        className={`w-full text-left py-2 px-3 text-sm rounded transition-colors ${priceRange[0] === min && priceRange[1] === max ? 'bg-[#1a1a1a] text-white' : 'hover:bg-gray-50 text-[#2c2c2c]'}`}
                      >
                        ${min} – ${max === 500 ? '500+' : max}
                      </button>
                    ))}
                    <button
                      onClick={() => setPriceRange([0, 500])}
                      className={`w-full text-left py-2 px-3 text-sm rounded transition-colors ${priceRange[0] === 0 && priceRange[1] === 500 ? 'bg-[#1a1a1a] text-white' : 'hover:bg-gray-50 text-[#2c2c2c]'}`}
                    >
                      All prices
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t">
                <button
                  onClick={() => { clearFilters(); setFilterOpen(false); }}
                  className="w-full border border-gray-300 py-3 text-sm tracking-widest text-[#2c2c2c] hover:border-[#c4a484] hover:text-[#c4a484] transition-colors mb-3"
                >
                  CLEAR ALL
                </button>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="w-full bg-[#1a1a1a] text-white py-3 text-sm tracking-widest hover:bg-[#2c2c2c] transition-colors"
                >
                  VIEW {filtered.length} RESULTS
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}

function ListViewProduct({ product, onQuickView }) {
  const { addToCart } = useShop();
  return (
    <div className="bg-white flex gap-6 p-4 rounded-sm">
      <Link to={`/product/${product.id}`} className="flex-shrink-0">
        <img src={product.image} alt={product.name} className="w-32 h-40 object-cover bg-gray-100" />
      </Link>
      <div className="flex-1 py-2">
        <p className="text-xs text-[#c4a484] tracking-widest mb-1 font-sans">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-xl mb-2 text-[#1a1a1a] hover:text-[#c4a484] transition-colors">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mb-3 font-sans leading-relaxed">{product.description}</p>
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium text-[#2c2c2c]">${product.price}</span>
          {product.originalPrice && <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>}
        </div>
      </div>
      <div className="flex flex-col gap-2 justify-center">
        <button onClick={() => onQuickView(product)} className="px-4 py-2 border border-gray-300 text-xs tracking-widest hover:border-[#c4a484] hover:text-[#c4a484] transition-colors whitespace-nowrap text-[#2c2c2c]">
          QUICK VIEW
        </button>
        <Link to={`/product/${product.id}`} className="px-4 py-2 bg-[#1a1a1a] text-white text-xs tracking-widest hover:bg-[#c4a484] transition-colors text-center whitespace-nowrap">
          VIEW ITEM
        </Link>
      </div>
    </div>
  );
}
