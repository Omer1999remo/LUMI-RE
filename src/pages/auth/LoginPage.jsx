import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '../../context/ShopContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser, showNotification } = useShop();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Simulate auth delay
    await new Promise(r => setTimeout(r, 800));
    if (email && password.length >= 6) {
      setUser({ email, name: email.split('@')[0] });
      showNotification('Welcome back!');
      navigate('/account');
    } else {
      setError('Invalid email or password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed] flex items-center justify-center px-6 pt-20 pb-12 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link to="/" className="font-serif text-4xl text-[#1a1a1a] tracking-widest">LUMIÈRE</Link>
          <p className="text-gray-500 mt-3 text-sm">Sign in to your account</p>
        </div>

        <div className="bg-white p-8 shadow-sm">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] transition-colors text-sm bg-transparent text-[#2c2c2c]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">PASSWORD</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 focus:outline-none focus:border-[#c4a484] transition-colors text-sm bg-transparent text-[#2c2c2c]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2c2c2c] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs text-[#c4a484] hover:underline">Forgot your password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1a1a] text-white py-4 tracking-widest hover:bg-[#c4a484] transition-colors text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#c4a484] hover:underline font-medium">Create one</Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 text-xs text-gray-400">
          By signing in, you agree to our{' '}
          <Link to="/privacy" className="hover:text-[#c4a484] underline">Privacy Policy</Link>
          {' '}and{' '}
          <Link to="/terms" className="hover:text-[#c4a484] underline">Terms of Service</Link>
        </p>
      </motion.div>
    </div>
  );
}
