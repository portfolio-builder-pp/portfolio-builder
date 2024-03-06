import { ZodType, z } from 'zod';
import { InternalUserDto, LoginDto, RegisterDto, UserDto, UserRole } from '@portfolio-builder/shared-types';
import { idSchema } from './utils';
import { blogPostSchema } from './blog-post';

export const emailSchema = z
  .object({ email: z.string().trim().email() })
  .strip();

export const userSchema = z
  .object({
    firstName: z.string().trim().min(2),
    lastName: z.string().trim().min(2),
    role: z.nativeEnum(UserRole),
  })
  .merge(idSchema)
  .merge(emailSchema)
  .strip() satisfies ZodType<UserDto>;

export const internalUserSchema = z
  .object({
    password: z.string().trim().min(6),
  })
  .extend({
    blogPosts: z.lazy(() => blogPostSchema.array()),
  })
  .merge(userSchema)
  .strip() satisfies ZodType<InternalUserDto>;

export const loginSchema = internalUserSchema
  .pick({
    email: true,
    password: true,
  })
  .strip() satisfies ZodType<LoginDto>;

export const registerSchema = internalUserSchema
  .omit({
    id: true,
    blogPosts: true,
  })
  .strip() satisfies ZodType<RegisterDto>;
