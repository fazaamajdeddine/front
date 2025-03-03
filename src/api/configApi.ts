import axios from "axios";

export const configApi = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // This will allow cookies to be sent with requests
});
// interceptor
//configApi.interceptors.request.use((config) => {
//  const token = useAuthStore.getState().token;
//  if (token) config.headers["Cookie"] = `jwt = ${token}`;
//  return config;
//});
