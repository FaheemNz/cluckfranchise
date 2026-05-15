'use client'

import { useState, useEffect } from "react";
import {
  submitReview,
  fetchReviews,
  ReviewSubmissionData,
  Review,
} from "../../../services/reviewService";
import ReCAPTCHA from "react-google-recaptcha";
import { useGlobalData } from "../../../services/globalDataManager";

export default function ProductModal({
  open,
  onClose,
  product,
  activeLocationId,
  allLocations = [],
}: {
  open: boolean;
  onClose: () => void;
  product: any;
  activeLocationId?: number | null;
  allLocations?: any[];
}) {
  const [activeTab, setActiveTab] = useState("DETAILS");
  const [showShareModal, setShowShareModal] = useState(false);

  // Review form states
  const [reviewText, setReviewText] = useState("");
  const [emailText, setEmailText] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isReviewFocused, setIsReviewFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  useEffect(() => {
    if (open && activeLocationId) {
      setLocationValue(String(activeLocationId));
    }
  }, [open, activeLocationId]);

  useEffect(() => {
    if (!open) {
      // Modal is closing — reset messages and form instantly
      setSubmitMessage(null);
      setFormErrors({});
      setEmailText("");
      setRecaptchaToken(null);
      setReviewText("");
    }
  }, [open]);

  // Fetch reviews when modal opens
  useEffect(() => {
    const loadReviews = async () => {
      if (open && product) {
        setIsLoadingReviews(true);
        setReviewsError(null);

        try {
          // Use the actual item ID from the product
          const menuItemId = product.id || 1; // fallback to 1 if no ID

          const response = await fetchReviews(menuItemId);
          setReviews(response.data.reviews);
        } catch (error) {
          setReviewsError("Failed to load reviews");
        } finally {
          setIsLoadingReviews(false);
        }
      }
    };

    loadReviews();
  }, [open, product]);

  // Validation function
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!locationValue.trim()) {
      errors.location = "Location is required";
    }

    if (!reviewText.trim()) {
      errors.review = "Review is required";
    }

    if (!emailText.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(emailText)) {
      errors.email = "Please enter a valid email";
    }
    if (!recaptchaToken) errors.recaptcha = "Please complete the reCAPTCHA";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  // Helper function to get username from email (fallback)
  const getUsername = (email: string): string => {
    return email.split("@")[0];
  };

  // Helper function to get random avatar
  const getRandomAvatar = (username: string): string => {
    const avatars = [
      "./assets/catering/avatar_1.png",
      "./assets/catering/avatar_2.png",
      "./assets/catering/avatar_3.png",
    ];
    // Use username to get consistent avatar for same user
    // Add some variation to ensure all avatars are used
    const hash = username.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    const index = Math.abs(hash) % avatars.length;
    return avatars[index];
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitMessage(null);

    if (validateForm()) {
      setIsSubmitting(true);

      const reviewData: ReviewSubmissionData = {
        location_id: parseInt(locationValue, 10),
        menu_item_id: product.id,
        comment: reviewText,
        email: emailText,
        recaptcha_token: recaptchaToken,
      };

      try {
        const result = await submitReview(reviewData);

        if (result.success) {
          setSubmitMessage({ type: "success", text: result.message });
          setReviewText("");
          setEmailText("");
          setRecaptchaToken(null);
          setLocationValue("");
          setFormErrors({});
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

  console.log("🧭 allLocations →", allLocations);
  console.log("🧭 product.locations →", product.locations);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-sm sm:max-w-md md:max-w-lg h-[90vh] mx-4 sm:mx-6 md:mx-0 shadow-xl rounded-xl animate-slideFromRight flex flex-col">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ×
        </button>

        {/* Image - only show if image exists */}
        {product.img && (
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-xl"
          />
        )}

        {/* Likes & Icons */}
        <div className="flex gap-2 sm:gap-4 items-center px-4 sm:px-6 py-3 sm:py-4">
          {/* Likes Button */}
          {/* <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm font-medium text-gray-800">{product.likes} likes</span>
                    </button> */}

          {/* Share Button */}
          <button
            onClick={() => setShowShareModal(true)}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Share this item"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
              color="inherit"
              aria-hidden="true"
            >
              <g clipPath="url(#send_svg__clip0_8_4915)" stroke="currentColor">
                <path d="M14.667 1.333L7.333 8.668m7.334-7.335L10 14.668l-2.667-6-6-2.667 13.334-4.667z"></path>
              </g>
              <defs>
                <clipPath id="send_svg__clip0_8_4915">
                  <path fill="currentColor" d="M0 0h16v16H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </button>

          {/* Bookmark Button */}
          {/* <button className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors" aria-label="Bookmark this item">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button> */}
        </div>

        {/* Location & Title */}
        <div className="px-4 sm:px-6">
          <div className="text-gray-600 mb-1 text-sm sm:text-base">
            {product.location}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold mb-2">
            {product.title}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex px-4 sm:px-6 mb-4">
          <button
            className={`flex-1 py-2 px-2 sm:px-4 font-bold text-center text-sm sm:text-base ${
              activeTab === "DETAILS"
                ? "text-black border-b-4 border-yellow-400"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("DETAILS")}
          >
            DETAILS
          </button>
          <button
            className={`flex-1 py-2 px-2 sm:px-4 font-medium text-center text-sm sm:text-base ${
              activeTab === "REVIEWS"
                ? "text-black border-b-2 border-yellow-400"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("REVIEWS")}
          >
            REVIEWS ({reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="px-4 sm:px-6 pb-6 flex-1 overflow-y-auto">
          <div className="text-base sm:text-lg text-gray-800 text-center">
            {activeTab === "DETAILS" ? (
              <div>{product.desc}</div>
            ) : (
              <div className="w-full text-left mt-5">
                {/* Review Form Header */}
                <div className="font-bold text-[#79620b] mb-2 text-center text-sm sm:text-base">
                  HAD IT ALREADY? LEAVE A REVIEW
                </div>
                <div className="mb-4 text-black text-center font-semibold text-xs sm:text-sm">
                  Add your review below to help others know what to expect.
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 mb-5">
                  {/* Location Dropdown */}
                  <div className="floating-dropdown-group">
                    <select
                      className={`floating-dropdown text-black min-h-[40px] sm:min-h-[48px] ${
                        formErrors.location ? "border-red-500" : ""
                      }`}
                      value={locationValue}
                      onChange={(e) => setLocationValue(e.target.value)}
                      aria-describedby={
                        formErrors.location ? "location-error" : undefined
                      }
                    >
                      <option value="">Select a location</option>
                      {/* ✅ Always show all merged locations (10 total) */}
                      {allLocations.map((loc: any) => (
                        <option
                          key={loc.id || loc.title}
                          value={String(loc.id || loc.title)}
                        >
                          {loc.title}
                        </option>
                      ))}
                    </select>
                    <label className="floating-dropdown-label text-black text-sm sm:text-base">
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

                  {/* Review Textarea */}
                  <div className="floating-input-group">
                    <textarea
                      className={`floating-textarea text-black min-h-[100px] sm:min-h-[120px] ${
                        formErrors.review ? "border-red-500" : ""
                      }`}
                      rows={3}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      onFocus={() => setIsReviewFocused(true)}
                      onBlur={() => setIsReviewFocused(false)}
                      aria-describedby={
                        formErrors.review ? "review-error" : undefined
                      }
                    />
                    <label
                      className={`floating-label text-black text-sm sm:text-base ${
                        reviewText || isReviewFocused ? "float-up" : ""
                      }`}
                    >
                      Add your review (Required)
                    </label>
                    {formErrors.review && (
                      <p
                        id="review-error"
                        className="text-red-500 text-sm mt-1"
                      >
                        {formErrors.review}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="floating-input-group">
                    <input
                      type="email"
                      className={`floating-input text-black min-h-[40px] sm:min-h-[48px] ${
                        formErrors.email ? "border-red-500" : ""
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
                      className={`floating-label text-black text-sm sm:text-base ${
                        emailText || isEmailFocused ? "float-up" : ""
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
                      className={`p-2 rounded text-center text-sm ${
                        submitMessage.type === "success"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {submitMessage.text}
                    </div>
                  )}

                  <div className="flex mt-2">
                    <ReCAPTCHA
                      sitekey={
                        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string
                      }
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
                    className={`w-full border-[1px] border-black py-2 sm:py-3 rounded font-normal mb-4 hover:bg-[#753711] text-sm sm:text-base ${
                      isSubmitting
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed border-gray-400"
                        : "bg-white text-black hover:bg-gray-50"
                    }`}
                  >
                    {isSubmitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
                  </button>
                </form>

                {/* Dynamic reviews */}
                {isLoadingReviews ? (
                  <div className="text-center py-4">
                    <div className="text-gray-500 text-sm">
                      Loading reviews...
                    </div>
                  </div>
                ) : reviewsError ? (
                  <div className="text-center py-4">
                    <div className="text-red-500 text-sm">{reviewsError}</div>
                  </div>
                ) : reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="mb-6">
                      {/* Avatar and Name/Date Row */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                            <img
                              src={getRandomAvatar(
                                review.username || getUsername(review.email)
                              )}
                              alt={`${
                                review.username || getUsername(review.email)
                              } avatar`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/assets/logo.png";
                              }}
                            />
                          </div>
                          <span className="font-bold text-gray-800 text-sm sm:text-base">
                            {review.username || getUsername(review.email)}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {review.created_at}
                        </span>
                      </div>

                      {/* Review Comment */}
                      <div className="text-gray-800 text-sm sm:text-base leading-relaxed mb-2 ml-11">
                        {review.comment}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <div className="text-gray-500 text-sm">
                      No reviews yet. Be the first to review!
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* VIP Button - Sticky at Bottom */}
        {/* <div className="sticky bottom-0 left-0 px-4 sm:px-6 pb-4 sm:pb-6 bg-white">
                    <button className="w-full bg-yellow-400 text-black font-bold py-2 sm:py-3 rounded-lg hover:bg-yellow-500 transition text-sm sm:text-base">
                        Become a VIP
                    </button>
                </div> */}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 transition-opacity"
            onClick={() => setShowShareModal(false)}
          />

          {/* Share Modal */}
          <div className="relative bg-white w-full max-w-xs sm:max-w-sm mx-4 sm:mx-6 shadow-xl rounded-xl animate-slideFromRight overflow-hidden">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black z-10"
              onClick={() => setShowShareModal(false)}
            >
              ×
            </button>

            {/* Share Options */}
            <div className="p-4 sm:p-6 pt-6 sm:pt-8">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4">
                Share this item
              </h3>

              <div className="space-y-3">
                {/* Debug info - remove this later */}
                {console.log("Product data:", product)}
                {console.log("Share links:", product?.share_links)}

                {/* Dynamic Share Links */}
                {product?.share_links && product.share_links.length > 0 ? (
                  product.share_links.map((shareLink: any, index: number) => {
                    const getPlatformIcon = (platform: string) => {
                      switch (platform) {
                        case "email":
                          return (
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          );
                        case "facebook":
                          return (
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                          );
                        case "twitter":
                          return (
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          );
                        case "linkedin":
                          return (
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          );
                        default:
                          return null;
                      }
                    };

                    const getPlatformColor = (platform: string) => {
                      switch (platform) {
                        case "email":
                          return "bg-blue-500";
                        case "facebook":
                          return "bg-blue-600";
                        case "twitter":
                          return "bg-black";
                        case "linkedin":
                          return "bg-blue-700";
                        default:
                          return "bg-gray-500";
                      }
                    };

                    const getPlatformName = (platform: string) => {
                      switch (platform) {
                        case "email":
                          return "Share via email";
                        case "facebook":
                          return "Share via Facebook";
                        case "twitter":
                          return "Share via Twitter";
                        case "linkedin":
                          return "Share via LinkedIn";
                        default:
                          return `Share via ${platform}`;
                      }
                    };

                    return (
                      <button
                        key={index}
                        className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => {
                          if (shareLink.url) {
                            window.open(shareLink.url, "_blank");
                          }
                          setShowShareModal(false);
                        }}
                      >
                        <div
                          className={`w-6 h-6 sm:w-8 sm:h-8 ${getPlatformColor(
                            shareLink.platform
                          )} rounded-full flex items-center justify-center`}
                        >
                          {getPlatformIcon(shareLink.platform)}
                        </div>
                        <span className="text-blue-600 font-medium text-sm sm:text-base">
                          {getPlatformName(shareLink.platform)}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  /* Fallback share options if no share_links data */
                  <>
                    {/* Email */}
                    <button
                      className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => {
                        const subject = `Check out ${
                          product?.title || "this item"
                        }!`;
                        const body = `Check out ${
                          product?.title || "this item"
                        }: ${window.location.href}`;
                        window.open(
                          `mailto:?subject=${encodeURIComponent(
                            subject
                          )}&body=${encodeURIComponent(body)}`,
                          "_blank"
                        );
                        setShowShareModal(false);
                      }}
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <span className="text-blue-600 font-medium text-sm sm:text-base">
                        Share via email
                      </span>
                    </button>

                    {/* Facebook */}
                    <button
                      className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => {
                        const url = encodeURIComponent(window.location.href);
                        const quote = encodeURIComponent(
                          `Check out ${product?.title || "this item"}`
                        );
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`,
                          "_blank"
                        );
                        setShowShareModal(false);
                      }}
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                      <span className="text-blue-600 font-medium text-sm sm:text-base">
                        Share via Facebook
                      </span>
                    </button>

                    {/* Twitter */}
                    <button
                      className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => {
                        const text = encodeURIComponent(
                          `Check out ${product?.title || "this item"}: ${
                            window.location.href
                          }`
                        );
                        window.open(
                          `https://twitter.com/intent/tweet?text=${text}`,
                          "_blank"
                        );
                        setShowShareModal(false);
                      }}
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </div>
                      <span className="text-blue-600 font-medium text-sm sm:text-base">
                        Share via Twitter
                      </span>
                    </button>

                    {/* LinkedIn */}
                    <button
                      className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => {
                        const url = encodeURIComponent(window.location.href);
                        const title = encodeURIComponent(
                          `Check out ${product?.title || "this item"}`
                        );
                        const summary = encodeURIComponent(
                          `Check out ${product?.title || "this item"}: ${
                            window.location.href
                          }`
                        );
                        window.open(
                          `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${summary}`,
                          "_blank"
                        );
                        setShowShareModal(false);
                      }}
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-700 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <span className="text-blue-600 font-medium text-sm sm:text-base">
                        Share via LinkedIn
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
