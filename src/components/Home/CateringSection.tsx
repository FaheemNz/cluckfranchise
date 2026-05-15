import Link from "next/link";
import { CateringSection as CateringSectionType } from "@/src/types/home";

interface CateringSectionProps {
    cateringSection?: CateringSectionType;
    isLoading?: boolean;
}

const CateringSection = ({
    cateringSection,
    isLoading = false,
}: CateringSectionProps) => {

    if (isLoading) {
        return (
            <section className="relative py-20 overflow-hidden bg-gray-200">

                <div className="relative z-10 max-w-7xl mx-auto px-4">

                    <div className="flex justify-center items-center min-h-[500px]">

                        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-[500px] lg:h-[500px] mx-auto">

                            <div className="h-12 bg-gray-200 rounded animate-pulse mb-6" />

                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                            </div>

                            <div className="h-12 bg-gray-200 rounded animate-pulse mt-8" />

                        </div>

                    </div>

                </div>

            </section>
        );
    }

    if (!cateringSection) {
        return null;
    }

    const backgroundImage = "/assets/scroll_img.avif";

    return (

        <section
            className="relative py-20 overflow-hidden bg-fixed bg-center bg-cover"
            style={{
                backgroundImage: `url(${backgroundImage})`,
            }}
        >

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4">

                <div className="flex justify-center items-center min-h-[500px]">

                    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-[500px] lg:h-[500px] mx-auto">

                        <h3 className="pm-custom-section-subheading pm-h3 mt-5">
                            {cateringSection.title}
                        </h3>

                        <p className="text-base sm:text-lg text-[#894105] mb-8 leading-relaxed text-left">
                            {cateringSection.description}
                        </p>

                        <div className="text-center">

                            <Link
                                href={
                                    cateringSection.links?.catering?.url ||
                                    "/catering"
                                }
                                className="cta-link cta-link-arrow touch-manipulation inline-flex items-center justify-center"
                                aria-label={
                                    cateringSection.links?.catering?.text ||
                                    "Request catering"
                                }
                            >
                                {cateringSection.links?.catering?.text}
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default CateringSection;