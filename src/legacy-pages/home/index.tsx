'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import ImageSlider from '../../components/common/ImageSlider';
import { ImageCardData } from './types';
import HeroSection from '../../components/Home/HeroSection';
import TestimonialSection from '../../components/Home/TestimonialSection';
import CateringSection from '../../components/Home/CateringSection';
import ReviewSection from '../../components/Home/ReviewSection';
import ErrorBoundary from '../../components/Home/ErrorBoundary';
import OptimizedImage from '../../components/Home/OptimizedImage';
import LightboxImageDisplay from '../../components/common/LightboxImageDisplay';
import { processImageUrl } from '../../utils/imageUtils';
import { useCMS } from '@/src/context/CMSContext';

const DEFAULT_IMAGE_CARDS = [
    { id: 1, src: '/assets/img1.webp', alt: 'Multi-layered Fried Chicken & Waffles Stack' },
    { id: 2, src: '/assets/img2.webp', alt: 'Golden Fried Chicken on Waffle' },
    { id: 3, src: '/assets/img3.webp', alt: 'Fried Chicken Sandwich' }
];

const Home: React.FC = () => {
    const cmsData = useCMS();
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [selectedSection, setSelectedSection] = useState<'imagesSection' | 'imagesSection2' | null>(null);
    const [zoom, setZoom] = useState<number>(1);

    // Build cms structure from server-provided data
    const cms = {
        home: {
            bannerSection: cmsData?.home?.sections?.bannerSection,
            cateringSection: cmsData?.home?.sections?.cateringSection,
            crispyAndCrunchySection: cmsData?.home?.sections?.crispyAndCrunchySection,
            imagesSection: cmsData?.home?.sections?.imagesSection,
            imagesSection2: cmsData?.home?.sections?.imagesSection2,
            newsSection: cmsData?.home?.sections?.newsSection,
            reviewSection: cmsData?.home?.sections?.reviewSection,
            sliderImagesSection: cmsData?.home?.sections?.sliderImagesSection,
        }
    };

    // Lightbox handlers
    const openLightbox = (index: number, section: 'imagesSection' | 'imagesSection2') => {
        setSelectedImageIndex(index);
        setSelectedSection(section);
        setZoom(1);
    };

    const closeLightbox = () => {
        setSelectedImageIndex(null);
        setSelectedSection(null);
        setZoom(1);
    };

    const getCurrentImages = () => {
        if (selectedSection === 'imagesSection') {
            return cms?.home?.imagesSection?.images || [];
        } else if (selectedSection === 'imagesSection2') {
            return cms?.home?.imagesSection2?.images || DEFAULT_IMAGE_CARDS;
        }
        return DEFAULT_IMAGE_CARDS;
    };

    const handlePrev = () => {
        setZoom(1);
        const images = getCurrentImages();
        setSelectedImageIndex((prev: number | null) =>
            prev !== null && prev > 0 ? prev - 1 : images.length - 1
        );
    };

    const handleNext = () => {
        setZoom(1);
        const images = getCurrentImages();
        setSelectedImageIndex((prev: number | null) =>
            prev !== null && prev < images.length - 1 ? prev + 1 : 0
        );
    };

    const zoomIn = () => setZoom((z: number) => Math.min(z + 0.2, 3));
    const zoomOut = () => setZoom((z: number) => Math.max(z - 0.2, 0.5));

    const getCurrentImageData = () => {
        if (selectedImageIndex === null) return null;
        const images = getCurrentImages();
        const currentImage = images[selectedImageIndex];
        if (!currentImage) return null;

        const imageSrc = 'url' in currentImage ? currentImage.url : currentImage.src;
        const imageTitle = 'title' in currentImage ? currentImage.title : currentImage.alt;

        if (!imageSrc) return { title: imageTitle, url: '/assets/logo.png' };

        return {
            title: imageTitle,
            url: processImageUrl(imageSrc)
        };
    };

    return (
        <ErrorBoundary>
            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                {cms?.home?.bannerSection?.visible && (
                    <HeroSection
                        bannerSection={cms?.home?.bannerSection}
                        isLoading={false}
                    />
                )}

                {/* Image Slider Section */}
                {cms?.home?.sliderImagesSection?.visible && (
                    <section>
                        <ImageSlider images={cms?.home?.sliderImagesSection?.images || []} />
                    </section>
                )}

                {/* Testimonial Section */}
                {cms?.home?.sliderImagesSection?.visible && (
                    <TestimonialSection
                        sliderImagesSection={cms?.home?.sliderImagesSection}
                        isLoading={false}
                    />
                )}

                {/* Crispy & Crunchy Section with Image Cards */}
                {cms?.home?.crispyAndCrunchySection?.visible && (
                    <section className="relative w-full flex flex-col items-center justify-center">
                        <div
                            className="absolute inset-0 bg-no-repeat bg-fixed 
                                bg-[length:380px_auto,180px_auto] 
                                bg-[position:calc(-3%_-_90px)_90%,calc(90%_+_110px)_100px] 
                                opacity-10"
                            style={{
                                backgroundImage: "url('/assets/franchising-bg.jpg'), url('/assets/catering/background-maincontent.jpg')"
                            }}
                        />

                        <section className="bg-white mt-9 lg:mt-[70px] mb-5 lg:mb-[5px]">
                            <div className="max-w-6xl mx-auto px-4">
                                <div className="relative flex justify-center">
                                    <div
                                        className="text-[24px] font-bold uppercase text-[#A15B21] bg-[#F3C317] px-7 py-2 mx-auto -rotate-3 leading-tight w-fit"
                                        style={{
                                            clipPath: 'polygon(0 0, 100% 0, calc(100% - 0.8em) 50%, 100% 100%, 0 100%, 0.8em 50%)'
                                        }}
                                    >
                                        {cms?.home?.crispyAndCrunchySection?.ribbon_title}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white">
                            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                                <h3 className="pm-custom-section-subheading pm-h3 tracking-wide lg:tracking-wider">
                                    {cms?.home?.crispyAndCrunchySection?.title}
                                </h3>
                                <p className="text-base sm:text-lg md:text-xl text-[#663300] mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto px-2">
                                    {cms?.home?.crispyAndCrunchySection?.description}
                                </p>
                                <Link
                                    prefetch={false}
                                    href={cms?.home?.crispyAndCrunchySection?.links?.location?.url || '/locations'}
                                    className="cta-link cta-link-arrow touch-manipulation inline-flex items-center justify-center"
                                >
                                    {cms?.home?.crispyAndCrunchySection?.links?.location?.text}
                                </Link>
                            </div>
                        </section>

                        {cms?.home?.imagesSection?.visible && (
                            <section className="m-5 w-[calc(100vw-2rem)] lg:w-auto">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {(cms?.home?.imagesSection?.images || DEFAULT_IMAGE_CARDS).map((image: { url: string; title: string } | ImageCardData, index: number) => {
                                        const imageSrc = 'url' in image ? image.url : image.src;
                                        const imageAlt = 'title' in image ? image.title : image.alt;

                                        return (
                                            <div
                                                key={index}
                                                className="relative w-full h-64 sm:h-80 md:h-[450px] lg:h-[450px] group overflow-hidden rounded-xl cursor-pointer"
                                                onClick={() => openLightbox(index, 'imagesSection')}
                                            >
                                                <OptimizedImage
                                                    src={imageSrc}
                                                    alt={imageAlt}
                                                    className="w-full h-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                />
                                                <div className="absolute inset-0 bg-gray-100/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}
                    </section>
                )}

                {/* Catering Section */}
                {cms?.home?.cateringSection?.visible && (
                    <CateringSection
                        cateringSection={cms?.home?.cateringSection}
                        isLoading={false}
                    />
                )}

                {/* Media Partners Section */}
                {cms?.home?.newsSection?.visible && (
                    <section className="bg-white my-9">
                        <div className="px-4">
                            <div className="flex justify-center">
                                <div
                                    className="text-[24px] font-bold uppercase text-[#A15B21] bg-[#F3C317] px-7 py-2 mx-auto -rotate-3 leading-tight w-fit"
                                    style={{
                                        clipPath: "polygon(0 0, 100% 0, calc(100% - 0.8em) 50%, 100% 100%, 0 100%, 0.8em 50%)",
                                    }}
                                >
                                    {cms?.home?.newsSection?.ribbon_title}
                                </div>
                            </div>

                            <h3 className="pm-custom-section-subheading pm-h3 mt-7">
                                {cms?.home?.newsSection?.title}
                            </h3>
                            <p className="text-base sm:text-lg lg:text-[18px] text-[#663300] mb-12 leading-relaxed text-center mx-auto max-w-9xl px-4">
                                {cms?.home?.newsSection?.subtitle}
                            </p>

                            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
                                {(cms?.home?.newsSection?.partner_images || []).slice(0, 7).map((partner: { url: string; title: string } | { id: number; link: string; src: string; alt: string }, index: number) => {
                                    const partnerSrc = 'url' in partner ? partner.url : partner.src;
                                    const partnerAlt = 'title' in partner ? partner.title : partner.alt;
                                    const partnerLink = 'link' in partner ? partner.link : '#';

                                    return (
                                        <a key={index} href={partnerLink} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity duration-300 touch-manipulation">
                                            <OptimizedImage src={partnerSrc} alt={partnerAlt} className="w-[150px] sm:w-[190px] h-[70px] sm:h-[90px] object-contain" loading="lazy" />
                                        </a>
                                    );
                                })}
                            </div>

                            {(cms?.home?.newsSection?.partner_images || []).length > 7 && (
                                <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 mt-6">
                                    {(cms?.home?.newsSection?.partner_images || []).slice(7).map((partner: { url: string; title: string } | { id: number; link: string; src: string; alt: string }, index: number) => {
                                        const partnerSrc = 'url' in partner ? partner.url : partner.src;
                                        const partnerAlt = 'title' in partner ? partner.title : partner.alt;
                                        const partnerLink = 'link' in partner ? partner.link : '#';

                                        return (
                                            <a key={index + 7} href={partnerLink} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity duration-300 touch-manipulation">
                                                <OptimizedImage src={partnerSrc} alt={partnerAlt} className="w-[150px] sm:w-[190px] h-[70px] sm:h-[90px] object-contain" loading="lazy" />
                                            </a>
                                        );
                                    })}
                                </div>
                            )}

                            <div className="text-center my-10">
                                {(() => {
                                    const url = cms?.home?.newsSection?.links?.award?.url || '';
                                    const isExternal = url.startsWith('http://') || url.startsWith('https://');

                                    return isExternal ? (
                                        <a href={url} target="_blank" rel="noopener noreferrer" className="cta-link cta-link-arrow font-bold text-[#F15B40] touch-manipulation">
                                            {cms?.home?.newsSection?.links?.award?.text}
                                        </a>
                                    ) : (
                                        <Link prefetch={false} href={url || '/press'} className="cta-link cta-link-arrow font-bold text-[#F15B40] touch-manipulation">
                                            {cms?.home?.newsSection?.links?.award?.text}
                                        </Link>
                                    );
                                })()}
                            </div>
                        </div>
                    </section>
                )}

                {/* Three Image Grid Section */}
                {cms?.home?.imagesSection2?.visible && (
                    <section className="w-full bg-amber-400 py-4 mt-5">
                        <div className="max-w-10xl mx-auto px-4">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                                {(cms?.home?.imagesSection2?.images || []).map((item: { url: string; title: string } | { src: string; alt: string }, index: number) => {
                                    const imageSrc = 'url' in item ? item.url : item.src;
                                    const imageAlt = 'title' in item ? item.title : item.alt;

                                    return (
                                        <div key={index} className="relative rounded-[32px] overflow-hidden shadow-lg group cursor-pointer" onClick={() => openLightbox(index, 'imagesSection2')}>
                                            <OptimizedImage src={imageSrc} alt={imageAlt} className="object-cover w-full h-64 sm:h-80 md:h-[30rem] transition-transform duration-300 group-hover:scale-105" loading="lazy" sizes="(max-width: 1024px) 100vw, 25vw" />
                                            <div className="absolute inset-0 bg-yellow-500/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Review Section */}
                {cms?.home?.reviewSection?.visible && (
                    <ReviewSection
                        isLoading={false}
                        cmsReviews={cms?.home?.reviewSection}
                        globalData={cmsData}
                    />
                )}

                {/* Lightbox Modal */}
                {selectedImageIndex !== null && (
                    <div className="fixed inset-0 bg-black/80 flex flex-col z-50 h-screen">
                        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex space-x-2 sm:space-x-3 z-10">
                            <button aria-label="Zoom out" className="bg-black/60 hover:bg-black/80 text-white px-2 py-1 sm:px-3 rounded text-lg sm:text-xl w-8 h-8 sm:w-auto sm:h-auto flex items-center justify-center" onClick={zoomOut}>➖</button>
                            <button aria-label="Zoom In" className="bg-black/60 hover:bg-black/80 text-white px-2 py-1 sm:px-3 rounded text-lg sm:text-xl w-8 h-8 sm:w-auto sm:h-auto flex items-center justify-center" onClick={zoomIn}>➕</button>
                            <button aria-label="Close Button" className="bg-black/60 hover:bg-black/80 text-white px-2 py-1 sm:px-3 rounded text-xl sm:text-2xl w-8 h-8 sm:w-auto sm:h-auto flex items-center justify-center" onClick={closeLightbox}>✕</button>
                        </div>

                        <button aria-label="View previous image" className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white text-3xl sm:text-4xl bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center z-10" onClick={handlePrev}>❮</button>
                        <button  aria-label="View Next image" className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white text-3xl sm:text-4xl bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center z-10" onClick={handleNext}>❯</button>

                        <div className="flex-1 flex items-center justify-center overflow-hidden">
                            <div className="w-full sm:w-4/5 lg:w-4/5 h-full flex justify-center items-center">
                                {(() => {
                                    const imageData = getCurrentImageData();
                                    return imageData ? (
                                        <LightboxImageDisplay image={imageData} alt={imageData.title} zoom={zoom} className="max-h-full max-w-full" />
                                    ) : (
                                        <div className="text-white text-xl">No image selected</div>
                                    );
                                })()}
                            </div>
                        </div>

                        <div className="bg-black/60 text-white px-6 py-3">
                            <span className="text-lg font-medium">{getCurrentImageData()?.title || 'No image selected'}</span>
                        </div>
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
};

export default Home;
