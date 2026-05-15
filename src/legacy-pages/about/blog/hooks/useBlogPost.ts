import { useState, useEffect } from 'react';
import { fetchBlogPost, BlogPost, formatBlogDate } from '../../../../services/blogService';

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface BlogPostData extends BlogPost {
  formattedDate: string;
}

export function useBlogPost(slug: string) {
  const [blogPost, setBlogPost] = useState<BlogPostData | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null,
  });

  const retry = () => {
    setLoadingState({ isLoading: true, error: null });
    fetchBlogPostData();
  };

  const fetchBlogPostData = async () => {
    if (!slug) {
      setLoadingState({ isLoading: false, error: 'No slug provided' });
      return;
    }

    try {
      setLoadingState({ isLoading: true, error: null });
      
      const response = await fetchBlogPost(slug);
      
      if (response.success && response.data) {
        const formattedPost: BlogPostData = {
          ...response.data,
          formattedDate: formatBlogDate(response.data.created_at)
        };
        setBlogPost(formattedPost);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      setLoadingState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch blog post'
      });
    } finally {
      setLoadingState(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    fetchBlogPostData();
  }, [slug]);

  return {
    blogPost,
    loadingState,
    retry
  };
}

