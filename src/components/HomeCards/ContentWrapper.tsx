import React, { useRef, useState, useEffect } from 'react';
import type { HomeCard } from '../../utils/types';
import { urlForImage, urlForVideo } from '../../utils/urlForImage';

const ContentWrapper: React.FC<HomeCard> = ({ cardType, headline, body, button, media }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const formatHeadline = (text: string) => {
    const words = text.split(' ');
    if (words.length <= 3) return text;
    return (
      <>
        {words.slice(0, 3).join(' ')}
        <br className="md:hidden" />
        {' ' + words.slice(3).join(' ')}
      </>
    );
  };

  const toggleFullscreen = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      videoRef.current.currentTime = 0; // Reset video to beginning
      videoRef.current.muted = false; // Unmute the video
      setIsMuted(false);
      videoRef.current.requestFullscreen().then(() => {
        videoRef.current?.play(); // Ensure video plays after going fullscreen
      });
    } else {
      document.exitFullscreen();
    }
  };

  const preventVideoToggle = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const toggleMute = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isFullscreen);
      if (!isFullscreen && videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className={`max-w-[400px] mx-auto ${
      cardType === 'feature' 
        ? 'h-full flex flex-col justify-start pt-[4.25rem] md:pt-[4.25rem]' 
        : 'flex flex-col justify-center h-full'
    }`}>
      <h2 className={`text-center text-lg mb-2 font-medium tracking-tight leading-[1.2] ${
        cardType === 'feature' ? 'text-[#222]' : 'text-white'
      } ${cardType === 'story' ? 'text-2xl' : ''}`}>
        {(cardType === 'hero' || cardType === 'story') ? formatHeadline(headline) : headline}
      </h2>
      <p className={`text-center max-w-[260px] md:max-w-[340px] mx-auto mt-2 mb-2 ${
        cardType === 'feature' ? 'text-[#999]' : 'text-white'
      } ${cardType === 'story' ? 'text-lg' : ''}`}>
        {body}
      </p>
      {button && button.title && button.url && (
        <div className="text-center mt-4">
          <a
            className={`rounded-full px-4 py-2 inline-block ${
              cardType === 'feature' ? 'bg-[#222] text-white' : 'bg-white text-[#222]'
            }`}
            href={button.url}
            target={button.openNewWindow ? '_blank' : '_self'}
            rel={button.openNewWindow ? 'noopener noreferrer' : ''}
          >
            {button.title}
          </a>
        </div>
      )}
      {cardType === 'feature' && media && media.type === 'photo' && (
        <div className="mt-8 relative">
          <img 
            src={urlForImage(media.photo)} 
            alt="Feature illustration" 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80%] max-w-[300px]"
          />
        </div>
      )}
      {media && media.type === 'video' && (
        <div 
          className="absolute inset-0 cursor-pointer"
          onClick={toggleFullscreen}
        >
          <video 
            ref={videoRef}
            src={urlForVideo(media.video)} 
            autoPlay 
            loop 
            muted={true} // Always muted in card view
            playsInline 
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 scale-[250%] z-[-1]"
            onClick={preventVideoToggle}
          />
          <div className="absolute bottom-4 left-4 flex space-x-2">
            <button 
              className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-60 hover:scale-110 transition-all duration-300"
              onClick={toggleFullscreen}
            >
              {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            {isFullscreen && (
              <button 
                className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center hover:bg-opacity-60 hover:scale-110 transition-all duration-300"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                    <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentWrapper;