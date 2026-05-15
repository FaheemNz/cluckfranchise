'use client'

import { useState } from "react";
import { FormSection, Location } from "../../types/catering";
import {
  cateringService,
  CateringRequest,
  CateringResponse,
} from "../../services/cateringService";

interface CateringFormProps {
  formSection: FormSection;
  locations?: Location[];
  isLoading?: boolean;
}

const CateringForm: React.FC<CateringFormProps> = ({
  formSection,
  locations = [],
  isLoading = false,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // State for floating labels
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  // Validation function similar to ReviewSection
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!fieldValues.firstName?.trim()) {
      errors.first_name = "First name is required";
    }

    if (!fieldValues.lastName?.trim()) {
      errors.last_name = "Last name is required";
    }

    if (!fieldValues.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(fieldValues.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!fieldValues.phone?.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!fieldValues.pickupLocation?.trim()) {
      errors.pickup_location = "Pickup location is required";
    }

    if (!fieldValues.eventDateTime?.trim()) {
      errors.desired_datetime = "Event date and time are required";
    } else {
      const eventDateTime = new Date(fieldValues.eventDateTime);

      if (isNaN(eventDateTime.getTime())) {
        errors.desired_datetime = "Please enter a valid date and time";
      } else if (eventDateTime <= new Date()) {
        errors.desired_datetime = "Event date and time must be in the future";
      }
    }

    if (!fieldValues.guests?.trim()) {
      errors.servings = "Number of servings is required";
    } else if (parseInt(fieldValues.guests, 10) < 1) {
      errors.servings = "Number of servings must be at least 1";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ type: null, message: "" });
    setErrors({});

    if (validateForm()) {
      setIsSubmitting(true);

      try {
        const cateringRequest: CateringRequest = {
          first_name: fieldValues.firstName || "",
          last_name: fieldValues.lastName || "",
          email: fieldValues.email || "",
          phone: fieldValues.phone || "",
          desired_datetime: cateringService.formatDateTimeFromISO(
            fieldValues.eventDateTime || ""
          ),
          pickup_location: fieldValues.pickupLocation || "",
          servings: parseInt(fieldValues.guests || "0", 10),
          comments: fieldValues.message || "",
        };

        const response: CateringResponse =
          await cateringService.submitCateringRequest(cateringRequest);

        console.log(response);

        if (response.success === true) {
          setSubmitStatus({
            type: "success",
            message:
              response.message || "Your request was submitted successfully.",
          });
          // Reset form after success
          setFieldValues({});
          setFocusedFields({});
          setErrors({});
        } else {
          setSubmitStatus({
            type: "error",
            message: response.message || "Submission failed. Please try again.",
          });
        }
      } catch (error) {
        setSubmitStatus({
          type: "error",
          message: "An unexpected error occurred. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Helper functions for floating labels
  const handleFieldFocus = (fieldName: string) => {
    setFocusedFields((prev) => ({ ...prev, [fieldName]: true }));
  };

  const handleFieldBlur = (fieldName: string) => {
    setFocusedFields((prev) => ({ ...prev, [fieldName]: false }));
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const isLabelFloating = (fieldName: string) => {
    return focusedFields[fieldName] || fieldValues[fieldName];
  };

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="border-2 border-[#F15C3E] rounded-xl p-[10px]">
            <div className="bg-white rounded-lg p-8">
              <div className="h-12 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-10"></div>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                  <div
                    key={index}
                    className="h-12 bg-gray-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!formSection?.visible) {
    return null;
  }

  return (
    <section>
      <div className="max-w-3xl mx-auto">
        {/* Outer Border */}
        <div className="border-2 border-[#F15C3E] rounded-xl p-[10px]">
          {/* Inner White Background */}
          <div className="bg-white rounded-lg p-5 sm:p-6 md:p-8">
            {/* Title */}
            <h2
              className="text-[48px] lg:text-[64px] font-extrabold text-center text-[#F15C3E] uppercase tracking-wide mb-4 font-[MDNichrome-Black]"
              style={{ letterSpacing: "3px" }}
            >
              {formSection.title}
            </h2>
            <h3 className="text-center text-black text-xl mb-10">
              {formSection.subtitle}
            </h3>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name */}
              <div className="floating-input-group">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`floating-input ${
                    errors.first_name ? "border-red-500" : ""
                  }`}
                  value={fieldValues.firstName || ""}
                  onChange={(e) =>
                    handleFieldChange("firstName", e.target.value)
                  }
                  onFocus={() => handleFieldFocus("firstName")}
                  onBlur={() => handleFieldBlur("firstName")}
                />
                <label
                  htmlFor="firstName"
                  className={`floating-label ${
                    isLabelFloating("firstName") ? "float-up" : ""
                  }`}
                >
                  First Name
                </label>
                {errors.first_name && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.first_name}
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className="floating-input-group">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`floating-input ${
                    errors.last_name ? "border-red-500" : ""
                  }`}
                  value={fieldValues.lastName || ""}
                  onChange={(e) =>
                    handleFieldChange("lastName", e.target.value)
                  }
                  onFocus={() => handleFieldFocus("lastName")}
                  onBlur={() => handleFieldBlur("lastName")}
                />
                <label
                  htmlFor="lastName"
                  className={`floating-label ${
                    isLabelFloating("lastName") ? "float-up" : ""
                  }`}
                >
                  Last Name
                </label>
                {errors.last_name && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.last_name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="floating-input-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`floating-input ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  value={fieldValues.email || ""}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  onFocus={() => handleFieldFocus("email")}
                  onBlur={() => handleFieldBlur("email")}
                />
                <label
                  htmlFor="email"
                  className={`floating-label ${
                    isLabelFloating("email") ? "float-up" : ""
                  }`}
                >
                  Email
                </label>
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Phone */}
              <div className="floating-input-group">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`floating-input ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  value={fieldValues.phone || ""}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                  onFocus={() => handleFieldFocus("phone")}
                  onBlur={() => handleFieldBlur("phone")}
                />
                <label
                  htmlFor="phone"
                  className={`floating-label ${
                    isLabelFloating("phone") ? "float-up" : ""
                  }`}
                >
                  Phone
                </label>
                {errors.phone && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.phone}
                  </span>
                )}
              </div>

              {/* Pickup Location */}
              <div className="floating-dropdown-group">
                <select
                  id="pickupLocation"
                  name="pickupLocation"
                  className={`floating-dropdown ${
                    errors.pickup_location ? "border-red-500" : ""
                  }`}
                  value={fieldValues.pickupLocation || ""}
                  onChange={(e) =>
                    handleFieldChange("pickupLocation", e.target.value)
                  }
                  onFocus={() => handleFieldFocus("pickupLocation")}
                  onBlur={() => handleFieldBlur("pickupLocation")}
                >
                  <option value="">Select pickup location</option>
                  {locations.length > 0 ? (
                    locations.map((location) => (
                      <option key={location.id} value={location.title}>
                        {location.title}
                      </option>
                    ))
                  ) : (
                    // Temporary fallback for testing
                    <>
                      <option value="Ajax">Ajax</option>
                      <option value="Calgary">Calgary</option>
                      <option value="Houston">Houston</option>
                      <option value="Mississauga">Mississauga</option>
                      <option value="Oakville">Oakville</option>
                      <option value="Scarborough">Scarborough</option>
                      <option value="Toronto">Toronto</option>
                      <option value="Waterloo">Waterloo</option>
                    </>
                  )}
                </select>
                <label
                  htmlFor="pickupLocation"
                  className="floating-dropdown-label"
                >
                  Desired Pickup Location (Required)
                </label>
                {errors.pickup_location && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.pickup_location}
                  </span>
                )}
              </div>

              {/* Event Date & Time */}
              <div className="floating-dropdown-group">
                <input
                  type="datetime-local"
                  id="eventDateTime"
                  name="eventDateTime"
                  className={`floating-dropdown ${
                    errors.desired_datetime ? "border-red-500" : ""
                  }`}
                  value={fieldValues.eventDateTime || ""}
                  onChange={(e) =>
                    handleFieldChange("eventDateTime", e.target.value)
                  }
                  onFocus={() => handleFieldFocus("eventDateTime")}
                  onBlur={() => handleFieldBlur("eventDateTime")}
                />
                <label
                  htmlFor="eventDateTime"
                  className="floating-dropdown-label"
                >
                  Event Date & Pickup Time (Required)
                </label>
                {errors.desired_datetime && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.desired_datetime}
                  </span>
                )}
              </div>

              {/* Number of Guests */}
              <div className="floating-input-group">
                <input
                  type="number"
                  id="guests"
                  name="guests"
                  min="1"
                  className={`floating-input ${
                    errors.servings ? "border-red-500" : ""
                  }`}
                  value={fieldValues.guests || ""}
                  onChange={(e) => handleFieldChange("guests", e.target.value)}
                  onFocus={() => handleFieldFocus("guests")}
                  onBlur={() => handleFieldBlur("guests")}
                />
                <label
                  htmlFor="guests"
                  className={`floating-label ${
                    isLabelFloating("guests") ? "float-up" : ""
                  }`}
                >
                  Number of servings (required)
                </label>
                {errors.servings && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.servings}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="floating-input-group">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={`floating-textarea ${
                    errors.comments ? "border-red-500" : ""
                  }`}
                  value={fieldValues.message || ""}
                  onChange={(e) => handleFieldChange("message", e.target.value)}
                  onFocus={() => handleFieldFocus("message")}
                  onBlur={() => handleFieldBlur("message")}
                />
                <label
                  htmlFor="message"
                  className={`floating-label ${
                    isLabelFloating("message") ? "float-up" : ""
                  }`}
                >
                  Tell us more about your event...
                </label>
                {errors.comments && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.comments}
                  </span>
                )}
              </div>

              {/* Success/Error Messages */}
              {submitStatus.type && (
                <div
                  className={`p-4 rounded-lg ${
                    submitStatus.type === "success"
                      ? "bg-green-100 border border-green-400 text-green-700"
                      : "bg-red-100 border border-red-400 text-red-700"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {submitStatus.type === "success" ? (
                        <svg
                          className="h-5 w-5 text-green-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-red-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">
                        {submitStatus.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#FBBF24] hover:bg-[#F59E0B] text-black py-3 px-6 rounded-3xl uppercase tracking-wide shadow-lg transition ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CateringForm;
