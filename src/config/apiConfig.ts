// Determine API base URL based on environment
const getApiBaseUrl = (): string => {
  // Check if we should use json-server
  const useJsonServer = import.meta.env.VITE_USE_JSON_SERVER !== "false";
  const jsonServerUrl =
    import.meta.env.VITE_JSON_SERVER_URL || "http://localhost:3000";
  const jsonPlaceholderUrl = "https://jsonplaceholder.typicode.com";
  const productionUrl = import.meta.env.VITE_API_URL;

  // Priority 1: Use json-server in development if enabled (default)
  if (useJsonServer && import.meta.env.DEV) {
    return jsonServerUrl;
  }

  // Priority 2: If production URL is explicitly set, use it
  if (productionUrl) {
    return productionUrl;
  }

  // Priority 3: Fallback to JSONPlaceholder (when json-server is disabled or not running)
  return jsonPlaceholderUrl;
};

export const API_CONFIG = {
  baseUrl: getApiBaseUrl(),
  useJsonServer: import.meta.env.VITE_USE_JSON_SERVER !== "false",
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
  jsonPlaceholderUrl: "https://jsonplaceholder.typicode.com",
};
