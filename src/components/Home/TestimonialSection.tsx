import React from 'react';
import { SliderImagesSection } from '@/src/types/home';

interface TestimonialSectionProps {
  sliderImagesSection?: SliderImagesSection;
  isLoading?: boolean;
}

const TestimonialSection: React.FC<TestimonialSectionProps> = ({ 
  sliderImagesSection, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <section className="bg-[#f3c317]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="pb-5">
            <div className="w-[150px] h-[150px] mx-auto mb-4 mt-[-40px] bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!sliderImagesSection) {
    return null;
  }

  return (
    <section className="bg-[#f3c317]">
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="pb-5">
          <div className="w-[150px] h-[150px] mx-auto mb-4">
            <img
              src="/assets/home.avif"
              alt="Cluck Clucks Icon"
              className="w-full h-full object-cover rounded-full"
              loading="eager"
            />
          </div>
          
          {sliderImagesSection.quote && (
            <blockquote className="text-[24px] font-semibold lg:bold lg:font-bold font-serif text-[#894105] mb-4 leading-relaxed">
              "{sliderImagesSection.quote}"
            </blockquote>
          )}
          
          {sliderImagesSection.author && (
            <cite className="text-base sm:text-lg text-[#894105] font-semibold lg:font-bold">
              -               <a 
                href="https://streetsoftoronto.com/restaurant/cluck-clucks/" 
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#E5573D] transition-colors touch-manipulation"
                aria-label="Visit our locations"
              >
                {sliderImagesSection.author}
              </a>
            </cite>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
