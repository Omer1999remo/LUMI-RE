import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import Rating from './ui/Rating';

export default function ProductCard({ product, idx = 0, onQuickView }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const inWishlist = isInWishlist(product.id);
  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(idx * 0.07, 0.4) }}
      className="group"
    >
      <div className="relative overflow-hidden mb-4 bg-gray-100 aspect-[3/4]">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        </Link>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-[#c4a484] text-white text-[10px] tracking-widest px-3 py-1 font-medium">NEW</span>
          )}
          {product.isSale && discountPct && (
            <span className="bg-[#1a1a1a] text-white text-[10px] tracking-widest px-3 py-1 font-medium">-{discountPct}%</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${inWishlist ? 'bg-[#c4a484] text-white opacity-100' : 'bg-white text-gray-600 opacity-0 group-hover:opacity-100 hover:bg-[#c4a484] hover:text-white'}`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
        </button>

        {/* Action buttons */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="flex-1 bg-white text-[#1a1a1a] py-3 text-xs tracking-widest hover:bg-[#c4a484] hover:text-white transition-colors font-medium shadow-lg"
            >
              QUICK VIEW
            </button>
          )}
          <button
            onClick={() => addToCart(product.id)}
            className="bg-[#1a1a1a] text-white px-4 hover:bg-[#c4a484] transition-colors shadow-lg flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-500 tracking-widest mb-1 font-sans">{product.category}</p>
        <Link
          to={`/product/${product.id}`}
          className="font-serif text-lg mb-2 hover:text-[#c4a484] transition-colors block text-[#1a1a1a]"
        >
          {product.name}
        </Link>
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-sm text-[#2c2c2c] font-medium">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>
        <div className="flex justify-center">
          <Rating value={product.rating} count={product.reviewCount} />
        </div>
      </div>
    </motion.div>
  );
}
