import React from 'react';
import { Star } from 'lucide-react';

export default function Rating({ value, count, size = 'sm', showCount = true }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(value);
    const partial = !filled && i < value;
    return { filled, partial };
  });

  const sizeMap = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
  const iconSize = sizeMap[size] || sizeMap.sm;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {stars.map((s, i) => (
          <Star
            key={i}
            className={`${iconSize} ${s.filled ? 'fill-[#c4a484] text-[#c4a484]' : 'text-gray-300'}`}
          />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-gray-500 font-sans">({count})</span>
      )}
    </div>
  );
}
