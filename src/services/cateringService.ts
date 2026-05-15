import { API_KEY, CATERING_ENDPOINT } from "./apiConfig";

export interface CateringRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  desired_datetime: string; // Format: Y-m-d H:i:s
  pickup_location: string;
  servings: number;
  comments: string;
}

export interface CateringResponse {
  success: boolean;
  message: string;
  data?: any;
}

class CateringService {
  private endpoint: string;

  constructor() {
    // Use the shared API configuration
    this.endpoint = CATERING_ENDPOINT;
  }

  async submitCateringRequest(
    request: CateringRequest
  ): Promise<CateringResponse> {
    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-API-KEY": API_KEY,
        },
        body: JSON.stringify(request),
      });

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const waitTime = retryAfter ? `${retryAfter} seconds` : "a few moments";
        return {
          success: false,
          message: `You are sending too many requests. Please wait ${waitTime} before trying again.`,
        };
      }

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData?.message) {
            errorMessage = errorData.message;
          }
        } catch (_) {
          // Ignore JSON parsing error and use default message
        }

        return {
          success: false,
          message: errorMessage,
        };
      }

      const result = await response.json();
      return {
        success: result.success,
        message: result.message || "",
        data: result.data || null,
      };
    } catch (error) {
      console.error("Error submitting catering request:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit catering request. Please try again.",
      };
    }
  }

  /**
   * Format date for API (Y-m-d H:i:s format)
   */
  formatDateTime(date: string, time: string = "12:00"): string {
    const dateObj = new Date(date);
    const [hours, minutes] = time.split(":");

    dateObj.setHours(parseInt(hours, 10));
    dateObj.setMinutes(parseInt(minutes, 10));
    dateObj.setSeconds(0);

    // Format as Y-m-d H:i:s
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hour = String(dateObj.getHours()).padStart(2, "0");
    const minute = String(dateObj.getMinutes()).padStart(2, "0");
    const second = String(dateObj.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  /**
   * Format datetime-local input value for API (Y-m-d H:i:s format)
   */
  formatDateTimeFromISO(isoString: string): string {
    if (!isoString) return "";

    const dateObj = new Date(isoString);

    // Format as Y-m-d H:i:s
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hour = String(dateObj.getHours()).padStart(2, "0");
    const minute = String(dateObj.getMinutes()).padStart(2, "0");
    const second = String(dateObj.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  /**
   * Validate catering request data
   */
  validateCateringRequest(
    request: Partial<CateringRequest>
  ): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!request.first_name?.trim()) {
      errors.first_name = "First name is required";
    }

    if (!request.last_name?.trim()) {
      errors.last_name = "Last name is required";
    }

    if (!request.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!request.phone?.trim()) {
      errors.phone = "Phone number is required";
    } else if (
      !/^[\+]?[1-9][\d]{0,15}$/.test(request.phone.replace(/[\s\-\(\)]/g, ""))
    ) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!request.pickup_location?.trim()) {
      errors.pickup_location = "Pickup location is required";
    }

    if (!request.desired_datetime?.trim()) {
      errors.desired_datetime = "Event date and time are required";
    } else {
      const eventDate = new Date(request.desired_datetime);
      const now = new Date();
      if (eventDate <= now) {
        errors.desired_datetime = "Event date and time must be in the future";
      }
    }

    if (!request.servings || request.servings < 1) {
      errors.servings = "Number of servings must be at least 1";
    }

    return errors;
  }
}

export const cateringService = new CateringService();
