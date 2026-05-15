'use client'

import React, { useState } from 'react';
import Pagebanner from '../../../components/common/Pagebanner';
import OptimizedImage from '../../../components/Home/OptimizedImage';
import { useHalalData } from './hooks/useHalalData';
import LoadingSpinner from '../../../components/Home/LoadingSpinner';
import ErrorMessage from '../../../components/Home/ErrorMessage';
import ErrorBoundary from '../../../components/Home/ErrorBoundary';
import { processImageUrl } from '../../../utils/imageUtils';
import LightboxImageDisplay from '../../../components/common/LightboxImageDisplay';

const Halal: React.FC = () => {
    // Use the custom hook for CMS data
    const { cms, loadingState, retry } = useHalalData();
    
    // Lightbox state management
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [zoom, setZoom] = useState<number>(1);

    // Get halal images for lightbox
    const halalImages = cms?.halal?.imagesSection?.images || [];

    const handlePrev = () => {
        setZoom(1);
        setSelectedIndex((prev: number | null) => (prev !== null && prev > 0 ? prev - 1 : halalImages.length - 1));
    };

    const handleNext = () => {
        setZoom(1);
        setSelectedIndex((prev: number | null) => (prev !== null && prev < halalImages.length - 1 ? prev + 1 : 0));
    };

    const closeModal = () => {
        setZoom(1);
        setSelectedIndex(null);
    };

    const zoomIn = () => setZoom((z: number) => Math.min(z + 0.2, 3));
    const zoomOut = () => setZoom((z: number) => Math.max(z - 0.2, 0.5));

    // Show loading state
    if (loadingState.isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading halal information..." />
            </div>
        );
    }

    // Show error state
    if (loadingState.error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <ErrorMessage error={loadingState.error} onRetry={retry} />
            </div>
        );
    }

    return (
        <ErrorBoundary>
            {cms?.halal?.titleSection?.visible && cms?.halal?.titleSection?.title && (
                <Pagebanner title={cms.halal.titleSection.title} />
            )}
            <main className="relative min-h-screen flex flex-col">

                {/* Section 1 - Split layout */}
                {cms?.halal?.bannerSection?.visible && (
                    <section className="relative w-full px-5 xl:px-0">
                    <div
                        className="absolute inset-0 bg-no-repeat bg-fixed 
                                  bg-[length:250px_auto,250px_auto] 
                                  bg-[position:calc(0%_-_80px)_40%,calc(100%_+_120px)_-260px] 
                                  opacity-20"
                        style={{
                            backgroundImage: "url('/assets/our-story-bg2.jpg'), url('/assets/our-story-bg.jpg')"
                        }}
                    />
                    <article className="relative w-full py-12 flex flex-col md:flex-row lg:max-w-7xl mx-auto gap-4 items-center justify-start lg:pl-10">
                        {/* Left Content */}
                        <div className="w-full md:w-1/2 lg:flex-1 flex justify-center items-stretch">
                            <OptimizedImage
                                src={cms?.halal?.bannerSection?.image?.url ? 
                                    processImageUrl(cms.halal.bannerSection.image.url) : ''
                                }
                                alt={cms?.halal?.bannerSection?.image?.title || ''}
                                className="w-full h-full rounded-2xl object-cover shadow-lg"
                                fallbackSrc="/assets/placeholder.jpg"
                                loading="lazy"
                            />
                        </div>
                        {/* Right Content */}
                        <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col justify-center items-start text-left pl-4">
                        <h3 className="pm-custom-section-subheading pm-h3 !text-left">
                                {cms?.halal?.bannerSection?.title}
                            </h3>
                            <p className="text-[#894105] font-[Inter] text-[19px] leading-[1.6] text-left mb-[10px]">
                                {cms?.halal?.bannerSection?.description}
                                {" "}
                                {cms?.halal?.bannerSection?.links?.cta?.url ? (
                                    <a href={cms.halal.bannerSection.links.cta.url} className="text-[#F15B40] font-bold" target="_blank" rel="noreferrer">
                                        {cms.halal.bannerSection.links.cta.text}
                                    </a>
                                ) : (
                                    <span className="text-[#F15B40] font-bold">hello@cluckclucks.ca</span>
                                )}
                                .
                            </p>
                        </div>
                    </article>
                    </section>
                )}

                {/*Section 2 - Images Section*/}
                {cms?.halal?.imagesSection?.visible && (
                    <section className="w-full bg-[#F3C317] py-3">
                    <div className="w-full">
                        {/* Grid layout */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 px-2 md:px-3">

                            {/* Dynamic Images from CMS */}
                            {cms?.halal?.imagesSection?.images?.map((img, idx) => (
                                <div 
                                    key={idx} 
                                    className="rounded-[32px] overflow-hidden shadow-lg w-full cursor-pointer group relative"
                                    onClick={() => setSelectedIndex(idx)}
                                >
                                    <OptimizedImage
                                        src={img.url ? processImageUrl(img.url) : ''}
                                        alt={img.title || `image-${idx + 1}`}
                                        loading="lazy"
                                        className="object-cover w-full h-96 md:h-[32rem] transition-transform duration-300 hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-gray-200/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            ))}

                        </div>
                    </div>
                    </section>
                )}

            </main>

            {/* Lightbox Modal */}
            {selectedIndex !== null && halalImages.length > 0 && (
                <div className="fixed inset-0 bg-black/80 flex flex-col z-50 h-screen">
                    {/* Top-right Controls (Close + Zoom) */}
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
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                    </div>

                    {/* Arrows */}
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

                    {/* Image Container */}
                    <div className="flex-1 flex items-center justify-center overflow-hidden">
                        <div className="w-full sm:w-4/5 lg:w-4/5 h-full flex justify-center items-center">
                            {(() => {
                                const img = halalImages[selectedIndex];
                                return (
                                    <LightboxImageDisplay
                                        image={{ title: img.title || `Halal Image ${selectedIndex + 1}`, url: processImageUrl(img.url || '') }}
                                        alt={img.title || `image-${selectedIndex + 1}`}
                                        zoom={zoom}
                                        className="max-h-full max-w-full"
                                    />
                                );
                            })()}
                        </div>
                    </div>

                    {/* Caption */}
                    <div className="bg-black/60 text-white px-6 py-3">
                        <span className="text-lg font-medium">
                            {halalImages[selectedIndex].title || `Halal Image ${selectedIndex + 1}`}
                        </span>
                    </div>
                </div>
            )}
        </ErrorBoundary>
    );
};

export default Halal;
