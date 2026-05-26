import React from 'react';
import Breadcrumb from '../../components/ui/Breadcrumb';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly to us, such as your name, email address, shipping address, and payment information when you make a purchase or create an account.

We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about your use of our website.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information we collect to process your orders and payments, send you order confirmations and shipping updates, respond to your comments and questions, and send you marketing communications (with your consent).

We also use this information to analyse trends and improve our website and services.`,
  },
  {
    title: '3. Information Sharing',
    content: `We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except to provide products or services you've requested. This includes our website hosting partners and other parties who assist us in operating our website, as long as those parties agree to keep this information confidential.`,
  },
  {
    title: '4. Cookies',
    content: `We use cookies to help remember and process the items in your shopping cart, understand and save your preferences for future visits, and compile aggregate data about site traffic and interaction.

You can choose to disable cookies through your browser settings, though this may affect your ability to use certain features of our website.`,
  },
  {
    title: '5. Data Security',
    content: `We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights. All sensitive information you supply is encrypted via Secure Socket Layer (SSL) technology.`,
  },
  {
    title: '6. Your Rights',
    content: `You have the right to access, update, or delete the information we have on you. You may request a copy of your personal data, ask us to correct any inaccuracies, or request deletion of your account by contacting us at privacy@lumiere.com.`,
  },
  {
    title: '7. Changes to This Policy',
    content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "last updated" date.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f5f2ed] pt-28 pb-16 font-sans">
      <div className="max-w-3xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
        <div className="mt-6 mb-12">
          <p className="text-[#c4a484] text-xs tracking-widest mb-4">LEGAL</p>
          <h1 className="font-serif text-4xl text-[#1a1a1a]">Privacy Policy</h1>
          <p className="text-gray-500 mt-2 text-sm">Last updated: May 1, 2026</p>
        </div>

        <div className="bg-white p-8 shadow-sm space-y-8">
          <p className="text-sm text-gray-600 leading-relaxed">
            At Lumière Fashion, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
          </p>

          {SECTIONS.map((section, idx) => (
            <div key={idx}>
              <h2 className="font-serif text-xl text-[#1a1a1a] mb-3">{section.title}</h2>
              {section.content.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm text-gray-600 leading-relaxed mb-3">{para}</p>
              ))}
            </div>
          ))}

          <div className="border-t border-gray-100 pt-6">
            <h2 className="font-serif text-xl text-[#1a1a1a] mb-3">Contact Us</h2>
            <p className="text-sm text-gray-600">
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:privacy@lumiere.com" className="text-[#c4a484] hover:underline">privacy@lumiere.com</a>
              {' '}or write to us at: Lumière Fashion, 123 Fashion Avenue, New York, NY 10001.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
