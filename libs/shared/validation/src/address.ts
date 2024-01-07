import { ZodType, z } from 'zod';
import { AddressDto } from '@portfolio-builder/shared-types';

export const addressSchema = z
  .object({
    country: z.string().trim(),
    state: z.string().trim(),
    city: z.string().trim(),
    streetName: z.string().trim(),
    streetNumber: z.string().trim(),
    postCode: z.string().trim(),
  })
  .strip() satisfies ZodType<AddressDto>;
