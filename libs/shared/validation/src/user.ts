import { CreateUserDto } from '@portfolio-builder/shared-types';
import { z, ZodType } from 'zod';

export const createUserSchema: ZodType<CreateUserDto> = z
  .object({
    firstName: z.string().trim().min(2),
    lastName: z.string().trim().min(2),
    email: z.string().trim().email(),
    password: z.string().trim().min(6),
  })
  .strip();