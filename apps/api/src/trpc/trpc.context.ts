import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { InternalUserDto, UserRole } from "@portfolio-builder/shared-types";

declare module 'express-session' {
  interface SessionData {
    user?: InternalUserDto | null,
  }
}

export const createContext = ({ req }: CreateExpressContextOptions) => {
  const { session } = req;
  const { user } = session;

  return {
    session,
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === UserRole.Admin,
  }
}