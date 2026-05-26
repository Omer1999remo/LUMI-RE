import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-1 text-xs font-sans text-gray-500 flex-wrap">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />}
          {item.href ? (
            <Link to={item.href} className="hover:text-[#c4a484] transition-colors tracking-wide">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#2c2c2c] tracking-wide">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
