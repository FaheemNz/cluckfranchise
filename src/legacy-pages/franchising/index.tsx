'use client'

import React, { useState, useEffect } from "react";
import Pagebanner from "../../components/common/Pagebanner";
import MainContent from "../../components/franchising/mainContent";
import Discription from "../../components/franchising/discription";
import GridImages from "../../components/franchising/gridImages";
import FranchisingJourney from "../../components/franchising/franchisingJourney";
import ApplyForm from "../../components/franchising/applyForm";
import ErrorBoundary from "../../components/Home/ErrorBoundary";
import { processImageUrl } from "../../utils/imageUtils";
import LightboxImageDisplay from "../../components/common/LightboxImageDisplay";

interface FranchisingProps {
  cmsData: any;
}

const Franchising: React.FC<FranchisingProps> = ({
  cmsData
}) => {

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const [zoom, setZoom] = useState<number>(1);

  const cms = cmsData?.sections || {};

  console.log('FRANCHISING CMS:', cms);

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {

      if (selectedImageIndex !== null) {

        switch (event.key) {

          case "Escape":
            closeLightbox();
            break;

          case "ArrowLeft":
            handlePrev();
            break;

          case "ArrowRight":
            handleNext();
            break;

        }

      }

    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);

  }, [selectedImageIndex]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setZoom(1);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    setZoom(1);
  };

  const handlePrev = () => {

    setZoom(1);

    const images = cms?.imagesSection?.images || [];

    setSelectedImageIndex((prev: number | null) =>
      prev !== null && prev > 0 ? prev - 1 : images.length - 1
    );

  };

  const handleNext = () => {

    setZoom(1);

    const images = cms?.imagesSection?.images || [];

    setSelectedImageIndex((prev: number | null) =>
      prev !== null && prev < images.length - 1 ? prev + 1 : 0
    );

  };

  const zoomIn = () => setZoom((z: number) => Math.min(z + 0.2, 3));

  const zoomOut = () => setZoom((z: number) => Math.max(z - 0.2, 0.5));

  const getCurrentImageData = () => {

    if (selectedImageIndex === null) return null;

    const images = cms?.imagesSection?.images || [];

    const currentImage = images[selectedImageIndex];

    if (!currentImage) return null;

    return {
      title: currentImage.title,
      url: processImageUrl(currentImage.url),
    };

  };

  return (
    <>
      <ErrorBoundary>

        {cms?.titleSection?.visible && (
          <Pagebanner
            title={
              cms?.titleSection?.title || "CLUCK CLUCKS FRANCHISING"
            }
            subtitle={
              cms?.titleSection?.subtitle ||
              "JOIN OUR SUCCESSFUL EXPANSION JOURNEY WITH CLUCK CLUCKS!"
            }
            buttonText="LEARN MORE ABOUT FRANCHISING"
            scrollToTarget="#description-section"
          />
        )}

        <main className="relative min-h-screen flex flex-col py-12 md:py-16 lg:py-15">

          <MainContent cms={cms} />

          <div id="description-section">
            <Discription cms={cms} />
          </div>

          <GridImages
            cms={cms}
            onImageClick={openLightbox}
          />

          <FranchisingJourney cms={cms} />

          {cms?.getStarted?.visible && (

            <section className="w-full bg-[#F2C317] py-10 flex flex-col items-center justify-center">

              <h3 className="pm-custom-section-subheading pm-h3 !text-[#A15B21]">
                {cms?.getStarted?.title}
              </h3>

              <div className="w-[280px] sm:w-[350px] lg:w-[430px] p-8 flex justify-center rounded-md">

                <button
                  type="button"
                  aria-label="Join our team"
                  className="cta-link !text-[#A15B21] !border-[#A15B21]"
                  onClick={() => {

                    const formSection = document.querySelector(
                      ".apply-form-section"
                    );

                    if (formSection) {
                      formSection.scrollIntoView({
                        behavior: "smooth"
                      });
                    }

                  }}
                >
                  {cms?.getStarted?.links?.applyOnline?.text}
                  <span className="ml-2">&raquo;</span>
                </button>

              </div>

            </section>

          )}

          <section className="background-images bg-[#f4ebe4] relative w-full apply-form-section">

            <div className="max-w-4xl mx-auto">
              <ApplyForm cms={cms} />
            </div>

          </section>

        </main>

        {selectedImageIndex !== null && (

          <div className="fixed inset-0 bg-black/80 flex flex-col z-50 h-screen">

            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex space-x-2 sm:space-x-3 z-10">

              <button
                className="bg-black/60 hover:bg-black/80 text-white px-2 py-1 sm:px-3 rounded text-lg sm:text-xl w-8 h-8 sm:w-auto sm:h-auto flex items-center justify-center"
                onClick={zoomOut}
              >
                ➖
              </button>

              <button
                className="bg-black/60 hover:bg-black/80 text-white px-2 py-1 sm:px-3 rounded text-lg sm:text-xl w-8 h-8 sm:w-auto sm:h-auto flex items-center justify-center"
                onClick={zoomIn}
              >
                ➕
              </button>

              <button
                className="bg-black/60 hover:bg-black/80 text-white px-2 py-1 sm:px-3 rounded text-xl sm:text-2xl w-8 h-8 sm:w-auto sm:h-auto flex items-center justify-center"
                onClick={closeLightbox}
              >
                ✕
              </button>

            </div>

            <button
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white text-3xl sm:text-4xl bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center z-10"
              onClick={handlePrev}
            >
              ❮
            </button>

            <button
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white text-3xl sm:text-4xl bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center z-10"
              onClick={handleNext}
            >
              ❯
            </button>

            <div className="flex-1 flex items-center justify-center overflow-hidden">

              <div className="w-full sm:w-4/5 lg:w-4/5 h-full flex justify-center items-center">

                {(() => {

                  const imageData = getCurrentImageData();

                  return imageData ? (

                    <LightboxImageDisplay
                      image={imageData}
                      alt={imageData.title}
                      zoom={zoom}
                      className="max-h-full max-w-full"
                    />

                  ) : (
                    <div className="text-white text-xl">
                      No image selected
                    </div>
                  );

                })()}

              </div>

            </div>

            <div className="bg-black/60 text-white px-6 py-3">

              <span className="text-lg font-medium">
                {getCurrentImageData()?.title || "No image selected"}
              </span>

            </div>

          </div>

        )}

      </ErrorBoundary>
    </>
  );
};

export default Franchising;