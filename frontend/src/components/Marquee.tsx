import React from 'react';

interface MarqueeProps {
  items: string[];
}

export const Marquee: React.FC<MarqueeProps> = ({ items }) => {
  return (
    <div className="marquee-wrapper select-none">
      <div className="marquee-content">
        {items.concat(items).concat(items).map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span className="dot" />
            <span className="cursor-target">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
