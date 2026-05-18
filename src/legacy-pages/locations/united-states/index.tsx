'use client'

import React, { useState } from "react";
import LocationCard from "../../../components/Locations/LocationCard";
import Pagebanner from "../../../components/common/Pagebanner";
import ComingSoon from "../../../components/Locations/ComingSoon";
import ErrorBoundary from "../../../components/Home/ErrorBoundary";

interface UnitedStatesProps {
  cmsData: any;
}

const UnitedStates: React.FC<UnitedStatesProps> = ({ cmsData }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const usSections = cmsData?.["usa-locations"]?.sections;

  const locations =
    usSections?.locationsSection?.cards?.map((card: any) => ({
      id: card.id?.toString(),
      name: card.title?.toUpperCase(),
      address: {
        street: card.address1,
        city: card.address2?.split(",")[0]?.trim() || "",
        province: card.address2?.split(",")[1]?.trim() || "",
        postalCode: card.address2?.split(",")[2]?.trim() || "",
        country: "United States",
      },
      phone: card.phone,
      hours: card.timings ? { timings: card.timings } : undefined,
      features: card.features,
      links: card.links,
    })) || [];

  return (
    <ErrorBoundary>
      {isNavigating && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center">
          <div className="bg-white rounded-2xl px-8 py-6 shadow-2xl flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#F15B40] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#894207] font-black uppercase tracking-wide text-sm">
              Loading menu...
            </p>
          </div>
        </div>
      )}

      <Pagebanner
        title={usSections?.titleSection?.title || "United States Locations"}
      />

      {usSections?.comingSoonSection && (
        <ComingSoon comingSoonSection={usSections.comingSoonSection} />
      )}

      <div
        className="min-h-screen py-4"
        style={{
          backgroundColor: "#f4ebe4",
          backgroundImage: `url('/assets/bg_img.png')`,
          backgroundSize: "auto 900px",
          backgroundPosition: "bottom left",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {usSections?.clucksNearYouSection?.visible && (
            <>
              <div
                className="text-[24px] font-bold uppercase text-[#A15B21] bg-[#F3C317] px-7 py-2 mx-auto -rotate-3 leading-tight w-fit my-5"
                style={{
                  clipPath:
                    "polygon(0 0, 100% 0, calc(100% - 0.8em) 50%, 100% 100%, 0 100%, 0.8em 50%)",
                }}
              >
                {usSections.clucksNearYouSection.ribbon_title}
              </div>

              <h1 className="text-[#EF4325] text-3xl sm:text-4xl md:text-5xl lg:text-[60px] tracking-[2px] font-bold uppercase mb-[30px] text-center font-[MDNichrome-Black]">
                {usSections.clucksNearYouSection.title}
              </h1>

              {usSections.clucksNearYouSection?.links?.iframeLink?.url && (
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
                      src={usSections.clucksNearYouSection.links.iframeLink.url}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="United States Google Map"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {usSections?.locationsSection?.visible && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-items-center">
              {locations.map((location: any) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  onOrderOnline={() => {
                    const orderLink = location.links?.primary?.order;
                    if (orderLink) window.open(orderLink, "_blank");
                  }}
                  onLocationDetails={() => {
                    setIsNavigating(true);

                    window.location.href = `/menu/${location.name
                      ?.toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)+/g, "")}`;
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default UnitedStates;