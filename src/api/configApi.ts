import axios from "axios";
import { useAuthStore } from "../stores";

export const configApi = axios.create({
  baseURL: "https://backend-palmyra.fly.dev",
  withCredentials: true, // This will allow cookies to be sent with requests
});
// interceptor
//configApi.interceptors.request.use((config) => {
//  const token = useAuthStore.getState().token;
//  if (token) config.headers["Cookie"] = `jwt = ${token}`;
//  return config;
//});
