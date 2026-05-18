import Link from "next/link";

interface ComingSoonLocation {
    text: string;
    url: string;
}

interface ComingSoonSection {
    visible: boolean;
    ribbon_title: string;
    links: ComingSoonLocation[];
}

interface ComingSoonProps {
    comingSoonSection: ComingSoonSection;
}

const ComingSoon = ({
    comingSoonSection,
}: ComingSoonProps) => {

    if (!comingSoonSection?.visible) {
        return null;
    }

    return (

        <div className="py-8 bg-[#f4ebe4]">

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Coming Soon Banner */}
                <div
                    className="text-xl font-bold uppercase text-[#A15B21] bg-[#F3C317] px-6 py-2 mx-auto -rotate-3 leading-tight w-fit mb-8"
                    style={{
                        clipPath:
                            "polygon(0 0, 100% 0, calc(100% - 0.8em) 50%, 100% 100%, 0 100%, 0.8em 50%)",
                    }}
                >
                    {comingSoonSection.ribbon_title}
                </div>

                {/* Coming Soon Locations */}
                {comingSoonSection.links &&
                    comingSoonSection.links.length > 0 && (

                        <div className="flex flex-wrap justify-center gap-6">

                            {comingSoonSection.links.map(
                                (
                                    location: ComingSoonLocation,
                                    index: number
                                ) => {

                                    const isExternal =
                                        location.url.startsWith("http://") ||
                                        location.url.startsWith("https://");

                                    if (isExternal) {

                                        return (

                                            <a
                                                key={index}
                                                href={location.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="border-2 border-[#EF4325] px-6 py-4 text-center min-w-[200px] cursor-pointer"
                                            >
                                                <div className="cta-link text-[#EF4325] font-bold uppercase text-lg">
                                                    {location.text} »
                                                </div>
                                            </a>
                                        );
                                    }

                                    return (

                                        <Link
                                            prefetch={false}
                                            key={index}
                                            href={location.url}
                                            className="border-2 border-[#EF4325] px-6 py-4 text-center min-w-[200px] cursor-pointer"
                                        >
                                            <div className="cta-link text-[#EF4325] font-bold uppercase text-lg">
                                                {location.text} »
                                            </div>
                                        </Link>
                                    );
                                }
                            )}

                        </div>
                    )}

            </div>

        </div>
    );
};

export default ComingSoon;