import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumb from '../../components/ui/Breadcrumb';

const FAQ_DATA = [
  {
    category: 'Orders & Shipping',
    questions: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 5–7 business days. Express shipping (2–3 business days) is available for $18. Orders over $150 qualify for free standard shipping.' },
      { q: 'Do you ship internationally?', a: 'Yes, we ship to over 40 countries. International shipping rates and delivery times vary by destination. Duties and taxes may apply and are the responsibility of the recipient.' },
      { q: 'How can I track my order?', a: 'Once your order ships, you\'ll receive a tracking number via email. You can use this to track your package on our website or the carrier\'s website.' },
      { q: 'Can I modify or cancel my order?', a: 'Orders can be modified or cancelled within 1 hour of placement. After that, the order enters processing and cannot be changed. Please contact us immediately if you need to make changes.' },
    ],
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original condition with tags attached. Sale items are final sale.' },
      { q: 'How do I initiate a return?', a: 'Log in to your account, navigate to Order History, select the item(s) you wish to return, and follow the prompts. You\'ll receive a prepaid return label via email.' },
      { q: 'How long do refunds take?', a: 'Once we receive your return, please allow 3–5 business days for inspection. Refunds are then processed to your original payment method within 5–7 business days.' },
      { q: 'Can I exchange an item for a different size?', a: 'Yes! We offer free exchanges for size or colour. Simply initiate a return and select "Exchange" rather than "Refund." We\'ll send out the replacement once we receive the original.' },
    ],
  },
  {
    category: 'Products & Sizing',
    questions: [
      { q: 'How do I find my size?', a: 'Visit our Size Guide page for detailed measurements. We recommend measuring yourself and comparing to the size chart rather than going by your usual size, as fit varies by style.' },
      { q: 'Are your products sustainable?', a: 'Sustainability is at the heart of everything we do. We use certified organic, recycled, and responsibly sourced materials. Our packaging is 100% recyclable and plastic-free.' },
      { q: 'How should I care for my garments?', a: 'Each item includes care instructions on the label. Generally, we recommend gentle machine washing in cold water for most items, and dry cleaning for structured pieces and delicate fabrics.' },
      { q: 'Are the colours accurate in photos?', a: 'We work hard to represent colours accurately, but slight variations may occur due to screen settings. If you\'re unsure about a colour, contact us and we\'ll be happy to help.' },
    ],
  },
  {
    category: 'Account & Payments',
    questions: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption.' },
      { q: 'Is my payment information secure?', a: 'Absolutely. We never store your full card details on our servers. All payment processing is handled by industry-leading, PCI-compliant providers.' },
      { q: 'Do you offer gift cards?', a: 'Yes! Lumière digital gift cards are available in denominations of $50, $100, $200, and $500. They\'re delivered by email and never expire.' },
    ],
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-sm font-medium text-[#1a1a1a] pr-8 group-hover:text-[#c4a484] transition-colors">{question}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-gray-600 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(FAQ_DATA[0].category);

  return (
    <div className="min-h-screen bg-[#f5f2ed] pt-28 pb-16 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
        <div className="mt-6 mb-16 text-center">
          <p className="text-[#c4a484] text-xs tracking-widest mb-4">NEED HELP?</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1a1a1a]">Frequently Asked Questions</h1>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {FAQ_DATA.map(cat => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-5 py-2.5 text-xs tracking-widest transition-colors ${activeCategory === cat.category ? 'bg-[#1a1a1a] text-white' : 'bg-white text-[#2c2c2c] hover:border-[#c4a484] hover:text-[#c4a484] border border-gray-200'}`}
            >
              {cat.category.toUpperCase()}
            </button>
          ))}
        </div>

        {FAQ_DATA.filter(cat => cat.category === activeCategory).map(cat => (
          <div key={cat.category} className="bg-white p-8 shadow-sm">
            {cat.questions.map((item, idx) => (
              <FAQItem key={idx} question={item.q} answer={item.a} />
            ))}
          </div>
        ))}

        <div className="mt-12 bg-[#1a1a1a] text-white p-8 text-center">
          <p className="font-serif text-2xl mb-3">Still have questions?</p>
          <p className="text-gray-400 text-sm mb-6">Our team is happy to help. Reach out and we'll respond within 24 hours.</p>
          <a href="/contact" className="inline-block border border-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-[#1a1a1a] transition-colors">
            CONTACT US
          </a>
        </div>
      </div>
    </div>
  );
}
