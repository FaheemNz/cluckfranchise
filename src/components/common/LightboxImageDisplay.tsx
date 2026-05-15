import React from 'react';
import ImageDisplay from './ImageDisplay';

interface ImageData {
  title: string;
  url: string;
}

interface LightboxImageDisplayProps {
  image: ImageData;
  zoom: number;
  alt: string;
  className?: string;
}

const LightboxImageDisplay: React.FC<LightboxImageDisplayProps> = ({
  image,
  zoom,
  alt,
  className = ""
}) => {
  return (
    <div 
      className={`transition-transform duration-300 ${className}`}
      style={{ transform: `scale(${zoom})` }}
    >
      <ImageDisplay
        image={image}
        alt={alt}
        className="max-h-full max-w-full object-contain"
      />
    </div>
  );
};

export default LightboxImageDisplay;
