import Image from "next/image";
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
  width = 1200,
  height = 800,
  priority = false,
}: OptimizedImageProps) => {
  const imageSrc =
    src?.startsWith("/storage/") || src?.startsWith("/uploads/")
      ? toAbsoluteUrl(src) || src
      : src?.startsWith("/")
        ? src
        : toAbsoluteUrl(src) || src;

  return (
    <Image
      src={imageSrc || fallbackSrc}
      alt={alt || "Cluck Clucks image"}
      className={className}
      onLoad={onLoad}
      onError={onError}
      sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
      priority={priority}
      loading={priority ? "eager" : loading}
      width={width}
      height={height}
    />
  );
};

export default OptimizedImage;