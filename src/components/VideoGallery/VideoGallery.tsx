import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { urlForImage } from '../../utils/urlForImage';

interface VideoGalleryProps {
  headline?: string;
  body?: string;
  videos?: {
    title: string;
    video: {
      url: string;
      poster: string | null;
      width: number | null;
      height: number | null;
    };
  }[];
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ headline = '', body = '', videos = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Add safety check
  if (!videos || videos.length === 0) {
    return <div>No videos available</div>;
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen();
      }
      videoRef.current.play();
    }
  };

  return (
    <div className="w-full">
      {/* Title Section */}
      <div className="text-center py-12">
        {headline && <h2 className="text-xl text-[#222222] font-medium mt-6 tracking-tight">{headline}</h2>}
        {body && <p className="text-neutral-400 mt-2 max-w-2xl mx-auto">{body}</p>}
      </div>

      {/* Carousel Video Layout */}
      <div className="max-w-[250rem] mx-auto relative overflow-hidden h-[calc(100%-12rem)] flex flex-col justify-between">
        <div className="flex items-center justify-center -mx-[80%] flex-1 mt-12">
          {/* Previous Video Preview */}
          <div className="hidden md:block w-[1200%] cursor-pointer transition-opacity" onClick={handlePrev}>
            <div className="aspect-video">
              <video
                src={videos[(currentIndex - 1 + videos.length) % videos.length].video.url}
                className="w-full h-full object-cover rounded-lg"
                poster={videos[(currentIndex - 1 + videos.length) % videos.length].video.poster ? 
                  urlForImage(videos[(currentIndex - 1 + videos.length) % videos.length].video.poster).width(800).url() : 
                  undefined}
              />
            </div>
          </div>

          {/* Main Video */}
          <div className="w-full md:w-[1200%] px-4">
            <div className="aspect-video cursor-pointer" onClick={handleVideoClick}>
              <video
                ref={videoRef}
                src={videos[currentIndex].video.url}
                className="w-full h-full object-cover rounded-lg"
                playsInline
                poster={videos[currentIndex].video.poster ? 
                  urlForImage(videos[currentIndex].video.poster).width(1600).url() : 
                  undefined}
              />
            </div>
          </div>

          {/* Next Video Preview */}
          <div className="hidden md:block w-[1200%] cursor-pointer transition-opacity" onClick={handleNext}>
            <div className="aspect-video">
              <video
                src={videos[(currentIndex + 1) % videos.length].video.url}
                className="w-full h-full object-cover rounded-lg"
                poster={videos[(currentIndex + 1) % videos.length].video.poster ? 
                  urlForImage(videos[(currentIndex + 1) % videos.length].video.poster).width(800).url() : 
                  undefined}
              />
            </div>
          </div>
        </div>


      </div>
              {/* Navigation Dots */}
        <div className="flex justify-center gap-2 pb-6 absolute bottom-0 left-0 right-0">
          {videos.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-black' : 'bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
    </div>
  );
};

export default VideoGallery;