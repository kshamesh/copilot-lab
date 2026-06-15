// API Environment configuration
export type ApiEnvironment =
  | "local"
  | "development"
  | "qa"
  | "uat"
  | "production";

interface EnvironmentConfig {
  env: ApiEnvironment;
  baseUrl: string;
  timeout: number;
  isProduction: boolean;
}

const getEnvironmentConfig = (): EnvironmentConfig => {
  const env = (import.meta.env.VITE_API_ENV as ApiEnvironment) || "local";
  const baseUrl = import.meta.env.VITE_API_URL;
  const timeout = parseInt(import.meta.env.VITE_API_TIMEOUT || "10000", 10);

  if (!baseUrl) {
    throw new Error(
      `VITE_API_URL is not defined for environment: ${env}. Please check your .env files.`,
    );
  }

  return {
    env,
    baseUrl,
    timeout,
    isProduction: env === "production",
  };
};

export const API_CONFIG = getEnvironmentConfig();

// Log API config in development
if (import.meta.env.DEV) {
  console.log("🔧 API Configuration:", {
    environment: API_CONFIG.env,
    baseUrl: API_CONFIG.baseUrl,
    timeout: API_CONFIG.timeout,
  });
}
