import { registerAs } from "@nestjs/config";
import { AppConfig, Environments } from "@portfolio-builder/shared-types";

const getEnvProperty = (propertyName: string, defaultValue = '') => 
  process.env[propertyName] ?? defaultValue;

const createConfigLoader = <T extends keyof AppConfig>(token: T, config: AppConfig[T]) =>
  registerAs(token, () => config);

export const generalConfigLoader = createConfigLoader('general', {
  environment: getEnvProperty(
    'NODE_ENV',
    Environments.Development
  ) as Environments,
  port: parseInt(getEnvProperty('API_PORT', '3000'), 10),
});

export const databaseConfigLoader = createConfigLoader('database', {
  host: getEnvProperty('DB_HOST'),
  port: parseInt(getEnvProperty('DB_PORT', '3306'), 10),
  username: getEnvProperty('DB_USER'),
  password: getEnvProperty('DB_PASSWORD'),
  name: getEnvProperty('DB_NAME'),
});

export const sessionConfigLoader = createConfigLoader('session', {
  secret: getEnvProperty('SESSION_SECRET'),
});

export const corsConfigLoader = createConfigLoader('cors', {
  dashboardOrigin: getEnvProperty('DASHBOARD_APP_ORIGIN'),
  publicOrigin: getEnvProperty('PUBLIC_APP_ORIGIN'),
});
