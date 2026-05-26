import React from 'react';
import Breadcrumb from '../../components/ui/Breadcrumb';

const SECTIONS = [
  { title: '1. Acceptance of Terms', content: 'By accessing and using the Lumière Fashion website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.' },
  { title: '2. Use of the Website', content: 'You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others. You must not misuse our website by introducing viruses or other malicious code, attempting to gain unauthorized access, or engaging in any conduct that restricts or inhibits anyone\'s use or enjoyment of the website.' },
  { title: '3. Product Information', content: 'We strive to display as accurately as possible the colours and features of our products. However, we cannot guarantee that your device\'s display will accurately reflect the actual colours. Prices and availability are subject to change without notice. We reserve the right to discontinue any product at any time.' },
  { title: '4. Ordering and Payment', content: 'When you place an order, you represent that you are legally capable of entering into binding contracts. All orders are subject to acceptance by us. We reserve the right to refuse any order at our discretion. Payment must be made in full before orders are processed and shipped.' },
  { title: '5. Intellectual Property', content: 'All content on this website, including text, images, logos, and software, is the property of Lumière Fashion and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.' },
  { title: '6. Limitation of Liability', content: 'Lumière Fashion shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our website or products. Our liability is limited to the maximum extent permitted by applicable law.' },
  { title: '7. Governing Law', content: 'These Terms of Service shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.' },
  { title: '8. Changes to Terms', content: 'We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after any changes constitutes acceptance of the new terms.' },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ed] pt-28 pb-16 font-sans">
      <div className="max-w-3xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />
        <div className="mt-6 mb-12">
          <p className="text-[#c4a484] text-xs tracking-widest mb-4">LEGAL</p>
          <h1 className="font-serif text-4xl text-[#1a1a1a]">Terms of Service</h1>
          <p className="text-gray-500 mt-2 text-sm">Last updated: May 1, 2026</p>
        </div>

        <div className="bg-white p-8 shadow-sm space-y-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            Welcome to Lumière Fashion. These Terms of Service govern your use of our website and purchase of our products. Please read them carefully before using our services.
          </p>
          {SECTIONS.map((section, idx) => (
            <div key={idx}>
              <h2 className="font-serif text-xl text-[#1a1a1a] mb-3">{section.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
          <div className="border-t border-gray-100 pt-6">
            <h2 className="font-serif text-xl text-[#1a1a1a] mb-3">Contact Us</h2>
            <p className="text-sm text-gray-600">
              Questions about these Terms? Contact us at{' '}
              <a href="mailto:legal@lumiere.com" className="text-[#c4a484] hover:underline">legal@lumiere.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
