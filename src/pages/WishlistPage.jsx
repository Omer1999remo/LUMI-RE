import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import Breadcrumb from '../components/ui/Breadcrumb';

export default function WishlistPage() {
  const { wishlist } = useShop();

  return (
    <div className="min-h-screen bg-[#f5f2ed] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]} />
        <div className="mt-6 mb-12">
          <p className="text-[#c4a484] text-xs tracking-widest mb-2 font-sans">SAVED ITEMS</p>
          <h1 className="font-serif text-4xl text-[#1a1a1a]">My Wishlist</h1>
          <p className="text-gray-500 mt-2 text-sm font-sans">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-24">
            <Heart className="w-16 h-16 mx-auto text-gray-200 mb-6" />
            <p className="font-serif text-3xl text-[#1a1a1a] mb-4">Your wishlist is empty</p>
            <p className="text-gray-500 mb-10 font-sans">Save your favourite pieces to revisit them anytime.</p>
            <Link to="/collections" className="inline-block bg-[#1a1a1a] text-white px-10 py-4 tracking-widest hover:bg-[#c4a484] transition-colors text-sm font-medium">
              BROWSE COLLECTION
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlist.map((product, idx) => (
              <ProductCard key={product.id} product={product} idx={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
