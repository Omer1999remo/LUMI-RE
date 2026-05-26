import React from 'react';
import { Truck, RefreshCw, Clock, Globe, Package, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Breadcrumb from '../../components/ui/Breadcrumb';

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ed] pt-28 pb-16 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shipping & Returns' }]} />
        <div className="mt-6 mb-16 text-center">
          <p className="text-[#c4a484] text-xs tracking-widest mb-4">POLICIES</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1a1a1a]">Shipping & Returns</h1>
        </div>

        {/* Shipping */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Truck className="w-6 h-6 text-[#c4a484]" />
            <h2 className="font-serif text-3xl text-[#1a1a1a]">Shipping</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Clock, title: 'Standard', time: '5–7 business days', price: 'Free over $150 / $8 otherwise', desc: 'Our most popular shipping option.' },
              { icon: Package, title: 'Express', time: '2–3 business days', price: '$18.00', desc: 'Perfect when you need it quickly.' },
              { icon: Globe, title: 'International', time: '7–14 business days', price: 'From $25.00', desc: 'We ship to 40+ countries worldwide.' },
            ].map((opt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 shadow-sm"
              >
                <opt.icon className="w-8 h-8 text-[#c4a484] mb-4" />
                <h3 className="font-serif text-xl text-[#1a1a1a] mb-2">{opt.title}</h3>
                <p className="text-sm font-medium text-[#2c2c2c] mb-1">{opt.time}</p>
                <p className="text-sm text-[#c4a484] mb-3">{opt.price}</p>
                <p className="text-sm text-gray-500">{opt.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white p-8 shadow-sm">
            <h3 className="font-serif text-xl text-[#1a1a1a] mb-4">Shipping Notes</h3>
            <ul className="space-y-3">
              {[
                'Orders are processed within 1–2 business days.',
                'You\'ll receive a shipping confirmation email with tracking details.',
                'Weekend and holiday orders are processed the next business day.',
                'We cannot ship to PO Boxes for express deliveries.',
                'International duties and taxes are not included and are the buyer\'s responsibility.',
              ].map((note, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-[#c4a484] mt-0.5 flex-shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Returns */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <RefreshCw className="w-6 h-6 text-[#c4a484]" />
            <h2 className="font-serif text-3xl text-[#1a1a1a]">Returns & Exchanges</h2>
          </div>

          <div className="bg-white p-8 shadow-sm mb-6">
            <h3 className="font-serif text-xl text-[#1a1a1a] mb-4">Return Policy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs tracking-widest text-[#c4a484] mb-3">WE ACCEPT RETURNS IF:</h4>
                <ul className="space-y-2">
                  {[
                    'Returned within 30 days of delivery',
                    'Item is unworn and unwashed',
                    'Original tags are still attached',
                    'Item is in its original packaging',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs tracking-widest text-red-400 mb-3">FINAL SALE (NOT RETURNABLE):</h4>
                <ul className="space-y-2">
                  {[
                    'Sale items (unless defective)',
                    'Intimates and swimwear',
                    'Personalized or monogrammed items',
                    'Gift cards',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <div className="w-4 h-4 rounded-full border-2 border-red-300 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 shadow-sm">
            <h3 className="font-serif text-xl text-[#1a1a1a] mb-4">How to Return</h3>
            <ol className="space-y-4">
              {[
                { step: '01', title: 'Initiate Return', desc: 'Log in to your account and navigate to your orders. Select the item(s) you wish to return.' },
                { step: '02', title: 'Print Label', desc: 'Choose "Return" or "Exchange" and print the prepaid return shipping label sent to your email.' },
                { step: '03', title: 'Pack & Ship', desc: 'Securely pack your items in the original packaging if possible. Drop off at any authorized carrier location.' },
                { step: '04', title: 'Receive Refund', desc: 'Once received and inspected (3–5 days), your refund is processed within 5–7 business days to your original payment method.' },
              ].map((step, idx) => (
                <li key={idx} className="flex gap-6 items-start">
                  <span className="font-serif text-4xl text-[#c4a484] leading-none flex-shrink-0 w-12">{step.step}</span>
                  <div>
                    <h4 className="font-medium text-sm text-[#1a1a1a] mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}
