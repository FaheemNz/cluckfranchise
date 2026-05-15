import { useState, useEffect } from 'react';
import { useGlobalData } from '../../../services/globalDataManager';
import { CMSData, LoadingState } from '../types';

export const useCMSData = () => {
  const [cms, setCms] = useState<CMSData | null>(null);
  const globalData = useGlobalData();

  useEffect(() => {
    const processHomeData = () => {
      const homeData = globalData.getPageData("home");
      
      if (homeData) {
        // Handle both data structures: prioritize direct properties over sections
        const sections = homeData.sections || homeData;
        
        const newCmsData = {
          home: {
            bannerSection: homeData.bannerSection || sections.bannerSection,
            cateringSection: homeData.cateringSection || sections.cateringSection,
            crispyAndCrunchySection: homeData.crispyAndCrunchySection || sections.crispyAndCrunchySection,
            imagesSection: homeData.imagesSection || sections.imagesSection,
            imagesSection2: homeData.imagesSection2 || sections.imagesSection2,
            newsSection: homeData.newsSection || sections.newsSection,
            reviewSection: homeData.reviewSection || sections.reviewSection,
            sliderImagesSection: homeData.sliderImagesSection || sections.sliderImagesSection,
          }
        };
        
        setCms(newCmsData);
      }
    };

    // Process data when global data changes
    if (globalData.isLoaded && globalData.data) {
      processHomeData();
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
