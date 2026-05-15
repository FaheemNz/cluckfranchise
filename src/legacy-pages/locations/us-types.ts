// TypeScript interfaces for US Locations CMS data structure

export interface ClucksNearYouSection {
  visible: boolean;
  ribbon_title: string;
  title: string;
  image: {
    title: string;
    url: string;
  };
  links?: {
    iframeLink?: {
      text?: string;
      url?: string;
    };
    mapLink?: {
      text?: string;
      url?: string;
    };
  };
}

export interface LocationCard {
  id: number;
  title: string;
  address1: string;
  address2: string;
  phone: string;
  timings: Array<{ days: string; time: string }> | string[];
  hours?: {
    mondayThursday: string;
    fridaySaturday: string;
    sunday: string;
  };
  features: string[];
  links: {
    primary: {
      location: string;
      map: string;
      order: string;
    };
    social: Array<{
      platform: string;
      url: string;
    }>;
  };
}

export interface LocationsSection {
  visible: boolean;
  cards: LocationCard[];
}

export interface ComingSoonSection {
  visible: boolean;
  ribbon_title: string;
  links: any[];
}

export interface TitleSection {
  visible: boolean;
  title: string;
}

export interface USLocationsData {
  titleSection: TitleSection;
  clucksNearYouSection: ClucksNearYouSection;
  comingSoonSection: ComingSoonSection;
  locationsSection: LocationsSection;
}

export interface CMSData {
  us: USLocationsData;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
