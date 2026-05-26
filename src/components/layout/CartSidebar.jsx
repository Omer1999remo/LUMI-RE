import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';

export default function CartSidebar() {
  const { cart, cartOpen, setCartOpen, cartTotal, updateQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
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
              <button onClick={() => setCartOpen(false)} className="p-2 hover:text-[#c4a484] transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg mb-2 font-serif">Your cart is empty</p>
                  <p className="text-sm">Looks like you haven't added anything yet.</p>
                  <button onClick={() => setCartOpen(false)} className="mt-6 px-6 py-3 border border-[#2c2c2c] text-sm tracking-widest hover:bg-[#2c2c2c] hover:text-white transition-colors text-[#2c2c2c]">
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.key} className="flex gap-4 py-4 border-b border-gray-100">
                      <Link to={`/product/${item.id}`} onClick={() => setCartOpen(false)}>
                        <img src={item.image} className="w-20 h-24 object-cover bg-gray-100 rounded" alt={item.name} />
                      </Link>
                      <div className="flex-1">
                        <Link to={`/product/${item.id}`} onClick={() => setCartOpen(false)}>
                          <h4 className="font-serif text-sm mb-1 text-[#1a1a1a] hover:text-[#c4a484] transition-colors">{item.name}</h4>
                        </Link>
                        {item.size && <p className="text-xs text-gray-400 mb-1">Size: {item.size}</p>}
                        <p className="text-xs text-gray-500 mb-2">${item.price}</p>
                        <div className="flex items-center gap-3">
                          <button onClick={() => updateQuantity(item.key, -1)} className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:border-[#c4a484] transition-colors text-gray-600">-</button>
                          <span className="text-sm text-[#2c2c2c]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.key, 1)} className="w-6 h-6 border border-gray-300 flex items-center justify-center hover:border-[#c4a484] transition-colors text-gray-600">+</button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => removeFromCart(item.key)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium text-[#2c2c2c]">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between mb-2 text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4 text-gray-600 text-sm">
                  <span>Shipping</span>
                  <span className="text-xs">{cartTotal >= 150 ? 'Free' : 'Calculated at checkout'}</span>
                </div>
                <div className="flex justify-between mb-6 text-xl font-medium border-t border-gray-200 pt-4 text-[#1a1a1a]">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#1a1a1a] text-white py-4 tracking-widest hover:bg-[#2c2c2c] transition-colors mb-3 text-sm font-medium"
                >
                  CHECKOUT
                </button>
                <button onClick={() => setCartOpen(false)} className="w-full border border-[#2c2c2c] text-[#2c2c2c] py-3 tracking-widest hover:bg-[#2c2c2c] hover:text-white transition-colors text-xs font-medium">
                  CONTINUE SHOPPING
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
