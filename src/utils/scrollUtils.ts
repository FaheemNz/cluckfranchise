/**
 * Utility functions for handling scroll behavior
 */

/**
 * Scrolls to the top of the page using multiple methods for maximum compatibility
 */
export const scrollToTop = (): void => {
    // Method 1: Standard window.scrollTo
    window.scrollTo(0, 0);
    
    // Method 2: Direct DOM manipulation for older browsers
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Method 3: For cases where the above don't work
    const scrollContainer = document.querySelector('html') || document.body;
    if (scrollContainer) {
        scrollContainer.scrollTop = 0;
    }
};

/**
 * Scrolls to top with smooth behavior
 */
export const scrollToTopSmooth = (): void => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
};

/**
 * Ensures scroll to top happens after a delay to account for DOM updates
 */
export const scrollToTopDelayed = (delay: number = 0): void => {
    setTimeout(() => {
        scrollToTop();
    }, delay);
};

/**
 * Scrolls to top using requestAnimationFrame for better timing
 */
export const scrollToTopWithRAF = (): void => {
    requestAnimationFrame(() => {
        scrollToTop();
    });
};
