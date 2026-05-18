'use client'

import React from 'react';
import Link from "next/link";
import Pagebanner from '@/src/components/common/Pagebanner';
import ErrorBoundary from '../../../components/Home/ErrorBoundary';
import { processImageUrl } from '../../../utils/imageUtils';
import OptimizedImage from '../../../components/Home/OptimizedImage';
import { useCMS } from '@/src/context/CMSContext';

const OurStory: React.FC = () => {
    const cmsData = useCMS();
    const cms = cmsData?.about?.sections || {};

    return (
        <ErrorBoundary>
            {cms?.titleSection?.title && (
                <Pagebanner title={cms.titleSection.title} />
            )}

            <main className="relative min-h-screen flex flex-col ">

                {cms?.ourStorySection?.visible && (
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
                            <div className="flex-1 flex justify-center items-stretch">
                                <OptimizedImage
                                    src={
                                        cms?.ourStorySection?.image?.url
                                            ? processImageUrl(cms.ourStorySection.image.url)
                                            : ''
                                    }
                                    alt={cms?.ourStorySection?.image?.title || ''}
                                    className="w-full h-full rounded-2xl object-cover shadow-lg"
                                    fallbackSrc="/assets/placeholder.jpg"
                                    loading="lazy"
                                />
                            </div>

                            <div className="flex-1 flex flex-col justify-center items-start text-left">
                                <h2 className="text-[#F15B40] text-[40px] md:text-[64px] font-black uppercase text-left leading-[1.1] tracking-[3px] font-[MDNichrome-Black] mt-5 mb-8">
                                    {cms?.ourStorySection?.title}
                                </h2>

                                <h2 className="text-[#F15B40] text-[18px] font-bold uppercase text-left leading-[1.1] font-[Inter] mb-6 ">
                                    {cms?.ourStorySection?.subtitle}
                                </h2>

                                <p className="text-[#894105] font-[Inter] text-[19px] leading-[1.6] text-left mb-[20px]">
                                    {cms?.ourStorySection?.description}
                                </p>
                            </div>
                        </article>
                    </section>
                )}

                {cms?.philosophySection?.visible && (
                    <section className="w-full bg-[#F8A8A8] py-10 flex flex-col items-center justify-center px-5 xl:px-0">
                        <div className="flex justify-center">
                            <div
                                className="text-xl font-bold uppercase text-[#A15B21] bg-[#F4EBE4] px-10 py-2 mx-auto -rotate-3 leading-tight w-fit"
                                style={{
                                    clipPath: 'polygon(0 0, 100% 0, calc(100% - 0.8em) 50%, 100% 100%, 0 100%, 0.8em 50%)'
                                }}
                            >
                                {cms?.philosophySection?.ribbon_title}
                            </div>
                        </div>

                        <h1
                            className="text-[#9E3C2A] text-3xl md:text-5xl font-extrabold uppercase text-center mb-8 tracking-tight py-5"
                            style={{
                                fontFamily: 'MDNichrome, Arial Black, Helvetica Black, sans-serif'
                            }}
                        >
                            {cms?.philosophySection?.title}
                        </h1>

                        <p className="text-[#411912] text-xl md:text-xl text-center max-w-6xl mx-auto leading-relaxed">
                            {cms?.philosophySection?.description}
                        </p>
                    </section>
                )}

                {cms?.cardsSection?.visible && (
                    <section className="w-full bg-[#F7F0EA] flex flex-col items-center justify-center px-5 xl:px-0">
                        <div className="hidden lg:block mt-[120px] mb-5">
                            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                                {cms?.cardsSection?.cards?.map((card: any, index: number) => {
                                    return (
                                        <div key={index} className="relative">
                                            <div className="absolute -top-[100px] left-1/2 transform -translate-x-1/2 z-10">
                                                <OptimizedImage
                                                    src={
                                                        card?.image?.url
                                                            ? processImageUrl(card.image.url)
                                                            : ''
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
                                                    {card?.subtitle || card?.description}
                                                </p>

                                                {card?.links?.primary?.url || card?.ctaUrl ? (
                                                    card?.links?.primary?.url?.startsWith('http://') ||
                                                    card?.links?.primary?.url?.startsWith('https://') ||
                                                    card?.ctaUrl?.startsWith('http://') ||
                                                    card?.ctaUrl?.startsWith('https://') ? (
                                                        <a
                                                            href={card?.links?.primary?.url || card?.ctaUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label={card?.links?.primary?.text || card?.ctaText}
                                                            className="mt-auto mb-8 flex items-center font-bold transform transition-all duration-300 
                                                            text-[#EF4325] border-b-2 border-[#EF4325] 
                                                            hover:scale-110 hover:text-[#5c2c00] hover:border-[#5c2c00] text-[20px]"
                                                        >
                                                            {card?.links?.primary?.text || card?.ctaText}
                                                            <span className="ml-2">&raquo;</span>
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            prefetch={false}
                                                            href={card?.links?.primary?.url || card?.ctaUrl || '/'}
                                                            aria-label={card?.links?.primary?.text || card?.ctaText}
                                                            className="mt-auto mb-8 flex items-center font-bold transform transition-all duration-300 
                                                            text-[#EF4325] border-b-2 border-[#EF4325] 
                                                            hover:scale-110 hover:text-[#5c2c00] hover:border-[#5c2c00] text-[20px]"
                                                        >
                                                            {card?.links?.primary?.text || card?.ctaText}
                                                            <span className="ml-2">&raquo;</span>
                                                        </Link>
                                                    )
                                                ) : null}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="lg:hidden max-w-7xl w-full mx-auto grid grid-cols-1 gap-8 my-5">
                            {cms?.cardsSection?.cards?.map((card: any, index: number) => {
                                return (
                                    <div key={index} className="relative">
                                        <div className="bg-white rounded-2xl shadow px-8 flex flex-col items-center pt-8 pb-8 min-h-[380px]">
                                            <div className="mb-6">
                                                <OptimizedImage
                                                    src={
                                                        card?.image?.url
                                                            ? processImageUrl(card.image.url)
                                                            : ''
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
                                                {card?.subtitle || card?.description}
                                            </p>

                                            {card?.links?.primary?.url || card?.ctaUrl ? (
                                                card?.links?.primary?.url?.startsWith('http://') ||
                                                card?.links?.primary?.url?.startsWith('https://') ||
                                                card?.ctaUrl?.startsWith('http://') ||
                                                card?.ctaUrl?.startsWith('https://') ? (
                                                    <a
                                                        href={card?.links?.primary?.url || card?.ctaUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        aria-label={card?.links?.primary?.text || card?.ctaText}
                                                        className="mt-auto flex items-center font-bold transform transition-all duration-300 
                                                        text-[#EF4325] border-b-2 border-[#EF4325] 
                                                        hover:scale-110 hover:text-[#5c2c00] hover:border-[#5c2c00] text-[20px]"
                                                    >
                                                        {card?.links?.primary?.text || card?.ctaText}
                                                        <span className="ml-2">&raquo;</span>
                                                    </a>
                                                ) : (
                                                    <Link
                                                        href={card?.links?.primary?.url || card?.ctaUrl || '/'}
                                                        aria-label={card?.links?.primary?.text || card?.ctaText}
                                                        className="mt-auto flex items-center font-bold transform transition-all duration-300 
                                                        text-[#EF4325] border-b-2 border-[#EF4325] 
                                                        hover:scale-110 hover:text-[#5c2c00] hover:border-[#5c2c00] text-[20px]"
                                                    >
                                                        {card?.links?.primary?.text || card?.ctaText}
                                                        <span className="ml-2">&raquo;</span>
                                                    </Link>
                                                )
                                            ) : null}
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