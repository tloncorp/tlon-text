import React from 'react';
import type { HomeCard } from '../../utils/types';

interface BaseCardProps {
  index: number;
  cardType: "hero" | "feature" | "posts" | "videoGallery";
  children: React.ReactNode;
}

const BaseCard: React.FC<BaseCardProps> = ({ index, children }) => {
  return (
    <div 
      className="card w-full rounded-2xl overflow-hidden relative mb-[12vh] aspect-[3/4] md:aspect-square"
      style={{ 
        opacity: 1,
        transform: 'translateY(0)',
        transition: `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`
      }}
    >
      {children}
    </div>
  );
};

export default BaseCard;