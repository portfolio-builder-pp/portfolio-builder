import { z, ZodType } from 'zod';
import { LoginDto, RegisterDto, UserRole } from '@portfolio-builder/shared-types';

export const emailSchema = z
  .object({ email: z.string().trim().email() })
  .strip();

export const registerSchema: ZodType<RegisterDto> = z
  .object({
    firstName: z.string().trim().min(2),
    lastName: z.string().trim().min(2),
    email: z.string().trim().email(),
    password: z.string().trim().min(6),
    role: z.nativeEnum(UserRole),
  })
  .strip();

export const loginSchema: ZodType<LoginDto> = z
  .object({
    email: z.string().trim().email(),
    password: z.string().trim().min(6),
  })
  .strip();