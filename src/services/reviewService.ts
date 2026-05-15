// Review service for handling review submissions
import { API_KEY, REVIEWS_ENDPOINT } from './apiConfig';

export interface ReviewSubmissionData {
  location_id: number;
  menu_item_id: number;
  comment: string;
  email: string;
  recaptcha_token?: string | null;
}

export interface ReviewSubmissionResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface Review {
  id: number;
  email: string;
  comment: string;
  created_at: string;
  username: string;
}

export interface ReviewsResponse {
  success: boolean;
  data: {
    menu_item_id: string;
    total_reviews: number;
    reviews: Review[];
  };
}

export const fetchReviews = async (menuItemId: number): Promise<ReviewsResponse> => {
  try {
    const response = await fetch(`${REVIEWS_ENDPOINT}?menu_item_id=${menuItemId}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

export const submitReview = async (reviewData: ReviewSubmissionData): Promise<ReviewSubmissionResponse> => {
  try {
    const response = await fetch(REVIEWS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return {
      success: true,
      message: 'Review submitted successfully!',
      data: result
    };
  } catch (error) {
    console.error('Error submitting review:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit review. Please try again.',
    };
  }
};
