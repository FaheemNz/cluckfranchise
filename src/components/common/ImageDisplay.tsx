import React from 'react';
import OptimizedImage from '../Home/OptimizedImage';

interface ImageData {
  title: string;
  url: string;
}

interface ImageDisplayProps {
  image: ImageData;
  link?: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  onLoad?: () => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  image,
  link,
  alt,
  className = "max-w-full h-auto rounded-lg shadow-lg",
  loading = "lazy",
  onLoad
}) => {
  if (!image?.url) {
    return null;
  }

  const imageElement = (
    <OptimizedImage
      src={image.url}
      alt={alt || image.title || 'Image'}
      className={className}
      loading={loading}
      onLoad={onLoad}
    />
  );

  // If link is provided, wrap the image in a clickable link
  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer hover:opacity-90 transition-opacity duration-300"
      >
        {imageElement}
      </a>
    );
  }

  // Return just the image if no link
  return imageElement;
};

export default ImageDisplay;
