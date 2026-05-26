import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, Heart, Settings, LogOut, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '../../context/ShopContext';

const MOCK_ORDERS = [
  { id: 'LMR-48291', date: '2026-05-10', status: 'Delivered', total: 484, items: 2 },
  { id: 'LMR-37104', date: '2026-04-22', status: 'In Transit', total: 195, items: 1 },
  { id: 'LMR-25830', date: '2026-03-15', status: 'Delivered', total: 733, items: 3 },
];

const STATUS_COLORS = {
  'Delivered': 'bg-green-50 text-green-700',
  'In Transit': 'bg-blue-50 text-blue-700',
  'Processing': 'bg-yellow-50 text-yellow-700',
};

const TABS = [
  { key: 'overview', label: 'Overview', icon: User },
  { key: 'orders', label: 'Orders', icon: Package },
  { key: 'wishlist', label: 'Wishlist', icon: Heart },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export default function AccountPage() {
  const { user, setUser, wishlist, addToCart, toggleWishlist } = useShop();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f5f2ed] flex items-center justify-center pt-20 font-sans">
        <div className="text-center">
          <User className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="font-serif text-3xl text-[#1a1a1a] mb-4">Sign In Required</p>
          <p className="text-gray-500 mb-8 text-sm">Please sign in to access your account.</p>
          <Link to="/login" className="inline-block bg-[#1a1a1a] text-white px-8 py-3 tracking-widest hover:bg-[#c4a484] transition-colors text-sm">
            SIGN IN
          </Link>
        </div>
      </div>
    );
  }

  const handleSignOut = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed] pt-24 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <p className="text-[#c4a484] text-xs tracking-widest mb-2">MY ACCOUNT</p>
          <h1 className="font-serif text-4xl text-[#1a1a1a]">Welcome back, {user.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 shadow-sm mb-4">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-[#c4a484] rounded-full flex items-center justify-center text-white font-serif text-xl">
                  {user.name?.[0]?.toUpperCase() || 'L'}
                </div>
                <div>
                  <p className="font-medium text-sm text-[#1a1a1a]">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <nav className="space-y-1">
                {TABS.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-sm text-sm transition-colors text-left ${activeTab === tab.key ? 'bg-[#1a1a1a] text-white' : 'text-[#2c2c2c] hover:bg-gray-50'}`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                    {tab.key === 'wishlist' && wishlist.length > 0 && (
                      <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-white/20' : 'bg-gray-100'}`}>{wishlist.length}</span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-3 bg-white shadow-sm text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && <Overview orders={MOCK_ORDERS} wishlistCount={wishlist.length} />}
            {activeTab === 'orders' && <OrderHistory orders={MOCK_ORDERS} />}
            {activeTab === 'wishlist' && <WishlistTab wishlist={wishlist} addToCart={addToCart} toggleWishlist={toggleWishlist} />}
            {activeTab === 'settings' && <AccountSettings user={user} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function Overview({ orders, wishlistCount }) {
  const recentOrder = orders[0];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Orders', value: orders.length, icon: Package },
          { label: 'Items Wishlisted', value: wishlistCount, icon: Heart },
          { label: 'Total Spent', value: `$${orders.reduce((a, b) => a + b.total, 0).toLocaleString()}`, icon: ShoppingBag },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 shadow-sm">
            <stat.icon className="w-6 h-6 text-[#c4a484] mb-3" />
            <p className="text-2xl font-serif text-[#1a1a1a] mb-1">{stat.value}</p>
            <p className="text-xs text-gray-500 tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>

      {recentOrder && (
        <div className="bg-white p-6 shadow-sm">
          <h3 className="font-serif text-xl text-[#1a1a1a] mb-4">Most Recent Order</h3>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-medium text-sm text-[#1a1a1a]">{recentOrder.id}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(recentOrder.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full ${STATUS_COLORS[recentOrder.status]}`}>{recentOrder.status}</span>
            <p className="text-sm font-medium text-[#2c2c2c]">${recentOrder.total}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function OrderHistory({ orders }) {
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl text-[#1a1a1a]">Order History</h2>
      {orders.map(order => (
        <motion.div key={order.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-medium text-sm text-[#1a1a1a] mb-1">{order.id}</p>
              <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {order.items} item{order.items !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-xs px-3 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>{order.status}</span>
              <span className="text-sm font-medium text-[#2c2c2c]">${order.total}</span>
              <button className="flex items-center gap-1 text-xs text-[#c4a484] hover:underline">
                Details <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function WishlistTab({ wishlist, addToCart, toggleWishlist }) {
  if (wishlist.length === 0) {
    return (
      <div className="bg-white p-12 shadow-sm text-center">
        <Heart className="w-12 h-12 mx-auto text-gray-200 mb-4" />
        <p className="font-serif text-2xl text-[#1a1a1a] mb-3">Your wishlist is empty</p>
        <p className="text-gray-500 text-sm mb-8">Save your favourite pieces to come back to them later.</p>
        <Link to="/collections" className="inline-block bg-[#1a1a1a] text-white px-8 py-3 tracking-widest hover:bg-[#c4a484] transition-colors text-sm">
          BROWSE COLLECTION
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-2xl text-[#1a1a1a] mb-6">My Wishlist ({wishlist.length})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {wishlist.map(item => (
          <div key={item.id} className="bg-white p-4 shadow-sm flex gap-4">
            <Link to={`/product/${item.id}`}>
              <img src={item.image} alt={item.name} className="w-24 h-28 object-cover bg-gray-100" />
            </Link>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-[#c4a484] tracking-widest mb-1">{item.category}</p>
                <Link to={`/product/${item.id}`}>
                  <p className="font-serif text-lg text-[#1a1a1a] hover:text-[#c4a484] transition-colors">{item.name}</p>
                </Link>
                <p className="text-sm text-gray-500 mt-1">${item.price}</p>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => addToCart(item.id)}
                  className="flex-1 bg-[#1a1a1a] text-white py-2 text-xs tracking-widest hover:bg-[#c4a484] transition-colors"
                >
                  ADD TO CART
                </button>
                <button
                  onClick={() => toggleWishlist(item.id)}
                  className="w-9 h-9 border border-gray-300 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-300 transition-colors"
                >
                  <Heart className="w-4 h-4 fill-current text-[#c4a484]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccountSettings({ user }) {
  const [saved, setSaved] = useState(false);
  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white p-8 shadow-sm">
      <h2 className="font-serif text-2xl text-[#1a1a1a] mb-6">Account Settings</h2>
      <form onSubmit={handleSave} className="space-y-5 max-w-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">FIRST NAME</label>
            <input defaultValue={user.name?.split(' ')[0]} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]" />
          </div>
          <div>
            <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">LAST NAME</label>
            <input defaultValue={user.name?.split(' ')[1]} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]" />
          </div>
        </div>
        <div>
          <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">EMAIL ADDRESS</label>
          <input type="email" defaultValue={user.email} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]" />
        </div>
        <div className="border-t border-gray-100 pt-5">
          <h3 className="text-sm tracking-widest text-[#2c2c2c] mb-4">CHANGE PASSWORD</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">CURRENT PASSWORD</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]" />
            </div>
            <div>
              <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">NEW PASSWORD</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] text-sm text-[#2c2c2c]" />
            </div>
          </div>
        </div>
        <button type="submit" className="bg-[#1a1a1a] text-white px-8 py-3 tracking-widest hover:bg-[#c4a484] transition-colors text-sm font-medium">
          {saved ? 'SAVED!' : 'SAVE CHANGES'}
        </button>
      </form>
    </div>
  );
}
