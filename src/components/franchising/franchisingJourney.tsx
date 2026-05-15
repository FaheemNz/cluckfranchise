import Image from "next/image";
import { FranchisingData } from "@/src/types/franchising";
import { processImageUrl } from "@/src/utils/imageUtils";
import OptimizedImage from "../Home/OptimizedImage";

interface FranchisingJourneyProps {
    cms?: FranchisingData;
}

const FranchisingJourney: React.FC<FranchisingJourneyProps> = ({ cms }) => {
    return (
        <>
            <section className="w-full bg-[#F7F0EA] py-12 flex flex-col items-center justify-center ">

                {/* Ribbon Banner */}
                {cms?.franchisingJourneySection?.visible && (
                    <div
                        className="text-[24px] font-bold uppercase text-[#A15B21] bg-[#F3C317] px-7 py-2 mx-auto -rotate-3 leading-tight w-fit"
                        style={{
                            clipPath:
                                "polygon(0 0, 100% 0, calc(100% - 0.8em) 50%, 100% 100%, 0 100%, 0.8em 50%)",
                        }}
                    >
                        {cms.franchisingJourneySection.ribbon_title || "Start Here"}
                    </div>
                )}
                <h3 className="pm-custom-section-subheading pm-h3" style={{ fontFamily: 'MDNichrome, Arial Black, Helvetica Black, sans-serif' }}>
                    {cms?.franchisingJourneySection?.title || "Franchising Journey"}
                </h3>

                <div className="max-w-7xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-10 px-4">
                    {cms?.franchisingJourneySection?.cards ? (
                        cms.franchisingJourneySection.cards.map((card, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow px-4 md:px-8 flex flex-col items-center py-2 md:py-10 h-auto min-h-[420px]">
                                <div
                                    className="h-20 w-auto mb-6"
                                    style={{ filter: 'invert(38%) sepia(78%) saturate(739%) hue-rotate(327deg) brightness(94%) contrast(94%)' }}
                                >
                                    <OptimizedImage
                                        src={processImageUrl(card.image.url)}
                                        alt={card.image.title}
                                        className="h-20 w-auto"
                                        loading="lazy"
                                    />
                                </div>
                                <h3 className="text-[#EF4325] text-[19px] font-bold text-center mb-4">{card.title}</h3>
                                <p className="text-[#A15B21] text-[19px] text-center">
                                    {card.description}
                                </p>
                            </div>
                        ))
                    ) : (
                        // Fallback static content if no CMS data
                        <div className="bg-white rounded-2xl shadow px-4 md:px-8 flex flex-col items-center py-6 md:py-10 h-auto min-h-[420px]">
                            <Image
                                src="/assets/franchising-card2.jpg"
                                alt="Careers"
                                width={200}
                                height={80}
                                className="h-20 w-auto mb-6"
                            />
                            <h3 className="text-[#EF4325] text-xl font-bold text-center mb-4">Step 1: Submit the Application Form</h3>
                            <p className="text-[#A15B21] text-base text-center">
                                Complete and submit the franchise application form available on our website.
                            </p>
                        </div>
                    )}
                </div>

                {cms?.testimonialsSection?.visible && (
                    <div className='mt-16'>
                        <h3 className="pm-custom-section-subheading pm-h3 mt-7"> Franchisee Testimonials</h3>
                        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-10 px-4">
                            {cms.testimonialsSection.cards.map((testimonial, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow px-4 md:px-8 flex flex-col items-center py-6 md:py-10 min-h-[540px]">
                                    <p className="text-[#A15B21] text-[19px] text-center flex-grow">
                                        "{testimonial.title}"
                                    </p>
                                    <div className="mt-auto">
                                        <h3 className="text-[#894105] text-[19px] font-bold text-center my-9">
                                            — {testimonial.subtitle}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}
export default FranchisingJourney;