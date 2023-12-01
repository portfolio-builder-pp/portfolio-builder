import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { UserDto } from "@portfolio-builder/shared-types";

declare module 'express-session' {
  interface SessionData {
    user?: UserDto | null,
  }
}

export const createContext = ({ req }: CreateExpressContextOptions) => {
  return {
    session: req.session,
    isAuthenticated: !!req.session?.user,
    role: req.session?.user?.role ?? null,
  }
}