export interface LinkData {
  url: string;
  text: string;
  uid?: string;
}

export interface TitleSection {
  visible: boolean;
  title: string;
  subtitle: string;
}

export interface ComingSoonSection {
  visible: boolean;
  ribbon_title: string;
  links: LinkData[];
}

export interface FactsSection {
  visible: boolean;
  title: string;
  description: string;
  image: {
    title: string;
    url: string;
  };
}

export interface FormSection {
  visible: boolean;
  title: string;
  subtitle: string;
}

export interface FranchisingJourneySection {
  visible: boolean;
  ribbon_title: string;
  title: string;
  cards: JourneyCard[];
}

export interface JourneyCard {
  title: string;
  description: string;
  image: {
    title: string;
    url: string;
  };
}

export interface GetStartedSection {
  visible: boolean;
  title: string;
  links: {
    applyOnline: LinkData;
  };
}

export interface ImagesSection {
  visible: boolean;
  images: Array<{
    title: string;
    url: string;
  }>;
}

export interface SiteCriteriaSection {
  visible: boolean;
  title: string;
  description: string;
}

export interface TestimonialCard {
  title: string;
  subtitle: string;
}

export interface TestimonialsSection {
  visible: boolean;
  cards: TestimonialCard[];
}

export interface WhyChooseCluckSection {
  visible: boolean;
  title: string;
  subtitle: string;
  links: {
    applyNow: LinkData;
  };
}

export interface FranchisingData {
  titleSection: TitleSection;
  comingSoonSection: ComingSoonSection;
  facts: FactsSection;
  form: FormSection;
  franchisingJourneySection: FranchisingJourneySection;
  getStarted: GetStartedSection;
  imagesSection: ImagesSection;
  siteCriteria: SiteCriteriaSection;
  testimonialsSection: TestimonialsSection;
  whyChooseCluck: WhyChooseCluckSection;
}

export interface CMSData {
  franchising?: FranchisingData;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}