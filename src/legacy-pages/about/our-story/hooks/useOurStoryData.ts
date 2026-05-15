import { useState, useEffect } from 'react';
import { useGlobalData } from '../../../../services/globalDataManager';
import { CMSData, LoadingState } from '../types';

export const useOurStoryData = () => {
  const [cms, setCms] = useState<CMSData | null>(null);
  const globalData = useGlobalData();

  useEffect(() => {
    const processOurStoryData = () => {
      // Try multiple keys for our-story data
      const aboutKeys = ['about', 'our-story', 'About', 'about-us'];
      let ourStoryData = null;
      
      for (const key of aboutKeys) {
        const data = globalData.getPageData(key);
        if (data) {
          ourStoryData = data;
          break;
        }
      }
      
      if (ourStoryData) {
        // Handle both data structures: prioritize direct properties over sections
        const sections = ourStoryData.sections || ourStoryData;
        
        // Transform cards data to match expected structure
        const transformCards = (cardsData: any) => {
          if (!cardsData || !Array.isArray(cardsData)) return [];
          
          return cardsData.map((card: any) => ({
            title: card?.title,
            description: card?.subtitle || card?.description,
            image: card?.image,
            ctaText: card?.links?.primary?.card?.text || card?.ctaText,
            ctaUrl: card?.links?.primary?.card?.url || card?.ctaUrl
          }));
        };

        const newCmsData = {
          ourStory: {
            titleSection: ourStoryData.titleSection || sections.titleSection,
            heroSection: ourStoryData.ourStorySection || sections.ourStorySection,
            philosophySection: ourStoryData.philosophySection || sections.philosophySection,
            cardsSection: ourStoryData.cardsSection || sections.cardsSection ? {
              ...(ourStoryData.cardsSection || sections.cardsSection),
              cards: transformCards(ourStoryData.cardsSection?.cards || sections.cardsSection?.cards)
            } : undefined
          }
        };
        
        setCms(newCmsData);
      }
    };

    // Process data when global data changes
    if (globalData.isLoaded && globalData.data) {
      processOurStoryData();
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
