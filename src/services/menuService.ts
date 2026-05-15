import { API_KEY, API_BASE } from './apiConfig';

// Menu API response types
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
  share_links: Array<{
    platform: string;
    url: string;
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

export interface MenuData {
  sections: {
    titleSection: TitleSection;
    menuSection: MenuSection;
  };
}

export interface MenuResponse {
  success: boolean;
  data: {
    menu: MenuData;
  };
}

// API endpoint
const MENU_ENDPOINT = `${API_BASE}/api/menu`;

// Fetch menu data
export async function fetchMenu(): Promise<MenuResponse> {
  const response = await fetch(MENU_ENDPOINT, {
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch menu: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
