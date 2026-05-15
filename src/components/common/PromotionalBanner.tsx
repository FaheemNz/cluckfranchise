'use client'

import { useState } from 'react';

interface BannerData {
    text: string;
    link: string;
    active: boolean;
}

interface PromotionalBannerProps {
    bannerData?: BannerData;
    onClose?: () => void;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({ bannerData, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) {
            onClose();
        }
    };

    // Don't render if banner data is not provided or active is false
    if (!bannerData || !bannerData.active || !isVisible) {
        return null;
    }

    return (
        <div className="bg-[#F3C317] border-b border-[#E6B800] ">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center justify-center ">
                    {bannerData.link ? (
                        <a 
                            href={bannerData.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#894207] text-center font-medium text-sm sm:text-base lg:text-lg hover:text-[#6B3410] hover:underline transition-all duration-200"
                        >
                            {bannerData.text}
                        </a>
                    ) : (
                        <p className="text-[#894207] text-center font-medium text-sm sm:text-base lg:text-lg">
                            {bannerData.text}
                        </p>
                    )}
                    <button
                        onClick={handleClose}
                        className="absolute right-2 text-[#894207] hover:text-[#6B3410] transition-colors duration-200 p-1"
                        aria-label="Close banner"
                    >
                        <svg 
                            className="w-5 h-5 sm:w-6 sm:h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M6 18L18 6M6 6l12 12" 
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromotionalBanner;
