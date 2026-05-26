import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Truck, RefreshCw, ShieldCheck, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

const CATEGORIES = [
  { title: "Women", href: "/women", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" },
  { title: "Men", href: "/men", img: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop" },
  { title: "Accessories", href: "/accessories", img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=2070&auto=format&fit=crop" },
  { title: "Sale", href: "/sale", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop", badge: "Up to 50% Off" },
];

export default function HomePage() {
  const { showNotification } = useShop();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 6);

  const handleSubscribe = (e) => {
    e.preventDefault();
    showNotification('Thank you for subscribing!');
    e.target.reset();
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
            alt="Fashion Hero"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/35" />
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
              <Link to="/new-arrivals" className="bg-white text-[#1a1a1a] px-10 py-4 tracking-widest hover:bg-[#c4a484] hover:text-white transition-all duration-300 text-sm font-medium">
                SHOP NOW
              </Link>
              <Link to="/collections" className="border border-white text-white px-10 py-4 tracking-widest hover:bg-white hover:text-[#1a1a1a] transition-all duration-300 text-sm font-medium">
                VIEW COLLECTION
              </Link>
            </div>
          </motion.div>
        </div>

        <a href="#collections" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </a>
      </section>

      {/* Categories Grid */}
      <section id="collections" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#c4a484] text-sm tracking-widest mb-4 font-sans">EXPLORE</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a1a1a]">Shop by Category</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative h-[500px] group cursor-pointer overflow-hidden"
            >
              <Link to={cat.href}>
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
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <p className="text-[#c4a484] text-sm tracking-widest mb-4 font-sans">JUST LANDED</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1a1a1a]">New Arrivals</h2>
            </div>
            <Link to="/new-arrivals" className="mt-6 md:mt-0 text-sm tracking-widest border-b border-[#2c2c2c] pb-1 hover:text-[#c4a484] hover:border-[#c4a484] transition-colors font-medium text-[#2c2c2c]">
              VIEW ALL
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivals.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                idx={idx}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop"
          alt="Editorial"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm tracking-[0.3em] mb-4 font-sans opacity-80">THE EDIT</p>
            <h2 className="font-serif text-4xl md:text-6xl font-light mb-6">Summer Essentials</h2>
            <Link to="/collections" className="inline-block border border-white text-white px-10 py-4 tracking-widest hover:bg-white hover:text-[#1a1a1a] transition-all duration-300 text-sm font-medium">
              EXPLORE THE EDIT
            </Link>
          </motion.div>
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
              { icon: Headphones, title: "24/7 Support", desc: "Dedicated support" },
            ].map((feature, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
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
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={handleSubscribe}>
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

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
}
