import React from 'react';
import BaseCard from './BaseCard';
import VideoGallery from '../VideoGallery/VideoGallery';

interface BlockVideo {
  url: string;
  poster: string | null;
  width: number | null;
  height: number | null;
}

interface VideoGalleryCardProps {
  headline?: string;
  body?: string;
  videos?: {
    title: string;
    duration: string;
    video: BlockVideo;
  }[];
  isTopCard: boolean;
  index: number;
  cardType: "hero" | "feature" | "posts" | "videoGallery";
}

const VideoGalleryCard: React.FC<VideoGalleryCardProps> = ({ isTopCard, index, cardType, ...props }) => {
  // Transform the videos data to match the expected format
  const transformedVideos = props.videos?.map(v => ({
    title: v.title,
    video: v.video
  }));

  return (
    <BaseCard isTopCard={isTopCard} index={index} cardType={cardType}>
      <div className="video-gallery-card h-full bg-white">
        <VideoGallery
          headline={props.headline || ''}
          body={props.body || ''}
          videos={transformedVideos}
        />
      </div>
    </BaseCard>
  );
};

export default VideoGalleryCard; 