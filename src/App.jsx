import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Truck,
  RefreshCw,
  ShieldCheck,
  Headphones,
  ChevronDown,
  ArrowRight,
  Plus,
  CheckCircle,
  History,
  TrendingUp,
  SearchX
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Mock Data ---
const PRODUCTS = [
  { id: 1, name: "Silk Blend Trench Coat", price: 289, category: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop", description: "A timeless silhouette crafted from sustainable silk blend." },
  { id: 2, name: "Cashmere Turtleneck", price: 195, category: "Knitwear", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop", description: "Luxuriously soft cashmere turtleneck in a relaxed fit." },
  { id: 3, name: "Tailored Wool Trousers", price: 165, category: "Bottoms", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop", description: "Precision-tailored trousers in premium Italian wool." },
  { id: 4, name: "Leather Crossbody Bag", price: 245, category: "Accessories", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop", description: "Minimalist leather bag with adjustable strap." },
  { id: 5, name: "Linen Shirt Dress", price: 178, category: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop", description: "Breathable linen shirt dress with mother-of-pearl buttons." },
  { id: 6, name: "Structured Blazer", price: 320, category: "Outerwear", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop", description: "Power dressing redefined with padded shoulders." }
];

const POPULAR_SEARCHES = ["Summer Dresses", "Linen Shirts", "Trench Coats", "Accessories", "Knitwear"];

// --- Components ---

const Notification = ({ message, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className="fixed bottom-8 right-8 bg-[#1a1a1a] text-white px-6 py-4 shadow-2xl z-50 flex items-center gap-3 rounded-sm font-sans"
  >
    <CheckCircle className="w-5 h-5 text-[#c4a484]" />
    <span className="text-sm tracking-wide">{message}</span>
  </motion.div>
);

const CartSidebar = ({ isOpen, onClose, cart, updateQuantity, removeFromCart }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col font-sans"
          >
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-serif text-2xl text-[#1a1a1a]">Your Cart ({count})</h3>
              <button onClick={onClose} className="p-2 hover:text-[#c4a484] transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg mb-2 font-serif">Your cart is empty</p>
                  <p className="text-sm">Looks like you haven't added anything yet.</p>
                  <button onClick={onClose} className="mt-6 px-6 py-3 border border-[#2c2c2c] text-sm tracking-widest hover:bg-[#2c2c2c] hover:text-white transition-colors text-[#2c2c2c]">
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100">
                      <img src={item.image} className="w-20 h-24 object-cover bg-gray-100 rounded" alt={item.name} />
                      <div className="flex-1">
                        <h4 className="font-serif text-sm mb-1 text-[#1a1a1a]">{item.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">${item.price}</p>
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:border-[#c4a484] transition-colors text-gray-600">-</button>
                          <span className="text-sm text-[#2c2c2c]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:border-[#c4a484] transition-colors text-gray-600">+</button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors self-start">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between mb-2 text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4 text-gray-600 text-sm">
                  <span>Shipping</span>
                  <span className="text-xs">Calculated at checkout</span>
                </div>
                <div className="flex justify-between mb-6 text-xl font-medium border-t border-gray-200 pt-4 text-[#1a1a1a]">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-[#1a1a1a] text-white py-4 tracking-widest hover:bg-[#2c2c2c] transition-colors mb-3 text-sm font-medium">
                  CHECKOUT
                </button>
                <button onClick={onClose} className="w-full border border-[#2c2c2c] text-[#2c2c2c] py-3 tracking-widest hover:bg-[#2c2c2c] hover:text-white transition-colors text-xs font-medium">
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SearchOverlay = ({ isOpen, onClose, onSearch, results, query }) => {
  const [localQuery, setLocalQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  const handleInput = (e) => {
    setLocalQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleTagClick = (term) => {
    setLocalQuery(term);
    onSearch(term);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white/98 backdrop-blur-md z-[100] flex flex-col font-sans"
        >
          <button onClick={onClose} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-all hover:rotate-90 duration-300">
            <X className="w-8 h-8 text-[#2c2c2c]" />
          </button>

          <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-6xl mx-auto w-full pt-20">
            <div className="relative mb-8">
              <input
                ref={inputRef}
                type="text"
                value={localQuery}
                onChange={handleInput}
                placeholder="What are you looking for?"
                className="w-full text-4xl md:text-6xl font-serif border-b-2 border-[#2c2c2c] bg-transparent py-4 focus:outline-none focus:border-[#c4a484] transition-colors placeholder:text-gray-300 text-[#1a1a1a]"
              />
              <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-400 pointer-events-none" />
            </div>

            {results.length > 0 || query ? (
              <div className="mt-4 max-h-[50vh] overflow-y-auto custom-scrollbar">
                <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase">{results.length} Results for "{query}"</p>
                <div className="space-y-2">
                  {results.map(product => (
                    <div key={product.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-all hover:translate-x-2 duration-300">
                      <img src={product.image} className="w-16 h-16 object-cover rounded-md bg-gray-100" alt={product.name} />
                      <div className="flex-1">
                        <h4 className="font-serif text-xl text-[#1a1a1a]">{product.name}</h4>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                      <span className="text-[#c4a484] font-medium">${product.price}</span>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                  {results.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      <SearchX className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No results found for "{query}"</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase">Popular Searches</p>
                <div className="flex flex-wrap gap-3">
                  {POPULAR_SEARCHES.map(term => (
                    <button
                      key={term}
                      onClick={() => handleTagClick(term)}
                      className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-full hover:border-[#c4a484] hover:text-[#c4a484] transition-all hover:-translate-y-1 duration-300 bg-white text-sm text-[#4b5563]"
                    >
                      <TrendingUp className="w-4 h-4" />
                      {term}
                    </button>
                  ))}
                </div>

                <div className="mt-12">
                  <p className="text-xs tracking-widest text-gray-400 mb-4 uppercase">Recent Searches</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer text-gray-600 transition-colors">
                      <History className="w-4 h-4" />
                      <span className="text-sm">Winter Collection</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 text-center">
            <p className="text-sm text-gray-400">Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-sans">ESC</kbd> to close</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl relative z-10 grid md:grid-cols-2"
          >
            <div className="h-96 md:h-full overflow-hidden bg-gray-100">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-8 relative">
              <button onClick={onClose} className="absolute top-4 right-4 hover:text-[#c4a484] transition-colors">
                <X className="w-6 h-6" />
              </button>
              <p className="text-[#c4a484] text-sm tracking-widest mb-2">{product.category}</p>
              <h3 className="font-serif text-3xl mb-4 text-[#1a1a1a]">{product.name}</h3>
              <p className="text-2xl font-light mb-6 text-[#2c2c2c]">${product.price}</p>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">{product.description}</p>

              <div className="mb-6">
                <label className="text-sm tracking-widest mb-3 block text-[#2c2c2c]">SIZE</label>
                <div className="flex gap-3">
                  {['XS', 'S', 'M', 'L'].map(size => (
                    <button key={size} className="w-12 h-12 border border-gray-300 hover:border-[#c4a484] hover:text-[#c4a484] transition-colors rounded-sm text-sm text-[#2c2c2c]">
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { onAddToCart(product.id); onClose(); }}
                className="w-full bg-[#1a1a1a] text-white py-4 tracking-widest hover:bg-[#2c2c2c] transition-colors mb-4 rounded-sm text-sm font-medium"
              >
                ADD TO CART
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Main App Component ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ESC Key Handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
        setCartOpen(false);
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Cart Logic
  const addToCart = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showNotification(`${product.name} added to cart`);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + change;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Search Logic
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const filtered = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <div className="bg-[#f5f2ed] text-[#2c2c2c] font-sans antialiased selection:bg-[#c4a484] selection:text-white">
      {/* Inject Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Notification */}
      <AnimatePresence>
        {notification && <Notification message={notification} onClose={() => setNotification(null)} />}
      </AnimatePresence>

      {/* Overlays */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={handleSearch}
        results={searchResults}
        query={searchQuery}
      />
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />

      {/* Mobile Menu Overlay */}
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
                {['New Arrivals', 'Collections', 'Women', 'Men', 'Accessories', 'Sale'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-4 text-lg font-light border-b border-gray-100 hover:text-[#c4a484] hover:pl-2 transition-all ${item === 'Sale' ? 'text-red-600' : 'text-[#2c2c2c]'}`}
                  >
                    {item}
                  </a>
                ))}
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

      {/* Header */}
      <header
        className={`fixed w-full top-0 z-40 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
          }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-[#2c2c2c]' : 'text-white'}`}
          >
            <Menu className="w-6 h-6" />
          </button>

          <a href="#" className={`font-serif text-3xl font-light tracking-widest z-50 ${scrolled ? 'text-[#1a1a1a]' : 'text-white'}`}>
            LUMIÈRE
          </a>

          <div className={`hidden lg:flex items-center space-x-8 ${scrolled ? 'text-[#2c2c2c]' : 'text-white'}`}>
            {['New Arrivals', 'Collections', 'Women', 'Men', 'Accessories'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm tracking-wide opacity-90 hover:opacity-100 relative group py-2"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#c4a484] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className={`flex items-center space-x-6 ${scrolled ? 'text-[#2c2c2c]' : 'text-white'}`}>
            <button onClick={() => setSearchOpen(true)} className="hover:text-[#c4a484] transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="hover:text-[#c4a484] transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </button>
            <button onClick={() => setCartOpen(true)} className="hover:text-[#c4a484] transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#c4a484] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-bounce">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Spacer */}
      <div className="h-20" />

      {/* Hero Section */}
      <section className="relative h-[calc(100vh-80px)] -mt-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
            alt="Fashion Hero"
            className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative h-full flex items-center justify-center text-center text-white px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="text-sm tracking-[0.3em] mb-6 opacity-90 font-sans">SPRING / SUMMER 2026</p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight">
              Elegance in<br />
              <span className="italic text-[#c4a484]">Motion</span>
            </h1>
            <p className="text-lg md:text-xl font-light mb-12 max-w-2xl mx-auto opacity-90 font-sans">
              Discover our new collection of timeless pieces designed for the modern individual
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#new-arrivals" className="bg-white text-[#1a1a1a] px-10 py-4 tracking-widest hover:bg-[#c4a484] hover:text-white transition-all duration-300 text-sm font-medium">
                SHOP NOW
              </a>
              <a href="#collections" className="border border-white text-white px-10 py-4 tracking-widest hover:bg-white hover:text-[#1a1a1a] transition-all duration-300 text-sm font-medium">
                VIEW COLLECTION
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Categories Grid */}
      <section id="collections" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#c4a484] text-sm tracking-widest mb-4 font-sans">EXPLORE</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a1a1a]">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Women", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" },
            { title: "Men", img: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop" },
            { title: "Accessories", img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=2070&auto=format&fit=crop" },
            { title: "Sale", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop", badge: "Up to 50% Off" }
          ].map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative h-[500px] group cursor-pointer overflow-hidden"
            >
              <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-serif text-2xl mb-2">{cat.title}</h3>
                  <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-sans">
                    {cat.badge || "Explore Collection →"}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section id="new-arrivals" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <p className="text-[#c4a484] text-sm tracking-widest mb-4 font-sans">JUST LANDED</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a1a1a]">New Arrivals</h2>
            </div>
            <a href="#" className="mt-6 md:mt-0 text-sm tracking-widest border-b border-[#2c2c2c] pb-1 hover:text-[#c4a484] hover:border-[#c4a484] transition-colors font-medium text-[#2c2c2c]">
              VIEW ALL
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden mb-4 bg-gray-100 aspect-[3/4]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="flex-1 bg-white text-[#1a1a1a] py-3 text-xs tracking-widest hover:bg-[#c4a484] hover:text-white transition-colors font-medium shadow-lg"
                    >
                      QUICK VIEW
                    </button>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="bg-[#1a1a1a] text-white px-4 hover:bg-[#c4a484] transition-colors shadow-lg flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {idx < 2 && <span className="absolute top-4 left-4 bg-[#c4a484] text-white text-[10px] tracking-widest px-3 py-1 font-medium">NEW</span>}
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-500 tracking-widest mb-1 font-sans">{product.category}</p>
                  <h3
                    className="font-serif text-lg mb-2 group-hover:text-[#c4a484] transition-colors cursor-pointer text-[#1a1a1a]"
                    onClick={() => setQuickViewProduct(product)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#2c2c2c] font-medium">${product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $150" },
              { icon: RefreshCw, title: "Easy Returns", desc: "30-day return policy" },
              { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure checkout" },
              { icon: Headphones, title: "24/7 Support", desc: "Dedicated support" }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <feature.icon className="w-8 h-8 mx-auto mb-4 text-[#c4a484]" />
                <h4 className="font-serif text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm font-sans">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <p className="text-[#c4a484] text-sm tracking-widest mb-4 font-sans">STAY UPDATED</p>
        <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 text-[#1a1a1a]">Join the Lumière Family</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto font-sans">
          Subscribe to receive exclusive offers, early access to new collections, and styling tips.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); showNotification('Thank you for subscribing!'); }}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 px-6 py-4 border border-gray-300 focus:outline-none focus:border-[#c4a484] transition-colors bg-transparent font-sans text-[#2c2c2c]"
          />
          <button type="submit" className="bg-[#1a1a1a] text-white px-8 py-4 tracking-widest hover:bg-[#2c2c2c] transition-colors text-sm font-medium">
            SUBSCRIBE
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="font-serif text-2xl mb-6 text-[#1a1a1a]">LUMIÈRE</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 font-sans">
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
              <ul className="space-y-3 text-sm text-gray-600 font-sans">
                {['New Arrivals', 'Best Sellers', 'Sale', 'Collections'].map(item => (
                  <li key={item}><a href="#" className="hover:text-[#c4a484] transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-6 tracking-widest text-sm text-[#1a1a1a]">CUSTOMER CARE</h4>
              <ul className="space-y-3 text-sm text-gray-600 font-sans">
                {['Contact Us', 'Shipping & Returns', 'Size Guide', 'FAQ'].map(item => (
                  <li key={item}><a href="#" className="hover:text-[#c4a484] transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-6 tracking-widest text-sm text-[#1a1a1a]">CONTACT</h4>
              <ul className="space-y-3 text-sm text-gray-600 font-sans">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#c4a484]" />
                  <span>123 Fashion Avenue<br />New York, NY 10001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#c4a484]" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#c4a484]" />
                  <span>hello@lumiere.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-sans">
            <p>&copy; 2026 Lumière Fashion. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#c4a484] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#c4a484] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}