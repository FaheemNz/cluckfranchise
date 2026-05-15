// Franchise service for handling franchise request submissions
import { API_KEY, API_BASE } from "./apiConfig";

export interface FranchiseRequest {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  required_cities: string;
  available_investment_capital: string;
  investment_time_frame: string;
  current_profession: string;
  number_of_years_in_current_profession: string;
  ever_owned_business_before: "Yes" | "No";
  ever_visited_clucks: "Yes" | "No";
}

export interface FranchiseResponse {
  success: boolean;
  message: string;
  data?: any;
}

class FranchiseService {
  private endpoint: string;

  constructor() {
    this.endpoint = `${API_BASE}/api/franchise-request`;
  }

  async submitFranchiseRequest(request: FranchiseRequest): Promise<FranchiseResponse> {
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

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || `HTTP error! status: ${response.status}`);
      }

      if (result?.success === false) {
        // Backend explicitly returned failure
        return {
          success: false,
          message: result?.message || "Franchise request failed. Please try again.",
          data: result,
        };
      }

      // Backend success
      return {
        success: true,
        message: result?.message || "Franchise request submitted successfully!",
        data: result,
      };
    } catch (error) {
      console.error("Error submitting franchise request:", error);
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit franchise request. Please try again.",
      };
    }
  }
}

export const franchiseService = new FranchiseService();
