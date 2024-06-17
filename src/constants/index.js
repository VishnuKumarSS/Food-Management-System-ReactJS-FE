// Local Storage constants
export const ACCESS_TOKEN = localStorage.getItem("token");
export const REFRESH_TOKEN = localStorage.getItem("refreshToken");
export const USER_DATA = JSON.parse(localStorage.getItem("userData")) || {};
