import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import Rating from './ui/Rating';

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useShop();
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product.id, selectedSize);
    onClose();
  };

  return (
    <AnimatePresence>
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
            <p className="text-[#c4a484] text-xs tracking-widest mb-2">{product.category}</p>
            <h3 className="font-serif text-3xl mb-2 text-[#1a1a1a]">{product.name}</h3>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-light text-[#2c2c2c]">${product.price}</span>
              {product.originalPrice && <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>}
            </div>
            <div className="mb-4">
              <Rating value={product.rating} count={product.reviewCount} size="md" />
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm">{product.description}</p>

            {product.sizes && product.sizes[0] !== 'One Size' && (
              <div className="mb-6">
                <label className="text-xs tracking-widest mb-3 block text-[#2c2c2c]">SIZE</label>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border transition-colors rounded-sm text-sm ${selectedSize === size ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white' : 'border-gray-300 hover:border-[#c4a484] hover:text-[#c4a484] text-[#2c2c2c]'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleAdd}
              className="w-full bg-[#1a1a1a] text-white py-4 tracking-widest hover:bg-[#2c2c2c] transition-colors mb-3 rounded-sm text-sm font-medium"
            >
              ADD TO CART
            </button>

            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 text-sm tracking-widest hover:border-[#c4a484] hover:text-[#c4a484] transition-colors text-[#2c2c2c]"
            >
              VIEW FULL DETAILS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
