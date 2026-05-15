// TypeScript interfaces for Menu CMS data structure

export interface MenuItem {
  id: number;
  title: string;
  description: string;
  image: {
    title: string;
    url: string;
  } | null;
  category: string;
  reviews_count: number;
  locations: Array<{
    id: number;
    title: string;
  }>;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}

export interface MenuSection {
  visible: boolean;
  menuItems: MenuCategory[];
}

export interface TitleSection {
  visible: boolean;
  title: string;
}

export interface MenuSections {
  titleSection: TitleSection;
  menuSection: MenuSection;
}

export interface MenuData {
  sections: MenuSections;
}

export interface CMSData {
  menu: MenuData;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}
