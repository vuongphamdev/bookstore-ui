// API Configuration
interface ApiConfig {
  baseUrl: string;
  timeout: number;
  endpoints: {
    auth: string;
    books: string;
    users: string;
    orders: string;
  };
}

// Environment-based configuration
const getApiConfig = (): ApiConfig => {
  const isDevelopment = import.meta.env.MODE === "development";
  const isProduction = import.meta.env.MODE === "production";

  // You can override with environment variables
  const customBaseUrl = import.meta.env.VITE_API_BASE_URL;

  let baseUrl: string;

  if (customBaseUrl) {
    baseUrl = customBaseUrl;
  } else if (isProduction) {
    baseUrl = "https://legacy-server-vk6s.onrender.com";
  } else if (isDevelopment) {
    // Use your production server even in development, or change to local if you have one
    baseUrl = "https://legacy-server-vk6s.onrender.com";
    // Uncomment the line below if you want to use local development server
    // baseUrl = 'http://localhost:3000';
  } else {
    baseUrl = "https://legacy-server-vk6s.onrender.com";
  }

  return {
    baseUrl,
    timeout: 10000, // 10 seconds
    endpoints: {
      auth: "/auth",
      books: "/books",
      users: "/users",
      orders: "/orders",
    },
  };
};

export const apiConfig = getApiConfig();

// Helper function to get base API URL
export const getBaseApiUrl = (): string => {
  return `${apiConfig.baseUrl}/api`;
};
