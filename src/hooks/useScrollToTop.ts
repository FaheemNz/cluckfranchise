'use client'

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { scrollToTop, scrollToTopWithRAF } from '../utils/scrollUtils';

/**
 * Custom hook that automatically scrolls to top when the route changes
 * Can be used in individual components if needed
 */
export const useScrollToTop = (): void => {
    const pathname = usePathname();

    useEffect(() => {
        scrollToTop();
        scrollToTopWithRAF();
    }, [pathname]);
};

/**
 * Custom hook that scrolls to top on component mount
 * Useful for individual pages that need to scroll to top when loaded
 */
export const useScrollToTopOnMount = (): void => {
    useEffect(() => {
        scrollToTop();
        scrollToTopWithRAF();
    }, []);
};

/**
 * Vercel-optimized hook for scroll to top
 * Includes multiple fallbacks and timing optimizations for production
 */
export const useScrollToTopVercel = (): void => {
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Skip on first render to avoid hydration issues
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const performScroll = () => {
            // Multiple scroll methods for maximum compatibility
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            
            // Additional fallbacks
            const html = document.querySelector('html');
            const body = document.querySelector('body');
            if (html) html.scrollTop = 0;
            if (body) body.scrollTop = 0;
        };

        // Immediate scroll
        performScroll();
        
        // Delayed scrolls for Vercel
        const timeouts = [0, 10, 50, 100, 200, 500].map(delay => 
            setTimeout(performScroll, delay)
        );
        
        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, [pathname]);
};
