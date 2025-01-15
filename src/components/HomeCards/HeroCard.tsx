import React from 'react';
import BaseCard from './BaseCard';
import ContentWrapper from './ContentWrapper';
import { urlForImage } from '../../utils/urlForImage';
import type { HomeCard } from '../../utils/types';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

interface HeroCardProps extends HomeCard {
  isTopCard: boolean;
  index: number;
}

const HeroCard: React.FC<HeroCardProps> = (props) => {
  const backgroundImageUrl = props.media?.photo?.asset ? 
    urlForImage(props.media.photo)
      .url()
      + '?v=1'
    : '';

  return (
    <BaseCard {...props}>
      <div 
        className="cta-card bg-[#fff] h-full relative overflow-hidden" 
        style={{ 
          backgroundImage: `url(${backgroundImageUrl})`, 
          backgroundSize: 'contain',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="flex h-full flex-col justify-start p-8 md:p-12">
          <div className="mx-auto max-w-[600px]">
            <h2 className="text-xl  text-[#222] mb-4 font-medium tracking-tight text-center whitespace-nowrap">
              Your new messenger is here.
            </h2>
            <h2 className="text-base text-[#666] mb-12 font-normal tracking-tight text-center">TM is now available for download.</h2>
            <div className="flex flex-row gap-4 w-full justify-center">
              <a
                className="rounded-lg px-6 py-3 bg-[#E2E3E0] text-[#666] w-[200px] hover:bg-[#d6d7d4] transition-colors duration-300 flex items-center"
                href="https://apps.apple.com/your-app-store-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-6 flex justify-center">
                  <FaApple className="text-2xl" />
                </div>
                <div className="flex-1 text-left ml-4 flex flex-col">
                  <span className="text-xs">Download on the</span>
                  <span className="text-base font-semibold">App Store</span>
                </div>
              </a>
              <a
                className="rounded-lg px-6 py-3 bg-[#E2E3E0] text-[#666] w-[200px] hover:bg-[#d6d7d4] transition-colors duration-300 flex items-center"
                href="https://play.google.com/store/your-play-store-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-6 flex justify-center">
                  <FaGooglePlay className="text-2xl" />
                </div>
                <div className="flex-1 text-left ml-4 flex flex-col">
                  <span className="text-xs">Get it on</span>
                  <span className="text-base font-semibold">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};

export default HeroCard;