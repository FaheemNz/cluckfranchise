"use client";

import { useRouter } from "next/navigation";
import { FranchisingData } from "@/src/types/franchising";

interface MainContentProps {
    cms?: FranchisingData;
}

const MainContent = ({ cms }: MainContentProps) => {

    const router = useRouter();

    return (
        <section className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto">

            {/* Wrapper */}
            <div className="flex flex-col items-center gap-10">

                {/* Ribbon Banner */}
                {cms?.comingSoonSection?.visible && (
                    <div
                        className="text-[24px] font-bold uppercase text-[#A15B21] bg-[#F3C317] px-7 py-2 mx-auto -rotate-3 leading-tight w-fit"
                        style={{
                            clipPath:
                                "polygon(0 0, 100% 0, calc(100% - 0.8em) 50%, 100% 100%, 0 100%, 0.8em 50%)",
                        }}
                    >
                        {cms.comingSoonSection.ribbon_title ||
                            "Locations Coming Soon!"}
                    </div>
                )}

                {/* Region Link */}
                {cms?.comingSoonSection?.links &&
                    cms.comingSoonSection.links.length > 0 && (
                        <div className="w-[280px] sm:w-[350px] lg:w-[430px] border-2 border-[#F15B40] p-8 flex justify-center rounded-md">

                            <button
                                type="button"
                                aria-label="Join our team"
                                className="flex items-center font-bold transform transition-all duration-300 
                                text-[#EF4325] border-b-2 border-[#EF4325] 
                                hover:scale-110 hover:text-[#5c2c00] hover:border-[#5c2c00] text-[20px]"
                                onClick={() => {

                                    const url =
                                        cms.comingSoonSection.links?.[0]?.url;

                                    if (!url) return;

                                    if (
                                        url.startsWith("http://") ||
                                        url.startsWith("https://")
                                    ) {
                                        window.open(url, "_blank");
                                    } else {
                                        router.push(url);
                                    }
                                }}
                            >
                                {cms.comingSoonSection.links[0].text ||
                                    "YORK REGION"}

                                <span className="ml-2">
                                    &raquo;
                                </span>

                            </button>

                        </div>
                    )}

            </div>

        </section>
    );
};

export default MainContent;