import API from "../utils/api";

// Signup
export const signupAPI = (data) => API.post("/auth/signup", data);

// Login
export const loginAPI = (data) => API.post("/auth/login", data);

// Forgot Password
export const forgotAPI = (data) => API.post("/auth/forgot", data);

// Reset Password
export const resetAPI = (data) => API.post("/auth/reset-password", data);
