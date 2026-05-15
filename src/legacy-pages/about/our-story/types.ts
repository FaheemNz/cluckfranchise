export interface AboutCard {
  title: string;
  description: string;
  image?: {
    title: string;
    url: string;
  };
  ctaText: string;
  ctaUrl: string;
}

export interface HeroSection {
  visible: boolean;
  title: string;
  subtitle: string;
  image: {
    title: string;
    url: string;
  };
  description: string;
}

export interface PhilosophySection {
  visible: boolean;
  ribbon_title: string;
  title: string;
  description: string;
}

export interface CardsSection {
  visible: boolean;
  cards: AboutCard[];
}

export interface TitleSection {
  visible: boolean;
  title: string;
}

export interface OurStoryData {
  titleSection: TitleSection;
  heroSection: HeroSection;
  philosophySection: PhilosophySection;
  cardsSection: CardsSection;
}

export interface CMSData {
  ourStory?: OurStoryData;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
