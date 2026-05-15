import { useState, useEffect } from 'react';
import { useGlobalData } from '../../../../services/globalDataManager';
import { CMSData, LoadingState } from '../types';

export const useHalalData = () => {
  const [cms, setCms] = useState<CMSData | null>(null);
  const globalData = useGlobalData();

  useEffect(() => {
    const processHalalData = () => {
      const halalData = globalData.getPageData("halal");
      
      if (halalData) {
        // Handle both data structures: prioritize direct properties over sections
        const sections = halalData.sections || halalData;
        
        const newCmsData = {
          halal: {
            titleSection: halalData.titleSection || sections.titleSection,
            bannerSection: halalData.bannerSection || sections.bannerSection,
            imagesSection: halalData.imagesSection || sections.imagesSection,
          }
        };
        
        setCms(newCmsData);
      }
    };

    // Process data when global data changes
    if (globalData.isLoaded && globalData.data) {
      processHalalData();
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