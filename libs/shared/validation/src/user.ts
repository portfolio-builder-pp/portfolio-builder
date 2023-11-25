import { z, ZodType } from 'zod';
import { CreateUserDto, UserRole } from '@portfolio-builder/shared-types';

export const createUserSchema: ZodType<CreateUserDto> = z
  .object({
    firstName: z.string().trim().min(2),
    lastName: z.string().trim().min(2),
    email: z.string().trim().email(),
    password: z.string().trim().min(6),
    role: z.nativeEnum(UserRole),
  })
  .strip();