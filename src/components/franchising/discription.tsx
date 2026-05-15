"use client";

import Image from "next/image";
import { FranchisingData } from "@/src/types/franchising";
import { processImageUrl } from "@/src/utils/imageUtils";
import OptimizedImage from "@/src/components/Home/OptimizedImage";

interface DescriptionProps {
    cms?: FranchisingData;
}

const Description = ({ cms }: DescriptionProps) => {

    return (

        <section className="relative w-full py-10 flex flex-col items-center justify-center">

            <div
                className="absolute inset-0 bg-no-repeat bg-scroll md:bg-fixed 
                bg-[length:200px_auto,100px_auto] md:bg-[length:380px_auto,180px_auto] 
                bg-[position:calc(-3%_-_90px)_90%,calc(90%_+_110px)_100px] 
                opacity-10"
                style={{
                    backgroundImage:
                        "url('/assets/franchising-bg.jpg'), url('/assets/catering/background-maincontent.jpg')",
                }}
            />

            <div className="p-4 md:p-16 items-center justify-center flex flex-col gap-4">

                {/* Main Heading */}
                <h3 className="pm-custom-section-subheading pm-h3">
                    {cms?.whyChooseCluck?.title ||
                        "Why Choose Cluck Clucks?"}
                </h3>

                {/* Description Paragraph */}
                <p className="text-[#8d4105] text-xl md:text-xl text-center max-w-6xl md:mx-auto leading-relaxed">
                    {cms?.whyChooseCluck?.subtitle ||
                        "Experience our unique fusion of fried chicken and waffles, which appeal to individuals and families of all backgrounds, ages, and ethnicities. Benefit from our team's 20+ years of combined industry expertise. Enjoy streamlined operations, low costs, and minimal waste."}
                </p>

                {cms?.whyChooseCluck?.links?.applyNow && (

                    <div className="w-[280px] sm:w-[350px] lg:w-[430px] p-8 flex justify-center rounded-md">

                        <button
                            type="button"
                            aria-label="Join our team"
                            className="flex items-center font-bold transform transition-all duration-300 
                            text-[#EF4325] border-b-2 border-[#EF4325] 
                            hover:scale-110 hover:text-[#5c2c00] hover:border-[#5c2c00] text-[20px]"
                            onClick={() => {

                                const formSection =
                                    document.querySelector(".apply-form-section");

                                if (formSection) {
                                    formSection.scrollIntoView({
                                        behavior: "smooth",
                                    });
                                }
                            }}
                        >
                            {cms.whyChooseCluck.links.applyNow.text}

                            <span className="ml-2">
                                &raquo;
                            </span>

                        </button>

                    </div>
                )}

            </div>

            <article className="relative w-full pt-2 pb-2 flex flex-col md:flex-row max-w-7xl mx-auto gap-4 items-start justify-between px-4">

                {/* Left Content */}
                <div className="flex-[1.6] flex flex-col justify-center items-start text-left">

                    {/* Quick Facts */}
                    {cms?.facts?.visible && (
                        <>
                            <h3 className="pm-custom-section-subheading pm-h3">
                                {cms.facts.title}
                            </h3>

                            <div className="text-[#894105] font-[Inter] text-[18px] leading-[1.7] mb-10 whitespace-pre-line">
                                {cms.facts.description}
                            </div>
                        </>
                    )}

                    {/* Site Criteria */}
                    {cms?.siteCriteria?.visible && (
                        <>
                            <h3 className="pm-custom-section-subheading pm-h3">
                                {cms.siteCriteria.title}
                            </h3>

                            <div className="text-[#894105] font-[Inter] text-[18px] leading-[1.7] mb-10 whitespace-pre-line">
                                {cms.siteCriteria.description}
                            </div>
                        </>
                    )}

                </div>

                {/* Right Content */}
                <div className="w-full md:flex-[1] flex justify-center md:justify-end">

                    {cms?.facts?.image ? (

                        <OptimizedImage
                            src={processImageUrl(cms.facts.image.url)}
                            alt={cms.facts.image.title}
                            className="w-full h-full rounded-2xl object-cover shadow-lg"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />

                    ) : (

                        <Image
                            src="/assets/ourStory-Heroimage.jpg"
                            alt="Chicken and Waffles"
                            width={800}
                            height={800}
                            className="w-full h-full rounded-2xl object-cover shadow-lg"
                        />

                    )}

                </div>

            </article>

        </section>
    );
};

export default Description;