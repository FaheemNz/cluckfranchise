"use client";

import React, { useState } from "react";
import { API_BASE, API_KEY } from "@/src/services/apiConfig";

interface Location {
  id: number;
  title: string;
}

interface ContactFormProps {
  locations?: Location[];
  isLoading?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  locations = [],
  isLoading = false,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(
    null
  );

  // State for floating labels
  const [focusedFields, setFocusedFields] = useState<Record<string, boolean>>(
    {}
  );
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  // Validation function similar to catering form
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

    if (!fieldValues.location?.trim()) {
      errors.location = "Location is required";
    }

    if (!fieldValues.message?.trim()) {
      errors.comment = "Comment is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setFormMessage(null);
    setFormStatus(null);

    if (validateForm()) {
      setIsSubmitting(true);

      const getLocationId = (locationTitle: string): number => {
        const location = locations.find(
          (loc) => loc.title.toLowerCase() === locationTitle.toLowerCase()
        );
        return location ? location.id : 1;
      };

      const contactData = {
        first_name: fieldValues.firstName || "",
        last_name: fieldValues.lastName || "",
        email: fieldValues.email || "",
        phone: fieldValues.phone || "",
        location_id: getLocationId(fieldValues.location || ""),
        comment: fieldValues.message || "",
      };

      try {
        const response = await fetch(`${API_BASE}/api/contact-us`, {
          method: "POST",
          headers: {
            "X-API-KEY": API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        });

        const result = await response.json();

        if (result.success) {
          setFieldValues({});
          setFocusedFields({});
          setFormStatus("success");
          setFormMessage(
            "Thank you! Your message has been submitted successfully."
          );
        } else {
          setFormStatus("error");
          setFormMessage(
            result.message || "Something went wrong. Please try again."
          );
        }
      } catch (error) {
        console.error("Error submitting contact form:", error);
        setFormStatus("error");
        setFormMessage("An unexpected error occurred. Please try again later.");
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

  return (
    <section className="py-2 px-3 border- border-red-500">
      <div className="max-w-3xl mx-auto">
        {/* Outer Border */}
        <div className="border-2 border-[#F15C3E] rounded-xl">
          {/* Inner White Background */}
          <div className="bg-white rounded-lg p-5">
            {/* Title */}
            <h1 className="text-2xl font-extrabold text-center text-[#F15C3E] uppercase tracking-wide mb-4">
              Send Us A Message
            </h1>
            <h3 className="text-center text-black mb-10">
              We will get back to you as soon as possible!
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
              {/*Location   */}
              <div className="floating-dropdown-group">
                <select
                  id="location"
                  name="location"
                  className={`floating-dropdown ${
                    errors.location ? "border-red-500" : ""
                  }`}
                  value={fieldValues.location || ""}
                  onChange={(e) =>
                    handleFieldChange("location", e.target.value)
                  }
                  onFocus={() => handleFieldFocus("location")}
                  onBlur={() => handleFieldBlur("location")}
                >
                  <option value="">Select location</option>
                  {locations.length > 0 ? (
                    locations.map((location) => (
                      <option key={location.id} value={location.title}>
                        {location.title}
                      </option>
                    ))
                  ) : (
                    // Fallback locations if API data is not available
                    <>
                      <option value="Ajax">Ajax</option>
                      <option value="Calgary">Calgary</option>
                      <option value="Houston">Houston</option>
                      <option value="Mississauga">Mississauga</option>
                      <option value="Oakville">Oakville</option>
                      <option value="Scarborough">Scarborough</option>
                      <option value="Toronto">Toronto</option>
                      <option value="Waterloo">Waterloo2</option>
                    </>
                  )}
                </select>
                <label htmlFor="location" className="floating-dropdown-label">
                  Location (Required)
                </label>
                {errors.location && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.location}
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
                    errors.comment ? "border-red-500" : ""
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
                  Tell us more about your inquiry...
                </label>
                {errors.commentt && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {errors.comment}
                  </span>
                )}
              </div>

              {/* Submit Button aligned to right */}
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

              {formMessage && (
                <div
                  className={`mt-6 p-4 rounded-lg border text-center transition-all duration-300 ${
                    formStatus === "success"
                      ? "bg-green-50 border-green-400 text-green-800"
                      : "bg-red-50 border-red-400 text-red-800"
                  }`}
                >
                  <div className="flex justify-center items-center gap-2">
                    {formStatus === "success" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                    <span className="font-medium">{formMessage}</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
