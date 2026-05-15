"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import OptimizedImage from "@/src/components/Home/OptimizedImage";

interface NavigationProps { }

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationsOpen, setIsLocationsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to detect when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Cleanup on unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`bg-white shadow-sm border-b border-gray-200 transition-all duration-300 ${isScrolled
          ? "fixed top-0 left-0 right-0 z-50 shadow-lg bg-white/95 backdrop-blur-sm"
          : "relative"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex lg:justify-center xl:justify-between items-center h-20">
            {/* Left Navigation Items - Hidden on small screens, visible on lg and above */}
            <div className="hidden lg:flex items-center space-x-8">
              <div className="relative group">
                <button
                  className="text-orange-600 hover:text-orange-700 font-bold text-lg tracking-wide uppercase transition-colors duration-200"
                  onClick={() => setIsLocationsOpen(!isLocationsOpen)}
                  onMouseEnter={() => setIsLocationsOpen(true)}
                  onMouseLeave={() => setIsLocationsOpen(false)}
                >
                  LOCATIONS
                </button>
                <div
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-48 bg-white shadow-lg rounded-lg transition-all duration-200 z-50 ${isLocationsOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                    }`}
                  onMouseEnter={() => setIsLocationsOpen(true)}
                  onMouseLeave={() => setIsLocationsOpen(false)}
                >
                  <div className="py-3">
                    <Link
                      href="/canada-locations"
                      className="block px-4 py-3 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors text-center"
                      onClick={() => setIsLocationsOpen(false)}
                    >
                      CANADA
                    </Link>
                    <Link
                      href="/usa-locations"
                      className="block px-4 py-3 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors text-center"
                      onClick={() => setIsLocationsOpen(false)}
                    >
                      UNITED STATES
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                href="/menu"
                className="text-orange-600 hover:text-orange-700 font-bold text-lg tracking-wide uppercase transition-colors duration-200"
              >
                MENU
              </Link>
              <Link
                href="/catering"
                className="hidden xl:flex text-orange-600 hover:text-orange-700 font-bold text-lg tracking-wide uppercase transition-colors duration-200"
              >
                CATERING
              </Link>
              <div className="relative group">
                <button
                  className="hidden xl:block text-orange-600 hover:text-orange-700 font-bold text-lg tracking-wide uppercase transition-colors duration-200"
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                  onMouseEnter={() => setIsAboutOpen(true)}
                  onMouseLeave={() => setIsAboutOpen(false)}
                >
                  ABOUT
                </button>
                <div
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-48 bg-white shadow-lg rounded-lg transition-all duration-200 z-50 ${isAboutOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                  onMouseEnter={() => setIsAboutOpen(true)}
                  onMouseLeave={() => setIsAboutOpen(false)}
                >
                  <div className="py-3">
                    <Link
                      href="/our-story"
                      className="block px-4 py-3 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors text-center"
                      onClick={() => setIsAboutOpen(false)}
                    >
                      OUR STORY
                    </Link>
                    <Link
                      href="/halal"
                      className="block px-4 py-3 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors text-center"
                      onClick={() => setIsAboutOpen(false)}
                    >
                      HALAL
                    </Link>
                    <Link
                      href="/gallery"
                      className="block px-4 py-3 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors text-center"
                      onClick={() => setIsAboutOpen(false)}
                    >
                      GALLERY
                    </Link>
                    <Link
                      href="/blog"
                      className="block px-4 py-3 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors text-center"
                      onClick={() => setIsAboutOpen(false)}
                    >
                      BLOGS
                    </Link>
                    {/* <Link
                      href="/events"
                      className="block px-4 py-3 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors text-center"
                      onClick={() => setIsAboutOpen(false)}
                    >
                      EVENTS
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Center Logo */}
            <div className="hidden lg:flex flex-col items-center lg:mx-11 xl:mx-0">
              <div className="relative">
                {/* Logo Image */}
                <Link
                  href="/"
                  className="block hover:opacity-80 transition-opacity duration-200"
                >
                  <OptimizedImage
                    src="/assets/logo.png"
                    alt="Cluck Clucks Logo"
                    className="h-12 w-auto object-contain"
                    loading="eager"
                  />
                </Link>
              </div>
            </div>

            {/* Right Navigation Items - Hidden on small screens, visible on lg and above */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link
                href="/franchising"
                className="hidden xl:flex text-orange-600 hover:text-orange-700 font-bold text-lg tracking-wide uppercase transition-colors duration-200"
              >
                FRANCHISING
              </Link>
              <Link
                href="/press"
                className="hidden xl:flex text-orange-600 hover:text-orange-700 font-bold text-lg tracking-wide uppercase transition-colors duration-200"
              >
                PRESS
              </Link>
              <a
                href="https://www.toasttab.com/cluck-clucks-downtown-222-the-esplanade-unit-a/rewardsSignup"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:block text-orange-600 hover:text-orange-700 font-bold text-lg tracking-wide uppercase transition-colors duration-200"
              >
                LOYALTY
              </a>
              <Link
                href="/locations"
                onClick={() => setIsMenuOpen(false)}
                className="bg-[#F3C317] text-[18px] hover:bg-yellow-500 text-[#653003] font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 uppercase tracking-wide"
              >
                ORDER ONLINE
              </Link>
              {/* MORE dropdown - Only visible between lg and xl */}
              <div className="xl:hidden relative">
                <button
                  className="text-orange-600 hover:text-orange-700 font-bold text-lg tracking-wide uppercase transition-colors duration-200 flex items-center space-x-1"
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  onMouseEnter={() => setIsMoreOpen(true)}
                  onMouseLeave={() => setIsMoreOpen(false)}
                >
                  <span>MORE</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-48 bg-white shadow-lg rounded-lg transition-all duration-200 z-50 ${isMoreOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                  onMouseEnter={() => setIsMoreOpen(true)}
                  onMouseLeave={() => setIsMoreOpen(false)}
                >
                  <div className="py-3">
                    <Link
                      href="/catering"
                      className="block px-4 py-3 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors text-center"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      CATERING
                    </Link>

                    {/* About with submenu */}
                    <div className="relative group/our-story">
                      <div className="px-4 py-3 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors text-center cursor-pointer">
                        ABOUT
                      </div>
                      <div className="absolute left-full top-0 ml-2 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover/our-story:opacity-100 group-hover/our-story:visible transition-all duration-200 z-50">
                        <div className="py-3">
                          <Link
                            href="/our-story"
                            className="block px-4 py-3 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors text-center"
                            onClick={() => setIsMoreOpen(false)}
                          >
                            OUR STORY
                          </Link>
                          <Link
                            href="/halal"
                            className="block px-4 py-3 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors text-center"
                            onClick={() => setIsMoreOpen(false)}
                          >
                            HALAL
                          </Link>
                          <Link
                            href="/gallery"
                            className="block px-4 py-3 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors text-center"
                            onClick={() => setIsMoreOpen(false)}
                          >
                            GALLERY
                          </Link>
                          <Link
                            href="/blog"
                            className="block px-4 py-3 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors text-center"
                            onClick={() => setIsMoreOpen(false)}
                          >
                            BLOG
                          </Link>
                          {/* <Link
                            href="/events"
                            className="block text-white text-lg uppercase tracking-wide hover:text-orange-400 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            EVENTS
                          </Link> */}
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/franchising"
                      className="block px-4 py-3 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors text-center"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      FRANCHISING
                    </Link>
                    <Link
                      href="/press"
                      className="block px-4 py-3 text-orange-600 hover:text-orange-700 font-bold uppercase tracking-wide transition-colors text-center"
                      onClick={() => setIsMoreOpen(false)}
                    >
                      PRESS
                    </Link>

                    <a
                      href="https://www.toasttab.com/cluck-clucks-downtown-222-the-esplanade-unit-a/rewardsSignup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden xl:block text-orange-600 hover:text-orange-700 font-bold text-lg tracking-wide uppercase transition-colors duration-200"
                    >
                      LOYALTY
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Screen Layout */}
            <div className="lg:hidden flex items-center justify-between w-full">
              {/* Logo Image on Left */}
              <div className="flex items-center">
                <Link
                  href="/"
                  className="block hover:opacity-80 transition-opacity duration-200"
                >
                  <OptimizedImage
                    src="/assets/logo.png"
                    alt="Cluck Clucks Logo"
                    className="h-16 w-auto object-contain"
                    loading="eager"
                  />
                </Link>
              </div>

              {/* Icons on Right */}
              <div className="flex items-center space-x-4">

                {/* Hamburger menu icon */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-orange-500 hover:text-orange-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content jump when navigation becomes fixed */}
      {isScrolled && <div className="h-20"></div>}

      {/* Mobile Menu Overlay - Outside nav for proper positioning */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Dark background */}
          <div className="absolute inset-0 bg-black"></div>

          {/* Menu content */}
          <div className="relative h-full flex flex-col overflow-y-auto pb-24">
            {/* Top section with descriptive text and close button */}
            <div className="flex justify-end items-start p-6">
              {/* Close button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu items - centered */}
            <div className="flex-1 flex items-center justify-center px-6">
              <div className="text-center w-full max-w-sm">
                {/* Main navigation items */}
                <div className="space-y-8">
                  {/* LOCATIONS */}
                  <div className="space-y-4">
                    <div className="text-white text-2xl font-bold uppercase tracking-wider">
                      LOCATIONS
                    </div>
                    <div className="space-y-3">
                      <Link
                        href="/canada-locations"
                        className="block text-white text-lg uppercase tracking-wide hover:text-orange-400 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        CANADA
                      </Link>
                      <Link
                        href="/usa-locations"
                        className="block text-white text-lg uppercase tracking-wide hover:text-orange-400 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        UNITED STATES
                      </Link>
                    </div>
                  </div>

                  {/* MENU */}
                  <Link
                    href="/menu"
                    className="block text-white text-2xl font-bold uppercase tracking-wider hover:text-orange-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    MENU
                  </Link>

                  {/* CATERING */}
                  <Link
                    href="/catering"
                    className="block text-white text-2xl font-bold uppercase tracking-wider hover:text-orange-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    CATERING
                  </Link>

                  {/* ABOUT */}
                  <div className="space-y-4">
                    <div className="text-white text-2xl font-bold uppercase tracking-wider">
                      ABOUT
                    </div>
                    <div className="space-y-3">
                      <Link
                        href="/our-story"
                        className="block text-white text-lg uppercase tracking-wide hover:text-orange-400 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        OUR STORY
                      </Link>
                      <Link
                        href="/halal"
                        className="block text-white text-lg uppercase tracking-wide hover:text-orange-400 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        HALAL
                      </Link>
                      <Link
                        href="/gallery"
                        className="block text-white text-lg uppercase tracking-wide hover:text-orange-400 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        GALLERY
                      </Link>
                      <Link
                        href="/blog"
                        className="block text-white text-lg uppercase tracking-wide hover:text-orange-400 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        BLOG
                      </Link>
                      {/* <Link
                        href="/events"
                        className="block text-white text-lg uppercase tracking-wide hover:text-orange-400 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        EVENTS
                      </Link> */}
                    </div>
                  </div>

                  {/* FRANCHISING */}
                  <Link
                    href="/franchising"
                    className="block text-white text-2xl font-bold uppercase tracking-wider hover:text-orange-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    FRANCHISING
                  </Link>

                  {/* PRESS */}
                  <Link
                    href="/press"
                    className="block text-white text-2xl font-bold uppercase tracking-wider hover:text-orange-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    PRESS
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom section with OFFERS and Made with Popmenu */}
            <div className="p-6">
              {/* OFFERS section */}
              <div className="text-center mb-4">
                <a
                  href="https://www.toasttab.com/cluck-clucks-downtown-222-the-esplanade-unit-a/rewardsSignup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white text-2xl font-bold uppercase tracking-wider mb-4 hover:text-orange-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  LOYALTY
                </a>
              </div>

              {/* ORDER ONLINE Button */}
              <div className="text-center">
                <Link
                  href="/locations"
                  onClick={() => {
                    setIsMenuOpen(false);
                    document.body.classList.remove("overflow-hidden"); // release scroll lock
                  }}
                  className="inline-block bg-[#F3C317] text-[18px] hover:bg-yellow-500 text-[#653003] font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 uppercase tracking-wide"
                >
                  ORDER ONLINE
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Fixed Bottom Bar - Sign In/Sign Up */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40">
        <div className="flex rounded-full overflow-hidden shadow-lg">
          {/* Sign In Button */}
          <a
            href="https://www.toasttab.com/cluck-clucks-downtown-222-the-esplanade-unit-a/rewardsSignup"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-4 px-6 border-r border-black"
            style={{ backgroundColor: "rgb(242, 149, 158)" }}
          >
            <span className="text-black font-semibold text-lg">Sign In</span>
          </a>

          {/* Sign Up Button */}
          <a
            href="https://www.toasttab.com/cluck-clucks-downtown-222-the-esplanade-unit-a/rewardsSignup"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-4 px-6"
            style={{ backgroundColor: "rgb(242, 149, 158)" }}
          >
            <span className="text-black font-semibold text-lg">Sign Up</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
