'use client'

import React from 'react';
import Link from "next/link";
import Pagebanner from '@/src/components/common/Pagebanner';
import { useOurStoryData } from '@/src/legacy-pages/about/our-story/hooks/useOurStoryData';
import LoadingSpinner from '@/src/components/Home/LoadingSpinner';
import ErrorMessage from '@/src/components/Home/ErrorMessage';
import ErrorBoundary from '@/src/components/Home/ErrorBoundary';
import { processImageUrl } from '@/src/utils/imageUtils';
import OptimizedImage from '@/src/components/Home/OptimizedImage';

const OurStory: React.FC = () => {
    // Use the custom hook for CMS data
    const { cms, loadingState, retry } = useOurStoryData();

    // Show loading state
    if (loadingState.isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading our story..." />
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
            {cms?.ourStory?.titleSection?.title && (
                <Pagebanner title={cms.ourStory.titleSection.title} />
            )}
            <main className="relative min-h-screen flex flex-col ">

                {/* Hero Section */}
                {cms?.ourStory?.heroSection?.visible && (
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
                        <article className="relative w-full py-12 flex flex-col md:flex-row max-w-[1400px] mx-auto gap-10 items-center justify-between">
                            {/* Left Content */}
                            <div className="flex-1 flex justify-center items-stretch">
                                <OptimizedImage
                                    src={cms?.ourStory?.heroSection?.image?.url ?
                                        processImageUrl(cms.ourStory.heroSection.image.url) : ''
                                    }
                                    alt={cms?.ourStory?.heroSection?.image?.title || ''}
                                    className="w-full h-full rounded-2xl object-cover shadow-lg"
                                    fallbackSrc="/assets/placeholder.jpg"
                                    loading="lazy"
                                />
                            </div>
                            {/* Right Content */}
                            <div className="flex-1 flex flex-col justify-center items-start text-left">
                                <h2 className="text-[#F15B40] text-[40px] md:text-[64px] font-black uppercase text-left leading-[1.1] tracking-[3px] font-[MDNichrome-Black] mt-5 mb-8">
                                    {cms?.ourStory?.heroSection?.title}
                                </h2>
                                <h2 className="text-[#F15B40] text-[18px] font-bold uppercase text-left leading-[1.1] font-[Inter] mb-6 ">
                                    {cms?.ourStory?.heroSection?.subtitle}
                                </h2>
                                <p className="text-[#894105] font-[Inter] text-[19px] leading-[1.6] text-left mb-[20px]">
                                    {cms?.ourStory?.heroSection?.description}
                                </p>
                            </div>
                        </article>
                    </section>
                )}

                {/* Philosophy Section */}
                {cms?.ourStory?.philosophySection?.visible && (
                    <section className="w-full bg-[#F8A8A8] py-10 flex flex-col items-center justify-center px-5 xl:px-0">
                        {/* Ribbon Banner */}
                        <div className="flex justify-center">
                            {/* Ribbon Banner with Polygon Clip Path */}
                            <div
                                className="text-xl font-bold uppercase text-[#A15B21] bg-[#F4EBE4] px-10 py-2 mx-auto -rotate-3 leading-tight w-fit"
                                style={{
                                    clipPath: 'polygon(0 0, 100% 0, calc(100% - 0.8em) 50%, 100% 100%, 0 100%, 0.8em 50%)'
                                }}
                            >
                                {cms?.ourStory?.philosophySection?.ribbon_title}
                            </div>
                        </div>
                        {/* Main Heading */}
                        <h1 className="text-[#9E3C2A] text-3xl md:text-5xl font-extrabold uppercase text-center mb-8 tracking-tight py-5" style={{ fontFamily: 'MDNichrome, Arial Black, Helvetica Black, sans-serif' }}>
                            {cms?.ourStory?.philosophySection?.title}
                        </h1>
                        {/* Description Paragraph */}
                        <p className="text-[#411912] text-xl md:text-xl text-center max-w-6xl mx-auto leading-relaxed">
                            {cms?.ourStory?.philosophySection?.description}
                        </p>
                    </section>
                )}



                {/* Cards Section */}
                {cms?.ourStory?.cardsSection?.visible && (
                    <section className="w-full bg-[#F7F0EA] flex flex-col items-center justify-center px-5 xl:px-0">
                        <div className="hidden lg:block mt-[120px] mb-5">
                            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                                {cms?.ourStory?.cardsSection?.cards?.map((card, index) => {
                                    return (
                                        <div key={index} className="relative">
                                            <div className="absolute -top-[100px] left-1/2 transform -translate-x-1/2 z-10">
                                                <OptimizedImage
                                                    src={card?.image?.url ?
                                                        processImageUrl(card.image.url) : ''
                                                    }
                                                    alt={card?.image?.title || ''}
                                                    className="h-44 w-auto object-contain"
                                                    fallbackSrc="/assets/placeholder.jpg"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="bg-white rounded-2xl shadow px-8 flex flex-col items-center pt-32 h-[380px]">
                                                <h3 className="text-[#EF4325] text-2xl font-bold uppercase mb-4 text-center tracking-wide">
                                                    {card?.title}
                                                </h3>
                                                <p className="text-[#A15B21] text-lg text-center mb-8">
                                                    {card?.description}
                                                </p>
                                                {card?.ctaUrl?.startsWith('http://') || card?.ctaUrl?.startsWith('https://') ? (
                                                    <a
                                                        href={card?.ctaUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={card?.ctaText}
                                                        className="mt-auto mb-8 flex items-center font-bold transform transition-all duration-300 
                                                    text-[#EF4325] border-b-2 border-[#EF4325] 
                                                    hover:scale-110 hover:text-[#5c2c00] hover:border-[#5c2c00] text-[20px]"
                                                    >
                                                        {card?.ctaText}
                                                        <span className="ml-2">&raquo;</span>
                                                    </a>
                                                ) : (
                                                    <Link
                                                        href={card?.ctaUrl || '/'}
                                                        aria-label={card?.ctaText}
                                                        className="mt-auto mb-8 flex items-center font-bold transform transition-all duration-300 
                                                    text-[#EF4325] border-b-2 border-[#EF4325] 
                                                    hover:scale-110 hover:text-[#5c2c00] hover:border-[#5c2c00] text-[20px]"
                                                    >
                                                        {card?.ctaText}
                                                        <span className="ml-2">&raquo;</span>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="lg:hidden max-w-7xl w-full mx-auto grid grid-cols-1 gap-8 my-5">
                            {cms?.ourStory?.cardsSection?.cards?.map((card, index) => {
                                return (
                                    <div key={index} className="relative">
                                        <div className="bg-white rounded-2xl shadow px-8 flex flex-col items-center pt-8 pb-8 min-h-[380px]">
                                            {/* Image - completely inside the card */}
                                            <div className="mb-6">
                                                <OptimizedImage
                                                    src={card?.image?.url ?
                                                        processImageUrl(card.image.url) : ''
                                                    }
                                                    alt={card?.image?.title || ''}
                                                    className="h-44 w-auto object-contain mx-auto"
                                                    fallbackSrc="/assets/placeholder.jpg"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <h3 className="text-[#EF4325] text-2xl font-bold uppercase mb-4 text-center tracking-wide">
                                                {card?.title}
                                            </h3>
                                            <p className="text-[#A15B21] text-lg text-center mb-6 flex-grow">
                                                {card?.description}
                                            </p>
                                            {card?.ctaUrl?.startsWith('http://') || card?.ctaUrl?.startsWith('https://') ? (
                                                <a
                                                    href={card?.ctaUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={card?.ctaText}
                                                    className="mt-auto flex items-center font-bold transform transition-all duration-300 
                                                    text-[#EF4325] border-b-2 border-[#EF4325] 
                                                    hover:scale-110 hover:text-[#5c2c00] hover:border-[#5c2c00] text-[20px]"
                                                >
                                                    {card?.ctaText}
                                                    <span className="ml-2">&raquo;</span>
                                                </a>
                                            ) : (
                                                <Link
                                                    href={card?.ctaUrl || '/'}
                                                    aria-label={card?.ctaText}
                                                    className="mt-auto flex items-center font-bold transform transition-all duration-300 
                                                    text-[#EF4325] border-b-2 border-[#EF4325] 
                                                    hover:scale-110 hover:text-[#5c2c00] hover:border-[#5c2c00] text-[20px]"
                                                >
                                                    {card?.ctaText}
                                                    <span className="ml-2">&raquo;</span>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}

            </main>
        </ErrorBoundary>
    );
};

export default OurStory;
