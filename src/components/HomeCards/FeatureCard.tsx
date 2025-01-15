import React from 'react';
import BaseCard from './BaseCard';
import ContentWrapper from './ContentWrapper';
import type { HomeCard } from '../../utils/types';
import { urlForImage } from '../../utils/urlForImage';

interface FeatureCardProps extends HomeCard {
  isTopCard: boolean;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = (props) => {
  const backgroundImageUrl = props.media?.photo?.asset ? 
    urlForImage(props.media.photo)
      .url()
      + '?v=1'
    : '';

  return (
    <BaseCard {...props}>
      <div 
        className="feature-card bg-[#fff] h-full relative overflow-hidden"
        style={{ 
          backgroundImage: `url(${backgroundImageUrl})`, 
          backgroundSize: 'contain',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <ContentWrapper {...props} />
      </div>
    </BaseCard>
  );
};

export default FeatureCard;