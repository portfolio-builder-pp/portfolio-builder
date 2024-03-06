import { z } from 'zod';

export const idSchema = z
  .object({ id: z.string().uuid() })
  .strip();

export const dateSchema = z
  .object({
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .strip();
