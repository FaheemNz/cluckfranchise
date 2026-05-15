'use client'

import React, { useState, useEffect } from "react";
import ProductModal from "../../components/common/Menu/ProductModal";
import Pagebanner from "../../components/common/Pagebanner";
import ErrorBoundary from "../../components/Home/ErrorBoundary";
import { processImageUrl } from "../../utils/imageUtils";
import LocationCard from "../../components/Locations/LocationCard";
import NotFound from "../404";
import Link from "next/link";
import { useParams } from "next/navigation";


interface MenuProps {
  cmsData: any;
  menuData: any;
}

const Menu: React.FC<MenuProps> = ({ cmsData, menuData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [locationId, setLocationId] = useState<number | null>(null);
  const [selectedMobileLocationId, setSelectedMobileLocationId] = useState<
    number | null
  >(null);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  // Use the custom hook for CMS data and locations
  const cms = menuData;


  const allCMS = cmsData || {};

  const [mergedLocations, setMergedLocations] = useState<any[]>([]);

  useEffect(() => {
    const canadaCards =
      allCMS?.["canada-locations"]?.sections?.locationsSection?.cards || [];
    const usaCards =
      allCMS?.["usa-locations"]?.sections?.locationsSection?.cards || [];

    console.log("🇨🇦 Canada cards count:", canadaCards.length, canadaCards);
    console.log("🇺🇸 USA cards count:", usaCards.length, usaCards);

    // Combine Canada + USA
    const combined = [...canadaCards, ...usaCards]
      .filter((loc) => loc && loc.title) // keep even if id is missing
      .map((loc) => ({
        id: Number(loc.id) || null,
        title: loc.title,
        address1: loc.address1,
        address2: loc.address2,
        phone: loc.phone,
        description: loc.description,
        timings: loc.timings,
        links: loc.links,
      }));

    console.log("🌍 Combined total locations:", combined.length, combined);

    setMergedLocations(combined);
  }, [allCMS]);


  //   const transformedLocations =
  //     menuLocations?.map((card: any) => ({
  //       id: card.id?.toString(),
  //       name: card.title?.toUpperCase(),
  //       address: {
  //         street: card.address1,
  //         city: card.address2?.split(",")[0]?.trim() || "",
  //         province: card.address2?.split(",")[1]?.trim() || "",
  //         postalCode: card.address2?.split(",")[2]?.trim() || "",
  //         country: card.address2?.includes("Canada") ? "Canada" : "United States",
  //       },
  //       phone: card.phone,
  //       hours: card.timings ? { timings: card.timings } : undefined,
  //       features: card.features,
  //       links: card.links,
  //     })) || [];

  // Get location ID from URL query parameter and update when URL changes
  const params = useParams();

  const locationSlug = params?.location as string;
  const slug = params?.slug as string;

  // HANDLE LOCATION SLUG (ajax → locationId 21)
  useEffect(() => {
    // Wait until locations are loaded
    if (!mergedLocations.length) return;

    if (locationSlug) {
      const matchedLocation = mergedLocations.find(
        (loc: any) =>
          loc.title
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "") === locationSlug,
      );

      if (matchedLocation) {
        setLocationId(Number(matchedLocation.id));
        setSelectedMobileLocationId(Number(matchedLocation.id));
      } else {
        setLocationId(null);
        setSelectedMobileLocationId(null);
      }
    } else {
      // no slug → show all items
      setLocationId(null);
      setSelectedMobileLocationId(null);
    }

    // Handle item modal (same as before)
    if (!slug || !cms?.sections?.menuSection?.menuItems) return;

    const allItems = cms.sections.menuSection.menuItems.flatMap(
      (cat: any) => cat.items,
    );

    const matchedItem = allItems.find((i: any) => slugify(i.title) === slug);

    if (matchedItem) {
      setSelectedProduct({
        id: matchedItem.id,
        title: matchedItem.title,
        desc: matchedItem.description,
        img: matchedItem.image?.url,
        reviews: matchedItem.reviews_count || 0,
        locations: matchedItem.locations || [],
      });
      setModalOpen(true);
    }
  }, [locationSlug, slug, mergedLocations, cms]);

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setModalOpen(true);

    const menuSlug = slugify(product.location || "menu");
    const itemSlug = slugify(product.title);

    // Build hash URL
    const hash = `menu=${menuSlug}&item=${itemSlug}`;

    // Update hash without reloading
    window.location.hash = hash;
  };

  // Transform API data to match the existing component structure
  const transformMenuData = () => {
    if (!cms?.sections?.menuSection?.menuItems) return [];

    return cms.sections.menuSection.menuItems
      .map((category: any) => {
        // Use URL locationId first, then mobile dropdown selection, then show all items
        const activeLocationId = locationId || selectedMobileLocationId;

        // Filter items based on location ID if provided
        const filteredItems = activeLocationId
          ? category.items.filter(
            (item: any) =>
              item.locations &&
              item.locations.some((loc: any) => loc.id === activeLocationId),
          )
          : category.items;

        return {
          title: category.category,
          products: filteredItems.map((item: any) => ({
            id: item.id, // Pass the actual item ID
            img: item.image?.url
              ? item.image.url.startsWith("http")
                ? item.image.url
                : processImageUrl(item.image.url)
              : undefined, // No fallback image
            title: item.title,
            location: activeLocationId
              ? item.locations?.find((loc: any) => loc.id === activeLocationId)
                ?.title || "Unknown"
              : "All Locations",
            likes: Math.floor(Math.random() * 30) + 1, // Random likes for now
            reviews: item.reviews_count || 0,
            desc: item.description,
            locations: item.locations || [],
          })),
        };
      })
      .filter((category: any) => category.products.length > 0); // Only show categories that have items
  };

  const categories = transformMenuData();

  const isValidLocation = !locationSlug
    ? true
    : mergedLocations.some(
      (loc) =>
        loc.title
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "") === locationSlug,
    );

  if (!isValidLocation) {
    return <NotFound />;
  }

  return (
    <>
      <ErrorBoundary>
        <Pagebanner
          title={
            locationId
              ? `${(() => {
                const loc = mergedLocations.find(
                  (l: any) => Number(l.id) === Number(locationId),
                );
                return loc?.title
                  ? `Best Chicken Restaurant ${loc.title}`
                  : "Menu";
              })()}`
              : cms?.sections?.titleSection?.title || "Menu"
          }
          subtitle={locationId ? "Location Details + Menu" : undefined}
        />

        {/* Location Description (Full Width under Banner) */}
        {locationId &&
          (() => {
            const activeLocation = mergedLocations.find(
              (loc: any) => Number(loc.id) === Number(locationId),
            );

            if (!activeLocation?.description) return null;

            return (
              <div className="bg-[#FFF6EE] py-10 px-6 sm:px-1 md:px-20 text-center">
                <div className="max-w-5xl mx-auto">
                  <p
                    className="text-[#894207] text-lg md:text-xl leading-relaxed font-normal"
                    style={{
                      fontFamily: "sans-serif",
                      whiteSpace: "pre-line",
                      lineHeight: "1.8",
                    }}
                  >
                    {activeLocation.description}
                  </p>
                </div>
              </div>
            );
          })()}

        {locationId &&
          (() => {
            const activeLocation = mergedLocations.find(
              (loc: any) => Number(loc.id) === Number(locationId),
            );

            if (!activeLocation) {
              console.warn("⚠️ No active location found for ID:", locationId);
              return null;
            }

            let mapUrl = activeLocation?.links?.primary?.map || null;
            if (mapUrl) {
              mapUrl = mapUrl
                .replace(/\\+"/g, '"')
                .replace(/"[\s\S]*$/, "")
                .split("\\")
                .join("")
                .trim();
            }

            return (
              <div className="background-images flex items-center justify-center my-10">
                <div
                  className="grandparent w-[96%] max-w-[1200px] border-[3px] sm:border-[12px] md:border-[16px] border-[#894207]
            rounded-[12px] sm:rounded-[16px] md:rounded-[20px] bg-[#ffff] p-2 sm:p-8"
                >
                  <div className="flex flex-col md:flex-row items-stretch gap-6">
                    {/* LEFT: INFO CARD */}
                    <div className="w-full md:w-1/2 flex justify-center">
                      <div className="bg-white rounded-lg shadow-md p-8 w-full h-full text-center text-[#894207] border border-[#f3e3d3]">
                        {/* Title */}
                        {activeLocation.title && (
                          <h2
                            className="text-[28px] md:text-[36px] font-extrabold text-[#E5573D] uppercase tracking-wide font-['MDNichrome-Black'] mb-3 truncate overflow-hidden whitespace-nowrap text-ellipsis"
                            title={activeLocation.title}
                          >
                            {activeLocation.title}
                          </h2>
                        )}

                        {/* Address Lines */}
                        {activeLocation.address1 && (
                          <p
                            className="text-lg md:text-xl mb-1 overflow-hidden whitespace-nowrap text-ellipsis"
                            title={activeLocation.address1}
                          >
                            {activeLocation.address1}
                          </p>
                        )}
                        {activeLocation.address2 && (
                          <p
                            className="text-lg md:text-xl mb-3 overflow-hidden whitespace-nowrap text-ellipsis"
                            title={activeLocation.address2}
                          >
                            {activeLocation.address2}
                          </p>
                        )}

                        {/* Get Directions */}
                        {activeLocation?.links?.primary?.map && (
                          <a
                            href={activeLocation.links.primary.map_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center border border-[#894207] text-[#894207] px-6 py-3 rounded-lg font-bold hover:bg-[#f15b40] hover:border-[#f15b40] hover:text-white transition-all duration-200 uppercase tracking-wide mb-4"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              viewBox="0 0 16 16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M2 7.333l12.667-6-6 12.667-1.334-5.333L2 7.334z" />
                            </svg>
                            Get Directions
                          </a>
                        )}

                        {/* Phone */}
                        {activeLocation.phone && (
                          <div className="text-center mb-4">
                            <a
                              href={`tel:${activeLocation.phone}`}
                              className="text-lg font-semibold hover:text-[#f15b40] transition-colors duration-200"
                            >
                              {activeLocation.phone}
                            </a>
                          </div>
                        )}

                        {/* Order Online */}
                        {activeLocation.links?.primary?.order && (
                          <button
                            onClick={() =>
                              window.open(
                                activeLocation.links.primary.order,
                                "_blank",
                              )
                            }
                            className="w-full bg-[#f15b40] text-white text-[16px] font-bold py-3 px-6 rounded-lg hover:bg-[#f3c317] hover:text-[#653003] transition-all duration-200 uppercase tracking-wide mb-6"
                          >
                            Order Online
                          </button>
                        )}

                        {/* Social Icons */}
                        {activeLocation.links?.social &&
                          activeLocation.links.social.length > 0 && (
                            <div className="flex justify-center gap-4 mb-6">
                              {activeLocation.links.social.map(
                                (social: any, i: number) => (
                                  <a
                                    key={i}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#894207] hover:text-[#f15b40] transition-colors duration-200"
                                  >
                                    <i
                                      className={`fab fa-${social.platform.toLowerCase()} text-2xl`}
                                    ></i>
                                  </a>
                                ),
                              )}
                            </div>
                          )}

                        {/* Timings */}
                        {activeLocation.timings && (
                          <div className="text-base md:text-lg mt-3">
                            {Array.isArray(activeLocation.timings) ? (
                              activeLocation.timings.map(
                                (t: any, i: number) => (
                                  <div
                                    key={i}
                                    className="overflow-hidden whitespace-nowrap text-ellipsis"
                                    title={
                                      typeof t === "object"
                                        ? `${t.days}: ${t.time}`
                                        : t
                                    }
                                  >
                                    {typeof t === "object"
                                      ? `${t.days}: ${t.time}`
                                      : t}
                                  </div>
                                ),
                              )
                            ) : (
                              <p
                                className="overflow-hidden whitespace-nowrap text-ellipsis"
                                title={activeLocation.timings}
                              >
                                {activeLocation.timings}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* RIGHT: MAP */}
                    {mapUrl && (
                      <div className="w-full md:w-1/2">
                        <div
                          className="w-full rounded-lg overflow-hidden shadow-lg border-2 border-[#F15B40]"
                          style={{ height: "500px" }}
                        >
                          <iframe
                            src={mapUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`${activeLocation.title} Map`}
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

        <div className=" background-images flex items-center justify-center my-5 sm:mt-8 md:mt-10">
          <div
            className="grandparent w-[97%] max-w-[1200px] border-[8px] sm:border-[12px] md:border-[16px] border-[#894207]
            rounded-[12px] sm:rounded-[16px] md:rounded-[20px] bg-[#ffff]"
          >
            {/* Mobile-only Location Filter Dropdown */}
            <div className="block p-4 border-b border-[#F3E3D3]">
              <select
                value={selectedMobileLocationId || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedMobileLocationId(
                    value ? parseInt(value, 10) : null,
                  );
                }}
                className="w-full p-3 border-2 border-[#894207] rounded-lg bg-white text-[#894207] font-medium focus:outline-none focus:ring-2 focus:ring-[#894207] focus:ring-opacity-50"
              >
                <option value="">
                  Please select a location to view its menu
                </option>
                {mergedLocations.length > 0 ? (
                  mergedLocations.map((location: any) => (
                    <option key={location.id} value={location.id}>
                      {location.title}
                    </option>
                  ))
                ) : (
                  // Fallback locations if API data is not available
                  <>
                    <option value={15}>No Data Available</option>
                  </>
                )}
              </select>
            </div>
            {/* Only render menu if visible in API */}
            {cms?.sections?.menuSection?.visible &&
              categories.map((category: any, catIdx: any)  => (
                <div key={catIdx} className="parent bg-[#FFFFFF] p-4 sm:p-6">
                  {/* Category Title */}
                  <div className="title text-[#F15B41] mb-4 sm:mb-6">
                    <h2 className="font-[MDNichrome-Black] text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-wide text-left border-b-[3px] sm:border-b-[4px] md:border-b-[6px] border-[#F15B41] pb-1 sm:pb-2">
                      {category.title}
                    </h2>
                  </div>
                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                    {category.products.map((product: any, idx: any) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row items-center sm:items-start gap-3 
                                        sm:gap-4 md:gap-6 relative p-3 sm:p-4 md:p-6 cursor-pointer border-b border-[#F3E3D3]
                                         transition"
                        onClick={() => handleProductClick(product)}
                      >
                        {/* Fixed image container - only show if image exists */}

                        {product.img && (
                          <div className="min-w-[96px] sm:min-w-[112px] md:min-w-[128px]">
                            <img
                              className="md:w-32 md:h-auto"
                              src={product.img}
                              alt={product.title}
                            />
                          </div>
                        )}
                        <div
                          className={`flex-1 ${product.img ? "mt-3 sm:mt-0" : ""
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <h3
                              className="text-[#894207] text-xl sm:text-2xl md:text-3xl
  font-extrabold tracking-[-0.5px] md:tracking-[-1px] mb-1 sm:mb-2"
                              style={{
                                fontFamily:
                                  '"MDNichrome", "Arial Black", "Helvetica Black",  sans-serif',
                              }}
                            >
                              <Link
                                href={`/items/${slugify(product.title)}`}
                                onClick={(e) => e.stopPropagation()}
                                className="hover:text-[#F15B40] transition-colors duration-200"
                              >
                                {product.title}
                              </Link>
                            </h3>
                          </div>
                          <p
                            className="text-[#894207] font-sans text-sm  sm:text-base md:text-xl mb-2 sm:mb-3 md:mb-4 w-full
                                             sm:w-[90%] md:w-[80%] font-normal"
                          >
                            {product.desc}{" "}
                          </p>
                          <div className="flex items-center text-[#894207] font-medium text-sm sm:text-base">
                            <span className="flex items-center gap-1 sm:gap-2 hover:bg-[#F5F5F5] p-2">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#894207"
                                strokeWidth="2"
                                className="w-4 h-4 sm:w-[18px] sm:h-[18px] "
                              >
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                              </svg>
                              {product.reviews}{" "}
                              {product.reviews === 1 ? "Review" : "Reviews"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

            {/* Show message if no menu data available */}
            {!cms?.sections?.menuSection?.visible && (
              <div className="p-8 text-center">
                <p className="text-[#894207] text-lg">Menu coming soon!</p>
              </div>
            )}

            {/* Show message if no items available for selected location */}
            {cms?.sections?.menuSection?.visible &&
              categories.length === 0 &&
              (locationId || selectedMobileLocationId) && (
                <div className="p-8 text-center">
                  <p className="text-[#894207] text-lg">
                    No menu items available for this location.
                  </p>
                </div>
              )}

            {/* Modal */}
            <ProductModal
              open={modalOpen}
              activeLocationId={locationId || selectedMobileLocationId}
              onClose={() => {
                setModalOpen(false);
                setSelectedProduct(null);
                window.history.replaceState(
                  null,
                  "",
                  window.location.pathname,
                );
              }}
              product={selectedProduct || {}}
              allLocations={mergedLocations}
            />
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default Menu;
