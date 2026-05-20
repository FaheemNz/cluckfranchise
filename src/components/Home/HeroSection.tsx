import React from "react";
import Link from "next/link";
import OptimizedImage from "@/src/components/Home/OptimizedImage";

interface HeroSectionProps {
  bannerSection?: any;
  isLoading?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  bannerSection,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <section className="mx-5 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Loading skeleton */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="h-16 sm:h-20 md:h-24 lg:h-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 sm:h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 sm:h-14 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="relative">
            <div className="w-full h-64 sm:h-80 md:h-[500px] lg:h-[630px] bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  if (!bannerSection) {
    return null;
  }

  const orderUrl = bannerSection?.links?.order?.url || "";
  const orderText = bannerSection?.links?.order?.text || "Order Now";

  const isExternalUrl =
    orderUrl.startsWith("http://") || orderUrl.startsWith("https://");

  const hasOrderUrl = Boolean(orderUrl);

  const imageUrl = bannerSection?.image?.url || "";
  const imageAlt =
    bannerSection?.image?.title || bannerSection?.title || "Hero image";

  const buttonClassName =
    "cta-link-arrow bg-[#f3c317] text-[#653003] font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg md:text-xl transition-all duration-300 shadow-lg min-h-[48px] min-w-[120px] touch-manipulation hover:px-[27px] hover:sm:px-[29px] hover:md:px-[60px] flex items-center justify-center w-fit";

  return (
    <section className="mx-5 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Left Side - Text Content */}
        <div className="space-y-6 sm:space-y-8 text-left">
          <h1 className="pm-custom-section-subheading pm-h3 !text-left">
            {bannerSection.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#894105] leading-relaxed">
            {bannerSection.description}
          </p>

          {hasOrderUrl && isExternalUrl && (
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClassName}
              aria-label={orderText}
            >
              {orderText}
            </a>
          )}

          {hasOrderUrl && !isExternalUrl && (
            <Link
              href={orderUrl}
              prefetch={false}
              className={buttonClassName}
              aria-label={orderText}
            >
              {orderText}
            </Link>
          )}
        </div>

        {/* Right Side - Food Image */}
        <div className="relative">
          <OptimizedImage
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-64 sm:h-80 md:h-[500px] lg:h-[630px] object-cover rounded-xl"
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;