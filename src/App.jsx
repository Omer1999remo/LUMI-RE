import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartSidebar from './components/layout/CartSidebar';
import SearchOverlay from './components/layout/SearchOverlay';
import Notification from './components/layout/Notification';

import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import AccountPage from './pages/account/AccountPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ContactPage from './pages/info/ContactPage';
import FAQPage from './pages/info/FAQPage';
import ShippingReturnsPage from './pages/info/ShippingReturnsPage';
import SizeGuidePage from './pages/info/SizeGuidePage';
import PrivacyPage from './pages/info/PrivacyPage';
import TermsPage from './pages/info/TermsPage';

const NO_FOOTER_ROUTES = ['/login', '/register', '/checkout'];

function Layout() {
  const location = useLocation();
  const hideFooter = NO_FOOTER_ROUTES.some(r => location.pathname.startsWith(r));

  return (
    <>
      <Notification />
      <CartSidebar />
      <SearchOverlay />
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/new-arrivals" element={<ProductListingPage />} />
          <Route path="/collections" element={<ProductListingPage />} />
          <Route path="/women" element={<ProductListingPage />} />
          <Route path="/men" element={<ProductListingPage />} />
          <Route path="/accessories" element={<ProductListingPage />} />
          <Route path="/sale" element={<ProductListingPage />} />

          <Route path="/product/:id" element={<ProductDetailPage />} />

          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/account" element={<AccountPage />} />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
          <Route path="/size-guide" element={<SizeGuidePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideFooter && <Footer />}
    </>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-[#f5f2ed] flex items-center justify-center text-center px-6 pt-20 font-sans">
      <div>
        <p className="font-serif text-8xl text-[#c4a484] mb-6">404</p>
        <h1 className="font-serif text-3xl text-[#1a1a1a] mb-4">Page Not Found</h1>
        <p className="text-gray-500 mb-10 text-sm">The page you're looking for doesn't exist or has been moved.</p>
        <a href="/" className="inline-block bg-[#1a1a1a] text-white px-10 py-4 tracking-widest hover:bg-[#c4a484] transition-colors text-sm">
          GO HOME
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap');
        `}</style>
        <Layout />
      </ShopProvider>
    </BrowserRouter>
  );
}
