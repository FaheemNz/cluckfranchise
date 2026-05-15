'use client'

import React from 'react';
import { API_BASE, API_KEY } from './apiConfig';

/**
 * Global Data Manager
 * Handles one-time API fetching on app load and provides in-memory cached data to all pages
 */

export interface GlobalDataState {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
  data: Record<string, any> | null;
}

class GlobalDataManager {
  private static instance: GlobalDataManager;
  private state: GlobalDataState = {
    isLoaded: false,
    isLoading: false,
    error: null,
    data: null
  };
  private listeners: Set<(state: GlobalDataState) => void> = new Set();

  private constructor() {}

  static getInstance(): GlobalDataManager {
    if (!GlobalDataManager.instance) {
      GlobalDataManager.instance = new GlobalDataManager();
    }
    return GlobalDataManager.instance;
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: (state: GlobalDataState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Get current state
   */
  getState(): GlobalDataState {
    return { ...this.state };
  }

  /**
   * Notify all listeners of state changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }


  /**
   * Fetch all CMS data from /api/updates endpoint
   */
  async fetchAllData(): Promise<void> {
    if (this.state.isLoading || this.state.isLoaded) {
      return;
    }

    this.state.isLoading = true;
    this.state.error = null;
    this.notifyListeners();

    try {
      // Fetch data from API
      const response = await fetch(`${API_BASE}/api/updates`, {
        method: 'GET',
        headers: {
          'X-API-KEY': API_KEY,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success && result.updates) {
        // Update state with fetched data
        this.state.data = result.updates;
        this.state.isLoaded = true;
        this.state.isLoading = false;
        this.state.error = null;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'Failed to fetch data';
      this.state.isLoading = false;
    }

    this.notifyListeners();
  }

  /**
   * Get data for a specific page
   */
  getPageData(pageKey: string): any | null {
    if (this.state.data) {
      return this.state.data[pageKey] || null;
    }
    
    return null;
  }

  /**
   * Check if data is loaded
   */
  isDataLoaded(): boolean {
    return this.state.isLoaded;
  }

  /**
   * Reset state (useful for testing or manual refresh)
   */
  reset(): void {
    this.state = {
      isLoaded: false,
      isLoading: false,
      error: null,
      data: null
    };
    this.notifyListeners();
  }
}

// Export singleton instance
export const globalDataManager = GlobalDataManager.getInstance();

// Export hook for React components
export const useGlobalData = () => {
  const [state, setState] = React.useState<GlobalDataState>(globalDataManager.getState());

  React.useEffect(() => {
    const unsubscribe = globalDataManager.subscribe(setState);
    return unsubscribe;
  }, []);

  return {
    ...state,
    fetchData: () => globalDataManager.fetchAllData(),
    getPageData: (pageKey: string) => globalDataManager.getPageData(pageKey),
    reset: () => globalDataManager.reset()
  };
};
