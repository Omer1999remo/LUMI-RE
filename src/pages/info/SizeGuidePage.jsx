import React, { useState } from 'react';
import Breadcrumb from '../../components/ui/Breadcrumb';

const WOMEN_SIZES = [
  { size: 'XS', us: '0–2', chest: '31–32"', waist: '23–24"', hips: '33–34"' },
  { size: 'S', us: '4–6', chest: '33–34"', waist: '25–26"', hips: '35–36"' },
  { size: 'M', us: '8–10', chest: '35–36"', waist: '27–28"', hips: '37–38"' },
  { size: 'L', us: '12–14', chest: '37–38"', waist: '29–30"', hips: '39–40"' },
  { size: 'XL', us: '16–18', chest: '39–41"', waist: '31–33"', hips: '41–43"' },
];

const MEN_SIZES = [
  { size: 'S', chest: '35–37"', waist: '28–30"', hip: '35–37"', sleeve: '32–33"' },
  { size: 'M', chest: '38–40"', waist: '31–33"', hip: '38–40"', sleeve: '33–34"' },
  { size: 'L', chest: '41–43"', waist: '34–36"', hip: '41–43"', sleeve: '34–35"' },
  { size: 'XL', chest: '44–46"', waist: '37–39"', hip: '44–46"', sleeve: '35–36"' },
  { size: 'XXL', chest: '47–49"', waist: '40–42"', hip: '47–49"', sleeve: '36–37"' },
];

export default function SizeGuidePage() {
  const [gender, setGender] = useState('women');
  const [unit, setUnit] = useState('in');

  return (
    <div className="min-h-screen bg-[#f5f2ed] pt-28 pb-16 font-sans">
      <div className="max-w-4xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Size Guide' }]} />
        <div className="mt-6 mb-16 text-center">
          <p className="text-[#c4a484] text-xs tracking-widest mb-4">FIT PERFECTLY</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1a1a1a]">Size Guide</h1>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto text-sm">
            Measure yourself accurately for the best fit. If you're between sizes, we recommend sizing up for a more relaxed look.
          </p>
        </div>

        {/* How to measure */}
        <div className="bg-white p-8 shadow-sm mb-8">
          <h2 className="font-serif text-2xl text-[#1a1a1a] mb-6">How to Measure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Chest / Bust', desc: 'Measure around the fullest part of your chest, keeping the tape parallel to the floor.' },
              { title: 'Waist', desc: 'Measure around your natural waistline, the narrowest part of your torso.' },
              { title: 'Hips', desc: 'Measure around the fullest part of your hips, approximately 8" below your waist.' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <div className="w-12 h-12 rounded-full bg-[#f5f2ed] flex items-center justify-center mx-auto mb-3 text-[#c4a484] font-serif text-xl">
                  {i + 1}
                </div>
                <h3 className="font-medium text-sm text-[#1a1a1a] mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {['women', 'men'].map(g => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`px-6 py-2.5 text-xs tracking-widest transition-colors capitalize ${gender === g ? 'bg-[#1a1a1a] text-white' : 'bg-white text-[#2c2c2c] border border-gray-200 hover:border-[#c4a484] hover:text-[#c4a484]'}`}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {['in', 'cm'].map(u => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-4 py-2 text-xs tracking-widest transition-colors ${unit === u ? 'bg-[#1a1a1a] text-white' : 'bg-white text-[#2c2c2c] border border-gray-200'}`}
              >
                {u.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Size table */}
        <div className="bg-white shadow-sm overflow-x-auto">
          {gender === 'women' ? (
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['SIZE', 'US SIZE', 'CHEST', 'WAIST', 'HIPS'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-xs tracking-widest text-[#2c2c2c] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {WOMEN_SIZES.map(row => (
                  <tr key={row.size} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#1a1a1a]">{row.size}</td>
                    <td className="px-6 py-4 text-gray-600">{row.us}</td>
                    <td className="px-6 py-4 text-gray-600">{row.chest}</td>
                    <td className="px-6 py-4 text-gray-600">{row.waist}</td>
                    <td className="px-6 py-4 text-gray-600">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['SIZE', 'CHEST', 'WAIST', 'HIP', 'SLEEVE'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-xs tracking-widest text-[#2c2c2c] font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MEN_SIZES.map(row => (
                  <tr key={row.size} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[#1a1a1a]">{row.size}</td>
                    <td className="px-6 py-4 text-gray-600">{row.chest}</td>
                    <td className="px-6 py-4 text-gray-600">{row.waist}</td>
                    <td className="px-6 py-4 text-gray-600">{row.hip}</td>
                    <td className="px-6 py-4 text-gray-600">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-8 bg-[#1a1a1a] text-white p-6 text-sm">
          <p className="font-medium mb-2">Need help finding your size?</p>
          <p className="text-gray-400 text-xs">Contact our styling team at <span className="text-[#c4a484]">sizing@lumiere.com</span> and we'll help you find the perfect fit.</p>
        </div>
      </div>
    </div>
  );
}
