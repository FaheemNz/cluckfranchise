import { API_BASE } from '../services/apiConfig';
import { toAbsoluteUrl } from '../services/updatesService';

/**
 * Centralized image URL processing utility
 * Uses API_BASE from apiConfig.ts for consistent URL handling
 */
export const processImageUrl = (url: string): string => {
  if (!url) return '/assets/logo.png';
  
  try {
    if (url.startsWith('http')) {
      return url;
    } else if (url.startsWith('/storage/')) {
      return `${API_BASE}${url}`;
    } else if (url.startsWith('/uploads/') || url.startsWith('uploads/')) {
      return toAbsoluteUrl(url) || "/assets/logo.png";
    } else if (url.startsWith('/assets/') || url.startsWith('assets/')) {
      return url.startsWith('/') ? url : `/${url}`;
    } else {
      return toAbsoluteUrl(url) || "/assets/logo.png";
    }
  } catch (err) {
    return '/assets/logo.png';
  }
};

/**
 * Get current image data for lightbox with processed URL
 */
export const getProcessedImageData = (image: { title: string; url: string }) => {
  if (!image) return null;
  
  const imageSrc = image.url;
  const imageTitle = image.title;

  if (!imageSrc) return { title: imageTitle, url: '/assets/logo.png' };
  
  return {
    title: imageTitle,
    url: processImageUrl(imageSrc)
  };
};
