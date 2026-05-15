import { useState, useEffect } from 'react';
import { fetchBlogPosts, BlogPost, formatBlogDate } from '../../../../services/blogService';

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface BlogPostWithFormattedDate extends BlogPost {
  formattedDate: string;
}

export interface BlogData {
  posts: BlogPostWithFormattedDate[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

export function useBlogData() {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null,
  });

  const retry = () => {
    setLoadingState({ isLoading: true, error: null });
    fetchBlogData();
  };

  const fetchBlogData = async () => {
    try {
      setLoadingState({ isLoading: true, error: null });
      
      const response = await fetchBlogPosts(1);
      
      if (response.success && response.data) {
        const formattedPosts: BlogPostWithFormattedDate[] = response.data.data.map(post => ({
          ...post,
          formattedDate: formatBlogDate(post.created_at)
        }));

        setBlogData({
          posts: formattedPosts,
          currentPage: response.data.current_page,
          totalPages: response.data.last_page,
          totalPosts: response.data.total
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      setLoadingState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch blog posts'
      });
    } finally {
      setLoadingState(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return {
    blogData,
    loadingState,
    retry
  };
}
