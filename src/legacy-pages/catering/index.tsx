'use client'

import React from 'react';
import Pagebanner from '../../components/common/Pagebanner';
import CateringImages from '../../components/Catering/cateringImages';
import CateringForm from '../../components/Catering/cateringForm';
import ErrorBoundary from '../../components/Home/ErrorBoundary';
import { processImageUrl } from '../../utils/imageUtils';

interface CateringProps {
    cmsData: any;
}

const Catering: React.FC<CateringProps> = ({ cmsData }) => {
    const cms = {
        catering: cmsData?.catering?.sections || cmsData?.catering
    };

    return (
        <ErrorBoundary>
            <Pagebanner title={cms?.catering?.titleSection?.title || "Catering"} />
            <main className="relative min-h-screen flex flex-col">
                {/* Banner Section */}
                {cms?.catering?.bannerSection?.visible && (
                    <section className="relative w-full px-5 md:!px-[20px] xl:px-0">
                        <article className="relative w-full py-12 flex flex-col md:flex-row max-w-7xl mx-auto gap-10 items-center justify-between">
                            <div className="flex-1 flex flex-col justify-center items-start text-left">
                                <h2 className="pm-custom-section-subheading pm-h3">
                                    {cms.catering.bannerSection.title}
                                </h2>
                                <p className="text-[#984105] text-lg mb-8 leading-relaxed">
                                    {cms.catering.bannerSection.description}
                                </p>

                                <div className="space-y-8 w-full">
                                    <div>
                                        <button
                                            type="button"
                                            aria-label="Order catering now"
                                            className="flex items-center font-bold transform transition-all duration-300 
                                                text-[#EF4325] border-b-2 border-[#EF4325] 
                                                hover:scale-110 hover:text-[#5c2c00] hover:border-[#5c2c00] text-[18px]
                                                focus:outline-none focus:ring-2 focus:ring-[#EF4325] focus:ring-offset-2"
                                            onClick={() => {
                                                window.open('https://order.toasttab.com/online/locations/54ed1204-761d-4471-8efa-f815144010f0/default', '_blank');
                                            }}
                                        >
                                            {cms?.catering?.bannerSection?.links?.order?.text} <span className="ml-6">&raquo;</span>
                                        </button>
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            aria-label="Request special catering order"
                                            className="flex items-center font-bold transform transition-all duration-300 
                                                text-[#EF4325] border-b-2 border-[#EF4325] 
                                                hover:scale-110 hover:text-[#5c2c00] hover:border-[#5c2c00] text-[20px]
                                                focus:outline-none focus:ring-2 focus:ring-[#EF4325] focus:ring-offset-2"
                                            onClick={() => {
                                                const formSection = document.querySelector('section.background-images');
                                                if (formSection) {
                                                    formSection.scrollIntoView({
                                                        behavior: 'smooth',
                                                        block: 'start'
                                                    });
                                                }
                                            }}
                                        >
                                            {cms?.catering?.bannerSection?.links?.request?.text}{" "}
                                            <span className="ml-2">&raquo;</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 flex justify-center lg:items-stretch">
                                <img
                                    src={cms?.catering?.bannerSection?.image?.url ?
                                        processImageUrl(cms.catering.bannerSection!.image.url) :
                                        '/assets/logo.png'
                                    }
                                    alt={cms?.catering?.bannerSection?.image?.title || "Catering Hero"}
                                    className="w-[600px] md:w-full h-[400px] md:h-[700px] max-w-2xl rounded-2xl object-cover shadow-lg"
                                    onError={(e) => {
                                        e.currentTarget.src = '/assets/logo.png';
                                    }}
                                />
                            </div>
                        </article>
                    </section>
                )}

                {/* Images Section */}
                {cms?.catering?.imagesSection?.visible && (
                    <section className="w-full bg-[#F3C317] py-3">
                        <CateringImages
                            imagesSection={cms?.catering?.imagesSection}
                            isLoading={false}
                        />
                    </section>
                )}

                {/* Form Section */}
                {cms?.catering?.formSection?.visible && (
                    <section className="background-images bg-[#f4ebe4] relative w-full py-10">
                        <div className="max-w-4xl mx-auto">
                            <CateringForm
                                formSection={cms?.catering?.formSection}
                                locations={cmsData?.locations || []}
                                isLoading={false}
                            />
                        </div>
                    </section>
                )}
            </main>
        </ErrorBoundary>
    );
};

export default Catering;