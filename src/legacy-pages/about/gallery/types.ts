export interface GalleryItem {
  id?: number;
  url: string;
  title: string;
  // Legacy fields for backward compatibility
  img?: string;
  image?: string;
  imageUrl?: string;
  src?: string;
  name?: string;
  caption?: string;
}

export interface TitleSection {
  visible?: boolean;
  title?: string;
}

export interface ImagesSection {
  visible?: boolean;
  images?: GalleryItem[];
}

export interface GalleryData {
  titleSection?: TitleSection;
  imagesSection?: ImagesSection;
}

export interface CMSData {
  gallery?: GalleryData;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}