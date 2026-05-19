import Link from "next/link";
import { BannerSection } from "@/src/types/home";
import OptimizedImage from "@/src/components/Home/OptimizedImage";

interface HeroSectionProps {
  bannerSection?: BannerSection;
  isLoading?: boolean;
}

const HeroSection = ({
  bannerSection,
  isLoading = false,
}: HeroSectionProps) => {
  if (isLoading) {
    return (
      <section className="mx-5 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 text-left">
            <div className="h-16 sm:h-20 md:h-24 lg:h-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 sm:h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 sm:h-14 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="relative w-full h-64 sm:h-80 md:h-[500px] lg:h-[630px] overflow-hidden rounded-xl bg-gray-200 animate-pulse" />
        </div>
      </section>
    );
  }

  if (!bannerSection) {
    return null;
  }

  const orderUrl = bannerSection.links?.order?.url || "/locations";
  const orderText = bannerSection.links?.order?.text || "Order now";
  const isExternalOrderUrl =
    orderUrl.startsWith("http://") || orderUrl.startsWith("https://");

  const buttonClassName =
    "cta-link-arrow bg-[#f3c317] text-[#653003] font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg md:text-xl transition-all duration-300 shadow-lg min-h-[48px] min-w-[120px] touch-manipulation hover:px-[27px] hover:sm:px-[29px] hover:md:px-[60px] inline-flex items-center justify-center";

  return (
    <section className="mx-5 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="space-y-6 sm:space-y-8 text-left">
          <h1 className="pm-custom-section-subheading !text-left">
            {bannerSection.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#894105] leading-relaxed">
            {bannerSection.description}
          </p>

          {isExternalOrderUrl ? (
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClassName}
              aria-label={orderText}
            >
              {orderText}
            </a>
          ) : (
            <Link
              prefetch={false}
              href={orderUrl}
              className={buttonClassName}
              aria-label={orderText}
            >
              {orderText}
            </Link>
          )}
        </div>

        <div className="relative w-full h-64 sm:h-80 md:h-[500px] lg:h-[630px] overflow-hidden rounded-xl">
          <OptimizedImage
            src={bannerSection.image.url}
            alt={bannerSection.image.title || "Cluck Clucks chicken and waffles"}
            width={760}
            height={510}
            priority
            loading="eager"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;