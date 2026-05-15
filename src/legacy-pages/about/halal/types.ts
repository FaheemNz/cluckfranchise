export interface TitleSection {
  visible?: boolean;
  title?: string;
}

export interface BannerSection {
  visible?: boolean;
  title?: string;
  description?: string;
  image?: {
    title?: string;
    url?: string;
  };
  links?: {
    cta?: {
      text?: string;
      url?: string;
    };
  };
}

export interface ImagesSection {
  visible?: boolean;
  images?: Array<{
    title?: string;
    url?: string;
  }>;
}

export interface HalalData {
  titleSection?: TitleSection;
  bannerSection?: BannerSection;
  imagesSection?: ImagesSection;
}

export interface CMSData {
  halal?: HalalData;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
