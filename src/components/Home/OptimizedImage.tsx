"use client";

import Image from "next/image";
import {
    useState,
    useEffect,
} from "react";

import { toAbsoluteUrl } from "@/src/services/updatesService";

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    fallbackSrc?: string;
    onError?: () => void;
    onLoad?: () => void;
    loading?: "lazy" | "eager";
    sizes?: string;
    width?: number;
    height?: number;
    fill?: boolean;
    priority?: boolean;
}

const OptimizedImage = ({
    src,
    alt,
    className = "",
    fallbackSrc = "/assets/placeholder.jpg",
    onError,
    onLoad,
    loading = "lazy",
    sizes,
    width,
    height,
    fill = false,
    priority = false,
}: OptimizedImageProps) => {

    const [imageSrc, setImageSrc] = useState("");
    const [hasError, setHasError] = useState(false);

    useEffect(() => {

        const absoluteUrl =
            src?.startsWith("/")
                ? src
                : toAbsoluteUrl(src) || src;

        setImageSrc(absoluteUrl);

    }, [src]);

    const handleError = () => {

        setHasError(true);

        if (
            fallbackSrc &&
            imageSrc !== fallbackSrc
        ) {
            setImageSrc(fallbackSrc);
        }

        onError?.();
    };

    if (!imageSrc) {
        return null;
    }

    return (

        <div className={`relative overflow-hidden ${className}`}>

            {/* Error Placeholder */}
            {hasError && imageSrc === fallbackSrc ? (

                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">

                    <div className="text-center text-gray-500">

                        <svg
                            className="w-12 h-12 mx-auto mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>

                        <p className="text-sm">
                            Image unavailable
                        </p>

                    </div>

                </div>

            ) : (

                <Image
                    src={imageSrc}
                    alt={alt}
                    className={className}
                    onLoad={onLoad}
                    onError={handleError}
                    sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
                    priority={priority}
                    loading={loading}
                    width={width || 1200}
                    height={height || 800}
                />

            )}

        </div>
    );
};

export default OptimizedImage;