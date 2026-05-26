import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShop } from '../../context/ShopContext';
import Breadcrumb from '../../components/ui/Breadcrumb';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { showNotification } = useShop();
  const update = (f) => (e) => setForm(prev => ({ ...prev, [f]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showNotification('Message sent! We\'ll be in touch soon.');
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed] pt-28 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />
        <div className="mt-6 mb-16 text-center">
          <p className="text-[#c4a484] text-xs tracking-widest mb-4">GET IN TOUCH</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1a1a1a]">Contact Us</h1>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto text-sm">We're here to help. Reach out with any questions, feedback, or requests.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-8">
            {[
              { icon: MapPin, title: 'Visit Us', lines: ['123 Fashion Avenue', 'New York, NY 10001'] },
              { icon: Phone, title: 'Call Us', lines: ['+1 (555) 123-4567', 'Mon–Fri, 9am–6pm EST'] },
              { icon: Mail, title: 'Email Us', lines: ['hello@lumiere.com', 'support@lumiere.com'] },
              { icon: Clock, title: 'Hours', lines: ['Monday–Friday: 9am–6pm', 'Saturday: 10am–4pm', 'Sunday: Closed'] },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                  <item.icon className="w-5 h-5 text-[#c4a484]" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-[#1a1a1a] mb-1">{item.title}</h3>
                  {item.lines.map((line, i) => <p key={i} className="text-sm text-gray-600">{line}</p>)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-12 shadow-sm text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h2 className="font-serif text-3xl text-[#1a1a1a] mb-4">Message Sent!</h2>
                <p className="text-gray-600 mb-6">Thank you for reaching out. We'll respond within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="px-8 py-3 border border-[#2c2c2c] text-sm tracking-widest hover:bg-[#2c2c2c] hover:text-white transition-colors text-[#2c2c2c]">
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-8 shadow-sm space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">YOUR NAME *</label>
                    <input required value={form.name} onChange={update('name')} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] transition-colors text-sm text-[#2c2c2c]" />
                  </div>
                  <div>
                    <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">EMAIL ADDRESS *</label>
                    <input required type="email" value={form.email} onChange={update('email')} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] transition-colors text-sm text-[#2c2c2c]" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">SUBJECT</label>
                  <select value={form.subject} onChange={update('subject')} className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] transition-colors text-sm text-[#2c2c2c] bg-white">
                    <option value="">Select a topic</option>
                    <option>Order Inquiry</option>
                    <option>Returns & Exchanges</option>
                    <option>Product Question</option>
                    <option>Styling Advice</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-widest text-[#2c2c2c] mb-2">MESSAGE *</label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-[#c4a484] transition-colors text-sm resize-none text-[#2c2c2c]"
                  />
                </div>
                <button type="submit" className="w-full bg-[#1a1a1a] text-white py-4 tracking-widest hover:bg-[#c4a484] transition-colors text-sm font-medium">
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
