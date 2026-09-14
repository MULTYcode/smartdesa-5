import axios from "axios";
import { getEnv } from "@/lib/get-runtime-env";

const API_PUBLIC_VERSION = "/api/v1/public";
const API_PRIVATE_VERSION = "/api/v1";

/**
 * Mendapatkan base URL API secara dinamis.
 * Menggunakan getEnv agar terbaca dari Pod OS ENV / .env / fallback.
 */
function getApiBaseUrl(): string {
  return getEnv('NEXT_PUBLIC_API_URL', 'https://desa-api.muaraenimkab.go.id');
}

const axiosConfig = axios.create({
    baseURL: getApiBaseUrl() + API_PUBLIC_VERSION,
    headers: {
      Accept: "application/json",
    },
    timeout: 15000
  });
  
axiosConfig.interceptors.request.use(
    function (config) {
        // Sisipkan x-village-id secara dinamis pada setiap request
        config.headers['x-village-id'] = getEnv('NEXT_PUBLIC_VILLAGE_ID');
        // Update baseURL secara dinamis (untuk runtime Pod ENV changes)
        config.baseURL = getApiBaseUrl() + API_PUBLIC_VERSION;
        return config;
    },
    function (error) {
        console.error("Request error:", error);
        return Promise.reject(error); 
    }
);

axiosConfig.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 404) {
            return { data: null }; 
        }
        return Promise.reject(error);
    }
);

export const axiosConfigPrivate = axios.create({
  baseURL: getApiBaseUrl() + API_PRIVATE_VERSION,
  headers: {
    Accept: "application/json",
  },
});

axiosConfigPrivate.interceptors.request.use(
  async function (config) {
    // Sisipkan x-village-id secara dinamis pada setiap request
    config.headers['x-village-id'] = getEnv('NEXT_PUBLIC_VILLAGE_ID');
    // Update baseURL secara dinamis
    config.baseURL = getApiBaseUrl() + API_PRIVATE_VERSION;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosConfigPrivate.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 404) {
            return { data: null }; 
        }
        return Promise.reject(error);
    }
);

export default axiosConfig;
