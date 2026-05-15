import { useState, useEffect } from 'react';
import { useGlobalData } from '../../../services/globalDataManager';
import { CMSData, LoadingState } from '../types';

export const useFranchisingData = () => {
  const [cms, setCms] = useState<CMSData | null>(null);
  const globalData = useGlobalData();

  useEffect(() => {
    const processFranchisingData = () => {
      const franchisingData = globalData.getPageData("franchising");
      
      if (franchisingData) {
        // Handle both data structures: direct properties or nested under sections
        const sections = franchisingData.sections || franchisingData;
        
        const newCmsData = {
          franchising: {
            titleSection: franchisingData.titleSection || sections.titleSection,
            comingSoonSection: franchisingData.comingSoonSection || sections.comingSoonSection,
            facts: franchisingData.facts || sections.facts,
            form: franchisingData.form || sections.form,
            franchisingJourneySection: franchisingData.franchisingJourneySection || sections.franchisingJourneySection,
            getStarted: franchisingData.getStarted || sections.getStarted,
            imagesSection: franchisingData.imagesSection || sections.imagesSection,
            siteCriteria: franchisingData.siteCriteria || sections.siteCriteria,
            testimonialsSection: franchisingData.testimonialsSection || sections.testimonialsSection,
            whyChooseCluck: franchisingData.whyChooseCluck || sections.whyChooseCluck,
          }
        };
        
        setCms(newCmsData);
      }
    };

    // Process data when global data changes
    if (globalData.isLoaded && globalData.data) {
      processFranchisingData();
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