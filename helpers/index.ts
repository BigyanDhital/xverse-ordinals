import { AxiosError } from "axios";

export const getAxiosErrorMessage = (error: any, logError = true) => {
  if (error instanceof AxiosError) {
    if (logError) console.warn("API Error:", error.response?.status, error.response?.data);
    if (error.response) {
      if (typeof error.response.data.errorMessage === "string") return error.response.data.errorMessage;
      else if (typeof error.response.data.message === "string") return error.response.data.message;
      else if (typeof error.response.data === "string") return error.response.data;
      else if (typeof error.response === "string") return error.response;
    } else if (error.request) {
      return "No response received from server. Please try again.";
    } else {
      return "Error setting up request. Please try again.";
    }
  }
  const errorMessage = typeof error?.message === "string" ? error.message : typeof error === "string" ? error : "";
  return errorMessage || "An unexpected error occurred. Please try again.";
};

export function sliceAddress(value: string, leading = 6, trailing = 6) {
  if (!value) return "";
  if (value.length <= leading + trailing) return value;
  return `${value.slice(0, leading)}..${value.slice(-1 * trailing)}`;
}
