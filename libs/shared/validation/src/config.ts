import { z } from "zod";
import { Environments } from '@portfolio-builder/shared-types';

const numberRegex = /^\d+$/;

export const configSchema = z
  .object({
    // General
    NODE_ENV: z.nativeEnum(Environments),
    PORT: z.string().regex(numberRegex).optional(),
    // Database
    DB_HOST: z.string().min(1),
    DB_PORT: z.string().regex(numberRegex).optional(),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string().optional(),
    DB_NAME: z.string().min(1),
    // Session
    SESSION_SECRET: z.string().min(1),
    // CORS
    DASHBOARD_APP_ORIGIN: z.string().min(1),
    PUBLIC_APP_ORIGIN: z.string().min(1),
  })
  .strip();