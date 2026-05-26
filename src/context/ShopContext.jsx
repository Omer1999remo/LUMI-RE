import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lumiere-cart')) || []; } catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lumiere-wishlist')) || []; } catch { return []; }
  });
  const [notification, setNotification] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('lumiere-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lumiere-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (productId, size = null, quantity = 1) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const key = `${productId}-${size}`;
    setCart(prev => {
      const existing = prev.find(item => item.key === key);
      if (existing) {
        return prev.map(item => item.key === key ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity, size, key }];
    });
    showNotification(`${product.name} added to cart`);
  };

  const removeFromCart = (key) => {
    setCart(prev => prev.filter(item => item.key !== key));
  };

  const updateQuantity = (key, change) => {
    setCart(prev => prev.map(item => {
      if (item.key === key) {
        const newQty = item.quantity + change;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const toggleWishlist = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    setWishlist(prev => {
      const exists = prev.find(item => item.id === productId);
      if (exists) {
        showNotification(`${product.name} removed from wishlist`);
        return prev.filter(item => item.id !== productId);
      }
      showNotification(`${product.name} added to wishlist`);
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => wishlist.some(item => item.id === productId);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <ShopContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal,
      wishlist, toggleWishlist, isInWishlist,
      notification, showNotification,
      cartOpen, setCartOpen,
      searchOpen, setSearchOpen,
      user, setUser,
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used within ShopProvider');
  return ctx;
};
