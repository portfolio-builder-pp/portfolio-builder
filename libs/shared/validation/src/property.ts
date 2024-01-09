import { ZodType, z } from 'zod';
import {
  PropertyDto,
  PropertyName,
  PropertyType,
} from '@portfolio-builder/shared-types';

export const propertyNameSchema = z
  .object({ name: z.nativeEnum(PropertyName) })
  .strip();

export const propertySchema = z
  .object({
    value: z.string().trim(),
    type: z.nativeEnum(PropertyType),
  })
  .merge(propertyNameSchema)
  .strip() satisfies ZodType<PropertyDto>;

