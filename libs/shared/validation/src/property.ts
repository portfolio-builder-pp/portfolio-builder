import { ZodType, z } from 'zod';
import { PropertyDto, PropertyType } from '@portfolio-builder/shared-types';

export const propertySchema = z
  .object({
    name: z.string().trim().min(1),
    value: z.string().trim(),
    type: z.nativeEnum(PropertyType),
  })
  .strip() satisfies ZodType<PropertyDto>;
