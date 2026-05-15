import { useState, useEffect } from 'react';
import { useGlobalData } from '../../../services/globalDataManager';
import { CMSData, LoadingState } from '../types';

export const useCateringData = () => {
  const [cms, setCms] = useState<CMSData | null>(null);
  const globalData = useGlobalData();

  useEffect(() => {
    const processCateringData = () => {
      const cateringData = globalData.getPageData("catering");
      const allData = globalData.data;

      if (cateringData) {
        // Handle both data structures: prioritize direct properties over sections
        const sections = cateringData.sections || cateringData;
        // Try to get location data from multiple possible sources
        const locationData = cateringData.location ||
          sections.location ||
          allData?.location ||
          [];

        const newCmsData = {
          catering: {
            titleSection: cateringData.titleSection || sections.titleSection,
            bannerSection: cateringData.bannerSection || sections.bannerSection,
            formSection: cateringData.formSection || sections.formSection,
            imagesSection: cateringData.imagesSection || sections.imagesSection,
            location: locationData,
          }
        };
        setCms(newCmsData);
      }
    };

    // Process data when global data changes
    if (globalData.isLoaded && globalData.data) {
      processCateringData();
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
