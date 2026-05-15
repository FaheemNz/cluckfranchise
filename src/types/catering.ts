export interface CateringImage {
  title: string;
  url: string;
}

export interface CateringLinks {
  order: {
    text: string;
    url: string;
  };
  request: {
    text: string;
    url: string;
  };
}

export interface BannerSection {
  visible: boolean;
  title: string;
  description: string;
  image: {
    title: string;
    url: string;
  };
  links: CateringLinks;
}

export interface FormSection {
  visible: boolean;
  title: string;
  subtitle: string;
}

export interface ImagesSection {
  visible: boolean;
  images: CateringImage[];
}

export interface TitleSection {
  visible: boolean;
  title: string;
}

export interface Location {
  id: number;
  title: string;
}

export interface CateringData {
  titleSection: TitleSection;
  bannerSection: BannerSection;
  formSection: FormSection;
  imagesSection: ImagesSection;
  location: Location[];
}

export interface CMSData {
  catering?: CateringData;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
