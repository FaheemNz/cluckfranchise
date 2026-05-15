import { API_KEY, BLOGS_ENDPOINT } from './apiConfig';

// Blog API response types
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  cover_image: string | null;
  created_at: string;
}

export interface BlogListResponse {
  success: boolean;
  data: {
    current_page: number;
    data: BlogPost[];
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

export interface BlogDetailResponse {
  success: boolean;
  data: BlogPost;
}

// Fetch all blog posts
export async function fetchBlogPosts(page: number = 1): Promise<BlogListResponse> {
  const response = await fetch(`${BLOGS_ENDPOINT}?page=${page}`, {
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog posts: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Fetch single blog post by slug
export async function fetchBlogPost(slug: string): Promise<BlogDetailResponse> {
  const response = await fetch(`${BLOGS_ENDPOINT}/${slug}`, {
    headers: {
      'X-API-KEY': API_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog post: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Helper function to format date
export function formatBlogDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

