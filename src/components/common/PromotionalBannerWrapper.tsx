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

  if (pathname !== '/') return null;
  if (!bannerData?.active) return null;

  return <PromotionalBanner bannerData={bannerData} />;
}