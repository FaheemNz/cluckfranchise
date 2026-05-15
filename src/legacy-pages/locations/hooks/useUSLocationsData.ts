import { useState, useEffect } from 'react';
import { useGlobalData } from '../../../services/globalDataManager';
import { CMSData, LoadingState } from '../us-types';

export const useUSLocationsData = () => {
  const [cms, setCms] = useState<CMSData | null>(null);
  const globalData = useGlobalData();

  useEffect(() => {
    const processUSData = () => {
      const usData = globalData.getPageData("usa-locations");

      if (usData) {
        const sections = usData.sections || usData;
        const rawClucksSection =
          usData.clucksNearYouSection || sections.clucksNearYouSection;

        const clucksNearYouSection = rawClucksSection
          ? {
              ...rawClucksSection,
              links: {
                iframeLink: {
                  url: rawClucksSection?.links?.iframeLink?.url || "",
                  text:
                    rawClucksSection?.links?.iframeLink?.text ||
                    "Google Map",
                },
                mapLink: {
                  url: rawClucksSection?.links?.mapLink?.url || "",
                  text:
                    rawClucksSection?.links?.mapLink?.text ||
                    "Google Maps",
                },
              },
            }
          : null;

        const newCmsData = {
          us: {
            titleSection: usData.titleSection || sections.titleSection,
            clucksNearYouSection,
            comingSoonSection:
              usData.comingSoonSection || sections.comingSoonSection,
            locationsSection:
              usData.locationsSection || sections.locationsSection,
          },
        };

        setCms(newCmsData);
      }
    };

    if (globalData.isLoaded && globalData.data) {
      processUSData();
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
      error: globalData.error,
    },
    retry,
  };
};
