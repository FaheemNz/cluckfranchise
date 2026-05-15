import { useState, useEffect } from 'react';
import { useGlobalData } from '../../../../services/globalDataManager';
import { CMSData, LoadingState, GalleryItem } from '../types';

export const useGalleryData = () => {
  const [cms, setCms] = useState<CMSData | null>(null);
  const globalData = useGlobalData();

  useEffect(() => {
    const processGalleryData = () => {
      // Try to get gallery data from localStorage
      const galleryData = globalData.getPageData("gallery") || globalData.getPageData("Gallery");
      
      if (galleryData) {
        // Handle both data structures: direct properties or nested under sections
        const sections = galleryData.sections || galleryData;
        
        // Normalize gallery items from various possible structures
        const normalizeGalleryItems = (items: any): GalleryItem[] => {
          if (!items || !Array.isArray(items)) return [];
          
          return items.map((item: any, index: number) => {
            if (typeof item === 'string') {
              return { 
                id: index + 1, 
                url: item,
                title: `Gallery Image ${index + 1}` 
              } as GalleryItem;
            }
            
            // If object, normalize to standard structure
            const imageField = item.url || item.img || item.image || item.imageUrl || item.src;
            return {
              id: item.id ?? index + 1,
              url: imageField || '',
              title: item.title || item.name || item.caption || `Gallery Image ${index + 1}`,
              // Keep legacy fields for backward compatibility
              img: item.img,
              image: item.image,
              imageUrl: item.imageUrl,
              src: item.src,
              name: item.name,
              caption: item.caption,
            } as GalleryItem;
          });
        };

        const newCmsData = {
          gallery: {
            titleSection: galleryData.titleSection || sections.titleSection,
            imagesSection: galleryData.imagesSection || sections.imagesSection ? {
              ...(galleryData.imagesSection || sections.imagesSection),
              images: normalizeGalleryItems(
                galleryData.imagesSection?.images || 
                sections.imagesSection?.images ||
                galleryData.images ||
                sections.images ||
                galleryData.gallery ||
                sections.gallery ||
                galleryData.items ||
                sections.items
              )
            } : undefined
          }
        };
        
        setCms(newCmsData);
      }
    };

    // Process data when global data changes
    if (globalData.isLoaded && globalData.data) {
      processGalleryData();
    }
  }, [globalData.isLoaded, globalData.data]);

  const retry = () => {
    globalData.reset();
    globalData.fetchData();
  };

  return {
    cms,
    loadingState: {
      isLoading: globalData.isLoading,
      error: globalData.error
    },
    retry
  };
};