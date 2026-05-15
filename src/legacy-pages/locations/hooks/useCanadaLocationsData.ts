import { useState, useEffect } from "react";
import { useGlobalData } from "../../../services/globalDataManager";
import { MenuData, LoadingState } from "../types";

export const useCanadaLocationsData = () => {
  const [cms, setCms] = useState<MenuData | null>(null);
  const globalData = useGlobalData();

  useEffect(() => {
    const processCanadaData = () => {
      const canadaData = globalData.getPageData("canada-locations");

      if (canadaData) {
        const sections = canadaData.sections || canadaData;

        const rawClucksSection =
          canadaData.clucksNearYouSection || sections.clucksNearYouSection;

        const clucksNearYouSection = rawClucksSection
          ? {
              ...rawClucksSection,
              links: {
                iframeLink: {
                  url: rawClucksSection?.links?.iframeLink?.url || "",
                  text:
                    rawClucksSection?.links?.iframeLink?.text || "Google Map",
                },
                mapLink: {
                  url: rawClucksSection?.links?.mapLink?.url || "",
                  text:
                    rawClucksSection?.links?.mapLink?.text || "Google Maps",
                },
              },
            }
          : null;

        // ✅ Conform exactly to CountryLocationsData interface
        const newCmsData: MenuData = {
          "canada-locations": {
            sections: {
              titleSection: sections.titleSection || null,
              clucksNearYouSection,
              comingSoonSection: sections.comingSoonSection || null,
              locationsSection: sections.locationsSection || null,
            },
          },
        };

        setCms(newCmsData);
      } else {
        console.warn("⚠️ No Canada locations data found in globalData");
      }
    };

    if (globalData.isLoaded && globalData.data) {
      processCanadaData();
    }
  }, [globalData.isLoaded, globalData.data]);

  const retry = () => {
    globalData.reset?.();
    globalData.fetchData?.();
  };

  return {
    cms,
    loadingState: {
      isLoading: globalData.isLoading,
      error: globalData.error,
    } as LoadingState,
    retry,
  };
};
