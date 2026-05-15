import { FranchisingData } from "@/src/types/franchising";
import { processImageUrl } from "../../utils/imageUtils";
import OptimizedImage from "../Home/OptimizedImage";

interface GridImagesProps {
  cms?: FranchisingData;
  onImageClick?: (index: number) => void;
}

const gridImages: React.FC<GridImagesProps> = ({ cms, onImageClick }) => {
    return (
        <>
         <section className="w-full bg-[#F3C317] ">
                    <div className="w-full">
                        {cms?.imagesSection?.visible && cms.imagesSection.images && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 px-2 md:px-3">
                                {cms.imagesSection.images.map((image, index) => (
                                    <div 
                                        key={index} 
                                        className="relative rounded-[32px] overflow-hidden shadow-lg w-full cursor-pointer group"
                                        onClick={() => onImageClick?.(index)}
                                    >
                                        <OptimizedImage
                                            src={processImageUrl(image.url)}
                                            alt={image.title}
                                            className="object-cover w-full h-96 md:h-[32rem] transition-transform duration-300 group-hover:scale-105"
                                            loading="lazy"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-yellow-500/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
        </>
    )
}
export default gridImages;