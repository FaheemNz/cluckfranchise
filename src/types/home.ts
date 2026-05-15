// TypeScript interfaces for CMS data structure

export interface LinkData {
  url: string;
  text: string;
}

export interface BannerSection {
  visible: boolean;
  title: string;
  description: string;
  image: {
    url: string;
    title: string;
  };
  links: {
    order: LinkData;
  };
}

export interface SliderImagesSection {
  visible: boolean;
  images: {
    url: string;
    title: string;
  }[];
  quote?: string;
  author?: string;
}

export interface CrispyAndCrunchySection {
  visible: boolean;
  ribbon_title: string;
  title: string;
  description: string;
  links: {
    location: LinkData;
  };
}

export interface ImagesSection {
  visible: boolean;
  images: {
    url: string;
    title: string;
  }[];
}

export interface CateringSection {
  visible: boolean;
  title: string;
  description: string;
  links: {
    catering: LinkData;
  };
}

export interface NewsSection {
  visible: boolean;
  ribbon_title: string;
  title: string;
  subtitle: string;
  partner_images: {
    url: string;
    title: string;
  }[];
  links: {
    award: LinkData;
  };
}

export interface ReviewSection {
  visible: boolean;
  reviews: Array<{
    id: number;
    comment: string;
    username: string;
    image?: {
      title: string;
      url: string;
    };
    item?: string;
  }>;
}

export interface HomeData {
  bannerSection: BannerSection;
  sliderImagesSection: SliderImagesSection;
  crispyAndCrunchySection: CrispyAndCrunchySection;
  imagesSection: ImagesSection;
  imagesSection2: ImagesSection;
  cateringSection: CateringSection;
  newsSection: NewsSection;
  reviewSection?: ReviewSection;
}

export interface CMSData {
  home: HomeData;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface ImageCardData {
  id: number;
  src: string;
  alt: string;
}
