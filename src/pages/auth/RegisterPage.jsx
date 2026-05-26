import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '../../context/ShopContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser, showNotification } = useShop();
  const navigate = useNavigate();

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const passwordStrength = (() => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  })();

  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setUser({ email: form.email, name: `${form.firstName} ${form.lastName}` });
    showNotification('Account created successfully!');
    navigate('/account');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed] flex items-center justify-center px-6 pt-20 pb-12 font-sans">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/" className="font-serif text-4xl text-[#1a1a1a] tracking-widest">LUMIÈRE</Link>
          <p className="text-gray-500 mt-3 text-sm">Create your account</p>
        </div>

        <div className="bg-white p-8 shadow-sm">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">FIRST NAME</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={update('firstName')}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] transition-colors text-sm bg-transparent text-[#2c2c2c]"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">LAST NAME</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={update('lastName')}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] transition-colors text-sm bg-transparent text-[#2c2c2c]"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">EMAIL ADDRESS</label>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
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
                  value={form.password}
                  onChange={update('password')}
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 focus:outline-none focus:border-[#c4a484] transition-colors text-sm bg-transparent text-[#2c2c2c]"
                  placeholder="Min. 6 characters"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2c2c2c] transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= passwordStrength ? strengthColors[passwordStrength] : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{strengthLabels[passwordStrength]}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">CONFIRM PASSWORD</label>
              <input
                type="password"
                value={form.confirm}
                onChange={update('confirm')}
                required
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] transition-colors text-sm bg-transparent text-[#2c2c2c]"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <div className="w-4 h-4 border border-gray-300 flex-shrink-0 mt-0.5 flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                I agree to receive updates about new collections and exclusive offers. You can unsubscribe at any time.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1a1a] text-white py-4 tracking-widest hover:bg-[#c4a484] transition-colors text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-[#c4a484] hover:underline font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
