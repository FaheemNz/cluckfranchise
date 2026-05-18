'use client';

import { usePathname } from 'next/navigation';
import PromotionalBanner from './PromotionalBanner';

interface BannerData {
  text: string;
  link: string;
  active: boolean;
}

interface PromotionalBannerWrapperProps {
  bannerData?: BannerData | null;
}

export default function PromotionalBannerWrapper({
  bannerData,
}: PromotionalBannerWrapperProps) {
  const pathname = usePathname();

  const normalizedPathname = pathname?.replace(/\/+$/, '') || '/';
  const isHomePage = normalizedPathname === '/';

  console.log('BANNER DEBUG:', {
    pathname,
    normalizedPathname,
    isHomePage,
    bannerData,
  });

  if (!isHomePage) return null;
  if (bannerData?.active !== true) return null;

  return <PromotionalBanner bannerData={bannerData} />;
}