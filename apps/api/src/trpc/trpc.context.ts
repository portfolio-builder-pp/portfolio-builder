import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { UserDto } from "@portfolio-builder/shared-types";

declare module 'express-session' {
  interface SessionData {
    user?: UserDto,
  }
}

export const createContext = ({ req }: CreateExpressContextOptions) => {
  return {
    isAuthenticated: !!req.session?.user,
    role: req.session?.user?.role ?? null,
  }
}