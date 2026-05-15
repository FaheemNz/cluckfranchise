'use client'

import { useState, useEffect, useCallback } from 'react';
import { ImagesSection } from '../../types/catering';
import LightboxImageDisplay from '../common/LightboxImageDisplay';
import { processImageUrl, getProcessedImageData } from '../../utils/imageUtils';

interface CateringImagesProps {
  imagesSection: ImagesSection;
  isLoading?: boolean;
}

const CateringImages: React.FC<CateringImagesProps> = ({ imagesSection, isLoading = false }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState<number>(1);

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setZoom(1);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    setZoom(1);
  };

  const handlePrev = useCallback(() => {
    setZoom(1);
    setSelectedImageIndex((prev: number | null) => 
      prev !== null && prev > 0 ? prev - 1 : (imagesSection?.images?.length || 1) - 1
    );
  }, [imagesSection?.images?.length]);

  const handleNext = useCallback(() => {
    setZoom(1);
    setSelectedImageIndex((prev: number | null) => 
      prev !== null && prev < (imagesSection?.images?.length || 1) - 1 ? prev + 1 : 0
    );
  }, [imagesSection?.images?.length]);

  const zoomIn = () => setZoom((z: number) => Math.min(z + 0.2, 3));
  const zoomOut = () => setZoom((z: number) => Math.max(z - 0.2, 0.5));

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case '+':
        case '=':
          zoomIn();
          break;
        case '-':
          zoomOut();
          break;
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('overflow-hidden');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('overflow-hidden');
    };
  }, [selectedImageIndex, handlePrev, handleNext]);

  // Get current image data for lightbox
  const getCurrentImageData = () => {
    if (selectedImageIndex === null || !imagesSection?.images) return null;
    const currentImage = imagesSection.images[selectedImageIndex];
    if (!currentImage) return null;

    return getProcessedImageData(currentImage);
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 px-2 md:px-3">
          {[1, 2, 3].map((index) => (
            <div key={index} className="relative rounded-[32px] overflow-hidden shadow-lg w-full">
              <div className="w-full h-96 md:h-[32rem] bg-gray-200 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!imagesSection?.visible || !imagesSection?.images?.length) {
    return null;
  }


  return (
        <div className="w-full">
            {/* Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 px-2 md:px-3">
        {imagesSection.images.map((image, index) => (
          <div 
            key={index} 
            className="relative group rounded-[32px] overflow-hidden shadow-lg w-full cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <img
              src={processImageUrl(image.url)}
              alt={image.title}
                        loading="lazy"
                        onError={(e) => {
                e.currentTarget.src = '/assets/logo.png';
                        }}
                        className="object-cover w-full h-96 md:h-[32rem] transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Yellow Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/70 to-yellow-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
        ))}
                </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/80 flex flex-col z-50 h-screen"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeLightbox();
            }
          }}
        >
          {/* Top-right Controls (Close + Zoom) */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex space-x-2 sm:space-x-3 z-10">
            <button
              className="bg-black/60 hover:bg-black/80 text-white px-2 py-1 sm:px-3 rounded text-lg sm:text-xl w-8 h-8 sm:w-auto sm:h-auto flex items-center justify-center"
              onClick={zoomOut}
            >
              ➖
            </button>
            <button
              className="bg-black/60 hover:bg-black/80 text-white px-2 py-1 sm:px-3 rounded text-lg sm:text-xl w-8 h-8 sm:w-auto sm:h-auto flex items-center justify-center"
              onClick={zoomIn}
            >
              ➕
            </button>
            <button
              className="bg-black/60 hover:bg-black/80 text-white px-2 py-1 sm:px-3 rounded text-xl sm:text-2xl w-8 h-8 sm:w-auto sm:h-auto flex items-center justify-center"
              onClick={closeLightbox}
            >
              ✕
            </button>
                </div>

          {/* Arrows */}
          <button
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white text-3xl sm:text-4xl bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center z-10"
            onClick={handlePrev}
          >
            ❮
          </button>
          <button
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white text-3xl sm:text-4xl bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center z-10"
            onClick={handleNext}
          >
            ❯
          </button>

          {/* Image Container */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <div className="w-full sm:w-4/5 lg:w-4/5 h-full flex justify-center items-center">
              {(() => {
                const imageData = getCurrentImageData();
                return imageData ? (
                  <LightboxImageDisplay
                    image={imageData}
                    alt={imageData.title}
                    zoom={zoom}
                    className="max-h-full max-w-full"
                  />
                ) : (
                  <div className="text-white text-xl">No image selected</div>
                );
              })()}
            </div>
          </div>

          {/* Caption */}
          <div className="bg-black/60 text-white px-6 py-3">
            <span className="text-lg font-medium">
              {getCurrentImageData()?.title || 'No image selected'}
            </span>
            </div>
        </div>
      )}
        </div>
    );
};

export default CateringImages;
