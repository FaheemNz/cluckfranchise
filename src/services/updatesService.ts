/*
  Updates (CMS) fetcher with localStorage caching
  - First visit: fetch full payload, cache updates object and lastUpdated
  - Returning: fetch with lastUpdated, merge only changed pages/sections
*/

import { API_BASE, API_KEY, UPDATES_ENDPOINT } from './apiConfig';

export type UpdatesPayload = {
  success: boolean;
  shouldUpdate?: boolean;
  lastUpdated: string;
  updates: Record<string, any>;
};

const isBrowser = typeof window !== 'undefined';

const LS_KEYS = {
  LAST: 'lastUpdated',
  pageKey: (page: string) => `${page}`,
} as const;

function readPage(page: string): any | null {
  if (!isBrowser) return null;
  try {
    const key = LS_KEYS.pageKey(page);
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function writePage(page: string, data: any): void {
  if (!isBrowser) return;
  localStorage.setItem(LS_KEYS.pageKey(page), JSON.stringify(data));
}

function getLastUpdated(): string | null {
  if (!isBrowser) return null;
  return localStorage.getItem(LS_KEYS.LAST);
}

function setLastUpdated(value: string): void {
  if (!isBrowser) return;
  localStorage.setItem(LS_KEYS.LAST, value);
}

async function fetchUpdates(lastUpdated?: string): Promise<UpdatesPayload> {
  const url = lastUpdated ? `${UPDATES_ENDPOINT}?lastUpdated=${encodeURIComponent(lastUpdated)}` : UPDATES_ENDPOINT;
  const headers: Record<string, string> = {};
  if (API_KEY) headers['X-API-KEY'] = API_KEY;

  const res = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Updates request failed: ${res.status} ${res.statusText} ${text ? '- ' + text.slice(0, 200) : ''}`);
  }
  return res.json();
}

// Merge sections per page and write each page separately
function mergeAndStorePages(incoming: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  Object.entries(incoming).forEach(([pageKey, pageValue]) => {
    const existing = readPage(pageKey) || {};
    
    let merged: any;
    if (pageValue && typeof pageValue === 'object' && 'sections' in pageValue) {
      // Merge sections
      const mergedSections = { ...(existing.sections || {}) };
      Object.entries(pageValue.sections || {}).forEach(([sectionKey, sectionValue]) => {
        mergedSections[sectionKey] = sectionValue;
      });
      
      // Store both sections wrapper AND direct properties (consistent with home page)
      merged = {
        sections: mergedSections,
        // Also store direct properties for easy access
        ...mergedSections
      };
    } else {
      merged = { ...existing, ...pageValue };
    }
    
    writePage(pageKey, merged);
    result[pageKey] = merged;
  });
  return result;
}

export async function ensureUpdates(): Promise<Record<string, any>> {
  const last = getLastUpdated();

  try {
    if (!last) {
      // First-time visitor: fetch full payload
      const payload = await fetchUpdates();
      const merged = mergeAndStorePages(payload.updates);
      setLastUpdated(payload.lastUpdated);
      return merged;
    }

    // Returning visitor: ask for delta
    const payload = await fetchUpdates(last);
    
    if (payload.shouldUpdate && payload.updates) {
      const merged = mergeAndStorePages(payload.updates);
      setLastUpdated(payload.lastUpdated);
      return merged;
    }
    
    // Even if no updates, return fresh data from localStorage to ensure consistency
    const snapshot: Record<string, any> = {};
    // Get all page keys that we know about
    const knownPages = ['home', 'menu', 'catering', 'about', 'canada-locations', 'usa-locations', 'halal', 'gallery', 'Gallery', 'blog', 'franchising', 'events', 'order-online', 'about-gallery', 'gallery-page'];
    knownPages.forEach((pageKey) => {
      const data = readPage(pageKey);
      if (data) snapshot[pageKey] = data;
    });
    return snapshot;
  } catch (e) {
    console.error('Error in ensureUpdates:', e);
    // On failure, fall back to whatever we have
    const snapshot: Record<string, any> = {};
    const knownPages = ['home', 'menu', 'catering', 'about', 'canada-locations', 'usa-locations', 'halal', 'gallery', 'Gallery', 'blog', 'franchising', 'events', 'order-online', 'about-gallery', 'gallery-page'];
    knownPages.forEach((pageKey) => {
      const data = readPage(pageKey);
      if (data) snapshot[pageKey] = data;
    });
    return snapshot;
  }
}

export function getPageData<T = any>(pageKey: string): T | null {
  return readPage(pageKey) as T | null;
}

// Helper: convert API file path to absolute URL
export function toAbsoluteUrl(path?: string | null): string | undefined {
  if (!path || typeof path !== 'string') return undefined;
  if (path.startsWith('http')) return path;
  
  // Ensure there's a forward slash between API_BASE and path
  const baseUrl = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const fullUrl = `${baseUrl}${cleanPath}`;
  
  return fullUrl;
}


