import { API_KEY, API_BASE } from './apiConfig';

// Event API response types
export interface Event {
  id: number;
  title: string;
  slug: string;
  image: string | null;
  content: string;
  created_at: string;
}

export interface EventListResponse {
  success: boolean;
  data: {
    current_page: number;
    data: Event[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      page: number | null;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export interface EventDetailResponse {
  success: boolean;
  data: Event;
}

// API endpoint
const EVENTS_ENDPOINT = `${API_BASE}/api/events`;

// Fetch all events
export async function fetchEvents(page: number = 1): Promise<EventListResponse> {
  const response = await fetch(`${EVENTS_ENDPOINT}?page=${page}`, {
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Fetch single event by slug
export async function fetchEvent(slug: string): Promise<EventDetailResponse> {
  const response = await fetch(`${EVENTS_ENDPOINT}/${slug}`, {
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch event: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Helper function to format date
export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function to extract date for display (e.g., "SEP 11")
export function formatEventDisplayDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate().toString();
  return `${month} ${day}`;
}
