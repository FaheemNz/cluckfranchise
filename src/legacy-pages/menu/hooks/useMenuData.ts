import { useState, useEffect } from "react";
import { fetchMenu, MenuResponse } from "../../../services/menuService";
import { MenuData, LoadingState } from "../types";
import { useGlobalData } from "../../../services/globalDataManager";

// ---------- Module-level cache (persists across route changes) ----------
let MENU_CACHE: MenuData | null = null;
let SEO_CACHE: any | null = null;
let LOC_CACHE: any[] = [];
let INFLIGHT: Promise<void> | null = null;

// optional: 10 min TTL
let CACHE_TS = 0;
const TTL_MS = 10 * 60 * 1000;
// ----------------------------------------------------------------------

export const useMenuData = () => {
  const [cms, setCms] = useState<MenuData | null>(MENU_CACHE);
  const [seo, setSeo] = useState<any | null>(SEO_CACHE);
  const [locations, setLocations] = useState<any[]>(LOC_CACHE);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: !MENU_CACHE,
    error: null,
  });

  const globalData = useGlobalData();

  const hydrateFromCache = () => {
    setCms(MENU_CACHE);
    setSeo(SEO_CACHE);
    setLocations(LOC_CACHE);
    setLoadingState({ isLoading: false, error: null });
  };

  const fetchMenuData = async (force = false) => {
    const freshEnough = MENU_CACHE && Date.now() - CACHE_TS < TTL_MS;

    if (!force && freshEnough) {
      hydrateFromCache();
      return;
    }

    // If another component already started fetching, reuse it.
    if (!force && INFLIGHT) {
      setLoadingState({ isLoading: true, error: null });
      await INFLIGHT;
      hydrateFromCache();
      return;
    }

    const doFetch = async () => {
      setLoadingState({ isLoading: true, error: null });

      const response: MenuResponse = await fetchMenu();

      if (!response.success || !response.data?.menu) {
        throw new Error("Invalid response format");
      }

      const menuData: any = response.data.menu;

      // Extract Canada + USA locations
      const canadaCards =
        menuData?.["canada-locations"]?.sections?.locationsSection?.cards || [];
      const usaCards =
        menuData?.["usa-locations"]?.sections?.locationsSection?.cards || [];

      const allCards = [...canadaCards, ...usaCards];

      const transformedLocations = allCards.map((card: any) => {
        const primaryLinks = card.links?.primary || {};
        const socialLinks = card.links?.social || [];

        return {
          id: card.id?.toString(),
          title: card.title || "",
          name: card.title?.toUpperCase(),
          address: {
            street: card.address1 || "",
            city: card.address2?.split(",")[0]?.trim() || "",
            province: card.address2?.split(",")[1]?.trim() || "",
            postalCode: card.address2?.split(",")[2]?.trim() || "",
            country: card.address2?.includes("Canada")
              ? "Canada"
              : card.address2?.includes("USA") || card.address2?.includes("TX")
              ? "United States"
              : "",
          },
          phone: card.phone || "",
          hours: card.timings ? { timings: card.timings } : undefined,
          features: card.features || [],
          links: {
            primary: {
              location: primaryLinks.location || "",
              order: primaryLinks.order || "",
              map: primaryLinks.map || "",
              map_link: primaryLinks.map_link || "",
            },
            social: socialLinks,
          },
        };
      });

      // ✅ write caches
      MENU_CACHE = menuData;
      SEO_CACHE = (response as any).seo || null;
      LOC_CACHE = transformedLocations;
      CACHE_TS = Date.now();
    };

    INFLIGHT = doFetch();

    try {
      await INFLIGHT;
      hydrateFromCache();
    } catch (err: any) {
      setLoadingState({
        isLoading: false,
        error: err?.message || "Failed to fetch menu data",
      });
    } finally {
      INFLIGHT = null;
    }
  };

  const retry = () => fetchMenuData(true);

  useEffect(() => {
    // If already cached, don’t refetch.
    if (MENU_CACHE) {
      hydrateFromCache();
      return;
    }

    fetchMenuData(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Optional fallback from globalData (only if you really need it)
  useEffect(() => {
    if (!globalData.isLoaded || !globalData.data) return;

    // If menu cache exists, don't override it
    if (MENU_CACHE) return;

    // If your globalData contains menu in future, you can hydrate here.
  }, [globalData.isLoaded, globalData.data]);

  return { cms, seo, locations, loadingState, retry };
};