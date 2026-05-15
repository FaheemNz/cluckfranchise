'use client'

import React from "react";
import LocationCard from "../../../components/Locations/LocationCard";
import Pagebanner from "../../../components/common/Pagebanner";
import ComingSoon from "../../../components/Locations/ComingSoon";
import { useCanadaLocationsData } from "../hooks/useCanadaLocationsData";
import LoadingSpinner from "../../../components/Home/LoadingSpinner";
import ErrorMessage from "../../../components/Home/ErrorMessage";
import ErrorBoundary from "../../../components/Home/ErrorBoundary";

const Canada: React.FC = () => {
  const { cms, loadingState, retry } = useCanadaLocationsData();

  const canadaSections = cms?.["canada-locations"]?.sections;

  // Transform CMS data to match LocationCard interface
  const locations =
    canadaSections?.locationsSection?.cards?.map((card: any) => ({
      id: card.id.toString(),
      name: card.title.toUpperCase(),
      address: {
        street: card.address1,
        city: card.address2.split(",")[0]?.trim() || "",
        province: card.address2.split(",")[1]?.trim() || "",
        postalCode: card.address2.split(",")[2]?.trim() || "",
        country: "Canada",
      },
      phone: card.phone,
      hours: card.timings ? { timings: card.timings } : undefined,
      features: card.features,
      links: card.links,
    })) || [];

  if (loadingState.isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <LoadingSpinner size="lg" text="Loading locations..." />
      </div>
    );
  }

  if (loadingState.error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <ErrorMessage error={loadingState.error} onRetry={retry} />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Pagebanner
        title={canadaSections?.titleSection?.title || "Canada Locations"}
      />

      {/* Coming Soon Section */}
      {canadaSections?.comingSoonSection && (
        <ComingSoon comingSoonSection={canadaSections.comingSoonSection} />
      )}

      <div
        className="min-h-screen py-4"
        style={{
          backgroundColor: "#f4ebe4",
          backgroundImage: `url('assets/bg_img.png')`,
          backgroundSize: "auto 900px",
          backgroundPosition: "bottom left",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Clucks Near You Section */}
          {canadaSections?.clucksNearYouSection?.visible && (
            <>
              <div
                className="text-[24px] font-bold uppercase text-[#A15B21] bg-[#F3C317] px-7 py-2 mx-auto -rotate-3 leading-tight w-fit my-5"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, calc(100% - 0.8em) 50%, 100% 100%, 0 100%, 0.8em 50%)",
                }}
              >
                {canadaSections.clucksNearYouSection.ribbon_title}
              </div>

              <h1 className="text-[#EF4325] text-3xl sm:text-4xl md:text-5xl lg:text-[60px] tracking-[2px] font-bold uppercase mb-[30px] text-center font-[MDNichrome-Black]">
                {canadaSections.clucksNearYouSection.title}
              </h1>

              {/* Embedded Google Map */}
              {canadaSections.clucksNearYouSection?.links?.iframeLink?.url && (
                <div className="flex justify-center mb-8 relative">
                  <div
                    className="w-full max-w-[1400px] rounded-lg overflow-hidden shadow-lg"
                    style={{
                      height: "360px",
                      border: "2px solid #F15B40",
                      position: "relative",
                    }}
                  >
                    <iframe
                      src={
                        canadaSections.clucksNearYouSection.links.iframeLink.url
                      }
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Map"
                    ></iframe>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Locations Section */}
          {canadaSections?.locationsSection?.visible && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-items-center">
              {locations.map((location: any) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  onOrderOnline={() => {
                    const orderLink = location.links?.primary?.order;
                    if (orderLink) window.open(orderLink, "_blank");
                  }}
                  onLocationDetails={() =>
                    (window.location.href = `/menu?locationId=${location.id}`)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Canada;
