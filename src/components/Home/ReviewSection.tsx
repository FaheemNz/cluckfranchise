"use client";

import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  submitReview,
  ReviewSubmissionData,
} from "../../services/reviewService";
import OptimizedImage from "@/src/components/Home/OptimizedImage";
import Modal from "@/src/components/common/Modal";
import PrivacyPolicy from "@/src/components/common/PrivacyPolicy";
import { useGlobalData } from "@/src/services/globalDataManager";
import { API_BASE } from "@/src/services/apiConfig";

interface ReviewSectionProps {
  isLoading?: boolean;
  globalData?: any;
  cmsReviews?: {
    visible: boolean;
    reviews: Array<{
      id: number;
      comment: string;
      username: string;
      image?: {
        title: string;
        url: string;
      };
      item?: string;
    }>;
  };
}

const ReviewSection = ({
  isLoading = false,
  cmsReviews,
  globalData,
}: ReviewSectionProps) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isItemManuallySelected, setIsItemManuallySelected] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isReviewFocused, setIsReviewFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const { data, fetchData, isLoaded } = useGlobalData();
  const [locations, setLocations] = useState<
    { id: number; title: string; items: { id: number; title: string }[] }[]
  >([]);
  const [filteredItems, setFilteredItems] = useState<
    { id: number; title: string }[]
  >([]);
  const isProductPage = !!globalData?.product || !!globalData?.item_id;
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load once on mount
  useEffect(() => {
    if (!isLoaded) {
      fetchData();
    }
  }, [isLoaded, fetchData]);

  useEffect(() => {
    const locs = globalData?.locations || data?.locations;
    if (Array.isArray(locs)) setLocations(locs);
  }, [globalData, data]);

  // Auto-slide functionality
  useEffect(() => {
    const displayReviews = cmsReviews?.reviews || [];

    // Only auto-play if there are multiple reviews and auto-play is enabled
    if (displayReviews.length <= 1 || !isAutoPlaying) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === displayReviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change review every 4 seconds

    return () => clearInterval(interval);
  }, [cmsReviews?.reviews, isAutoPlaying]);

  // Handle manual navigation with auto-play pause
  const handleManualNavigation = (direction: "next" | "prev") => {
    setIsAutoPlaying(false);
    const displayReviews = cmsReviews?.reviews || [];

    if (direction === "next") {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === displayReviews.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentReviewIndex((prevIndex) =>
        prevIndex === 0 ? displayReviews.length - 1 : prevIndex - 1
      );
    }

    // Resume auto-play after 10 seconds of no interaction
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!locationValue.trim()) {
      errors.location = "Location is required";
    }

    if (!itemValue.trim()) {
      errors.item = "Item is required";
    }

    if (!reviewText.trim()) {
      errors.review = "Review is required";
    }

    if (!emailText.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(emailText)) {
      errors.email = "Please enter a valid email";
    }

    if (!recaptchaToken) {
      errors.recaptcha = "Please complete the reCAPTCHA";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Map location strings to IDs
  // const getLocationId = (location: string): number => {
  //   const locationMap: { [key: string]: number } = {
  //     'ajax': 1,
  //     'calgary': 2,
  //     'houston': 3,
  //     'mississauga': 4,
  //     'oakville': 5,
  //     'scarborough': 6,
  //     'toronto': 7,
  //     'waterloo': 8
  //   };
  //   return locationMap[location] || 1;
  // };

  // Map item strings to IDs
  const getMenuItemId = (item: string): number => {
    const itemMap: { [key: string]: number } = {
      "chicken-waffles": 1,
      "waffle-sandwich": 2,
      "fried-chicken": 3,
      sides: 4,
    };
    return itemMap[item] || 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);

    if (validateForm()) {
      setIsSubmitting(true);

      const reviewData: ReviewSubmissionData = {
        location_id: parseInt(locationValue, 10),
        menu_item_id: selectedItemId || 0,
        comment: reviewText,
        email: emailText,
        recaptcha_token: recaptchaToken,
      };

      try {
        const result = await submitReview(reviewData);

        if (result.success) {
          setSubmitMessage({ type: "success", text: result.message });
          // Reset form
          setReviewText("");
          setEmailText("");
          setLocationValue("");
          setItemValue("");
          setFormErrors({});
          setRecaptchaToken(null);
        } else {
          setSubmitMessage({ type: "error", text: result.message });
        }
      } catch (error) {
        setSubmitMessage({
          type: "error",
          text: "An unexpected error occurred. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-[#f4ebe4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Loading skeleton for review slider */}
            <div>
              <div className="h-12 bg-gray-200 rounded animate-pulse mb-10"></div>
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">
                <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse mx-auto mb-6"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2"></div>
              </div>
            </div>

            {/* Loading skeleton for form */}
            <div>
              <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10">
                <div className="space-y-6">
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Check if section should be visible
  if (!cmsReviews?.visible) {
    return null;
  }

  // Use CMS reviews only
  const displayReviews = cmsReviews?.reviews || [];
  const hasReviews = displayReviews.length > 0;
  const currentReview = hasReviews ? displayReviews[currentReviewIndex] : null;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#f4ebe4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Side - Review Slider (only show if reviews exist) */}
          {hasReviews ? (
            <div>
              {/* Section Heading */}
              <div className="text-center mb-10 sm:mb-12">
                <h3 className="pm-custom-section-subheading pm-h3">
                  LEAVE A REVIEW
                </h3>
              </div>

              {/* Review Slider */}
              <div className="relative">
                {/* Main Review Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 relative z-10">
                  {/* Product Image */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-gray-200 shadow-lg">
                      <OptimizedImage
                        src={currentReview?.image?.url || "/assets/img1.webp"}
                        alt={currentReview?.image?.title || "Product"}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        fallbackSrc="/assets/img1.webp"
                      />
                    </div>
                  </div>

                  {/* Item Name */}
                  <div className="text-center mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-black border-b-2 border-black pb-2 inline-block font-[MDNichrome-Black]">
                      {currentReview?.item}
                    </h3>
                  </div>

                  {/* Review Text */}
                  <div className="text-center mb-6 sm:mb-8">
                    <blockquote className="text-base sm:text-lg text-black leading-relaxed">
                      "{currentReview?.comment}"
                    </blockquote>
                  </div>

                  {/* Reviewer Info */}
                  <div className="flex items-center justify-center sm:justify-start space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-200 rounded-full flex items-center justify-center">
                      <span className="text-green-800 text-xs sm:text-sm font-medium">
                        {currentReview?.username?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-black font-medium text-sm sm:text-base">
                      {currentReview?.username}
                    </span>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() => handleManualNavigation("prev")}
                  className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-20 touch-manipulation"
                  aria-label="Previous review"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => handleManualNavigation("next")}
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg z-20 touch-manipulation"
                  aria-label="Next review"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            /* Show heading when no reviews */
            <div>
              <div className="text-center mb-10 sm:mb-12">
                <h3 className="pm-custom-section-subheading pm-h3">
                  LEAVE A REVIEW
                </h3>
              </div>
            </div>
          )}

          {/* Right Side - Review Form */}
          <div className="relative mt-14 lg:mt-0">
            {/* White Form Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 relative text-black">
              {/* Logo Header */}
              <div className="absolute -top-10 sm:-top-14 left-1/2 transform -translate-x-1/2">
                <div className="bg-white rounded-2xl px-4 sm:px-6 py-2 sm:py-3 pt-6 sm:pt-9">
                  <OptimizedImage
                    src="/assets/logo.png"
                    alt="Cluck Clucks Logo"
                    className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-6">
                {/* Location Dropdown */}
                <div className="floating-dropdown-group">
                  <select
                    className={`floating-dropdown text-black min-h-[48px] ${formErrors.location ? "border-red-500" : ""
                      }`}
                    value={locationValue}
                    onChange={(e) => setLocationValue(e.target.value)}
                    disabled={!locations.length}
                    aria-describedby={
                      formErrors.location ? "location-error" : undefined
                    }
                  >
                    <option value="">
                      {locations.length
                        ? "Select a location"
                        : "Loading locations..."}
                    </option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={String(loc.id)}>
                        {loc.title}
                      </option>
                    ))}
                  </select>
                  <label className="floating-dropdown-label text-black">
                    Which location did you visit? (Required)
                  </label>
                  {formErrors.location && (
                    <p
                      id="location-error"
                      className="text-red-500 text-sm mt-1"
                    >
                      {formErrors.location}
                    </p>
                  )}
                </div>

                {/* Item Search Input (debounced, spinner, clear button) */}
                <div className="floating-input-group relative">
                  <div className="relative">
                    <input
                      type="text"
                      className={`floating-input text-black min-h-[48px] pr-10 ${formErrors.item ? "border-red-500" : ""
                        } ${!isProductPage && !locationValue
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                        }`}
                      value={itemValue}
                      onChange={(e) => {
                        const term = e.target.value.trim();
                        setItemValue(term);
                        setSelectedItemId(null);
                        setIsItemManuallySelected(false); // user typing = not selected yet
                        setIsSearching(true);

                        if (isProductPage || !locationValue) return;

                        if (searchTimeoutRef.current) {
                          clearTimeout(searchTimeoutRef.current);
                        }

                        if (term.length >= 2) {
                          searchTimeoutRef.current = setTimeout(
                            async () => {
                              try {
                                const res = await fetch(
                                  `${API_BASE}/api/menu/search?q=${encodeURIComponent(
                                    term
                                  )}&location_id=${locationValue}`,
                                  {
                                    headers: {
                                      "X-API-KEY": String(
                                        process.env.NEXT_PUBLIC_API_KEY || ""
                                      ),
                                      "Content-Type": "application/json",
                                    },
                                  }
                                );
                                const result = await res.json();
                                if (
                                  result.success &&
                                  Array.isArray(result.data)
                                ) {
                                  setFilteredItems(result.data);
                                } else {
                                  setFilteredItems([]);
                                }
                              } catch (err) {
                                console.error("Search error:", err);
                                setFilteredItems([]);
                              } finally {
                                setIsSearching(false);
                              }
                            },
                            1000
                          );
                        } else {
                          setFilteredItems([]);
                          setIsSearching(false);
                        }
                      }}
                      onBlur={() => {
                        if (!isItemManuallySelected) {
                          setItemValue("");
                          setSelectedItemId(null);
                        }
                      }}
                      placeholder={
                        isProductPage
                          ? "Item automatically selected"
                          : locationValue
                            ? "Start typing to search item..."
                            : "Select a location first"
                      }
                      disabled={!isProductPage && !locationValue}
                    />

                    {/* Clear button */}
                    {itemValue && !isSearching && (
                      <button
                        type="button"
                        onClick={() => {
                          setItemValue("");
                          setFilteredItems([]);
                          setSelectedItemId(null);
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black"
                        aria-label="Clear item"
                      >
                        ✕
                      </button>
                    )}

                    {/* Spinner */}
                    {isSearching && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg
                          className="animate-spin h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                      </div>
                    )}
                  </div>

                  <label className="floating-label text-black float-up">
                    Which item did you try? (Required)
                  </label>

                  {formErrors.item && (
                    <p id="item-error" className="text-red-500 text-sm mt-1">
                      {formErrors.item}
                    </p>
                  )}

                  {/* Suggestion dropdown */}
                  {!isProductPage && filteredItems.length > 0 && (
                    <ul className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-md mt-1 max-h-48 overflow-y-auto w-full">
                      {filteredItems.map((item) => (
                        <li
                          key={item.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setItemValue(item.title);
                            setSelectedItemId(item.id);
                            setFilteredItems([]);
                            setIsItemManuallySelected(true);
                          }}
                        >
                          {item.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Review Text Area */}
                <div className="floating-input-group">
                  <textarea
                    className={`floating-textarea text-black min-h-[120px] ${formErrors.review ? "border-red-500" : ""
                      }`}
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    onFocus={() => setIsReviewFocused(true)}
                    onBlur={() => setIsReviewFocused(false)}
                    aria-describedby={
                      formErrors.review ? "review-error" : undefined
                    }
                  />
                  <label
                    className={`floating-label text-black ${reviewText || isReviewFocused ? "float-up" : ""
                      }`}
                  >
                    Add your review (Required)
                  </label>
                  {formErrors.review && (
                    <p id="review-error" className="text-red-500 text-sm mt-1">
                      {formErrors.review}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className="floating-input-group">
                  <input
                    type="email"
                    className={`floating-input text-black min-h-[48px] ${formErrors.email ? "border-red-500" : ""
                      }`}
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(false)}
                    aria-describedby={
                      formErrors.email ? "email-error" : undefined
                    }
                  />
                  <label
                    className={`floating-label text-black ${emailText || isEmailFocused ? "float-up" : ""
                      }`}
                  >
                    Add your email (Required)
                  </label>
                  {formErrors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                {/* Success/Error Message */}
                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg text-center ${submitMessage.type === "success"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                  >
                    {submitMessage.text}
                  </div>
                )}

                <div className="flex mt-2">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                    onChange={(token) => setRecaptchaToken(token)}
                  />
                </div>

                {formErrors.recaptcha && (
                  <p className="text-red-500 text-sm text-center mt-1">
                    {formErrors.recaptcha}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg md:text-xl uppercase transition-all duration-300 min-h-[48px] touch-manipulation ${isSubmitting
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-[#aa8810] text-[#1f2a08] hover:bg-[#9a7a0e]"
                    }`}
                >
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
                </button>

                {/* Disclaimer Text */}
                <p className="text-[14px] sm:text-sm text-black text-center leading-relaxed">
                  You are submitting your information to Cluck, which powers
                  this site. Cluck's{" "}
                  <button
                    type="button"
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="font-bold underline hover:text-[#E5573D] transition-colors cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <Modal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        title="Privacy Policy"
      >
        <PrivacyPolicy />
      </Modal>
    </section>
  );
};

export default ReviewSection;
