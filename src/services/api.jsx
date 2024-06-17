import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Example API function
export const requestOTP = async (email) => {
  try {
    const response = await api.post("/account/request-otp/", { email });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Something went wrong");
  }
};
