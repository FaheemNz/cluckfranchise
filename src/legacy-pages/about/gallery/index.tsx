'use client'

import React, { useState } from 'react';
import Pagebanner from '../../../components/common/Pagebanner';
import ImageDisplay from '../../../components/common/ImageDisplay';
import LightboxImageDisplay from '../../../components/common/LightboxImageDisplay';
import { useGalleryData } from './hooks/useGalleryData';
import LoadingSpinner from '../../../components/Home/LoadingSpinner';
import ErrorMessage from '../../../components/Home/ErrorMessage';
import ErrorBoundary from '../../../components/Home/ErrorBoundary';
import { processImageUrl } from '../../../utils/imageUtils';

import { GalleryItem } from './types';

interface MasonryItemProps {
    item: GalleryItem;
    onClick: () => void;
}


function MasonryItem({ item, onClick }: MasonryItemProps) {
    // Get image URL from any of the possible field names (with fallback for legacy data)
    const imageSource = item.url || item.img || item.image || item.imageUrl || item.src;
    const imageUrl = imageSource ? processImageUrl(imageSource) : "/assets/logo.png";
    const itemName = item.title || item.name || item.caption || "Gallery Image";
    
    return (
        <article
            className="mb-4 break-inside-avoid rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white group relative cursor-pointer"
            onClick={onClick}
        >
            <ImageDisplay
                image={{ title: itemName, url: imageUrl }}
                alt={itemName}
                className="w-full h-full object-cover"
                loading="lazy"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-200/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </article>
    );
}
const Gallery: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [zoom, setZoom] = useState<number>(1);
    
    // Use the custom hook for CMS data
    const { cms, loadingState, retry } = useGalleryData();

    // Get gallery items from CMS data
    const galleryItems = cms?.gallery?.imagesSection?.images || [];

    // Show loading state (only for CMS loading)
    if (loadingState.isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <LoadingSpinner 
                    size="lg" 
                    text="Loading gallery..." 
                />
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

    const handlePrev = () => {
        setZoom(1);
        setSelectedIndex((prev: number | null) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1));
    };

    const handleNext = () => {
        setZoom(1);
        setSelectedIndex((prev: number | null) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0));
    };

    const closeModal = () => {
        setZoom(1);
        setSelectedIndex(null);
    };

    const zoomIn = () => setZoom((z: number) => Math.min(z + 0.2, 3));
    const zoomOut = () => setZoom((z: number) => Math.max(z - 0.2, 0.5));

    return (
        <ErrorBoundary>
            {cms?.gallery?.titleSection?.visible && cms?.gallery?.titleSection?.title && (
                <Pagebanner title={cms.gallery.titleSection.title} />
            )}
            <div className="min-h-screen bg-[#f4ebe4] px-2 pt-3">
                <main className="w-full pb-16">
                    {galleryItems.length === 0 && (
                        <div className="text-center p-4">
                            <p>No gallery images found.</p>
                        </div>
                    )}
                    
                    {cms?.gallery?.imagesSection?.visible && galleryItems.length > 0 && (
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                            {galleryItems.map((item, index) => (
                                <MasonryItem
                                    key={item.id}
                                    item={item}
                                    onClick={() => setSelectedIndex(index)}
                                />
                            ))}
                        </div>
                    )}
                </main>

                {/* Lightbox Modal */}
                {selectedIndex !== null && galleryItems.length > 0 && (
                    <div className="fixed inset-0 bg-black/80 flex flex-col z-50 h-screen ">
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
                            <div className="w-full sm:w-4/5 lg:w-4/5 h-full flex justify-center items-center ">
                                {(() => {
                                    const item = galleryItems[selectedIndex];
                                    const imageTitle = item.title || item.name || item.caption || "Gallery Image";
                                    const imageSource = item.url || item.img || item.image || item.imageUrl || item.src;
                                    const imageUrl = imageSource ? processImageUrl(imageSource) : "/assets/logo.png";
                                    
                                    return (
                                        <LightboxImageDisplay
                                            image={{ title: imageTitle, url: imageUrl }}
                                            alt={imageTitle}
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
                                {galleryItems[selectedIndex].title || galleryItems[selectedIndex].name || galleryItems[selectedIndex].caption || "Gallery Image"}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
};

export default Gallery;

