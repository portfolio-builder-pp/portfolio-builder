import { ZodType, z } from 'zod';
import { SectionDto, SectionType } from '@portfolio-builder/shared-types';

export const sectionSchema = z
  .object({
    title: z.string().trim().min(1),
    content: z.string().min(1),
    type: z.nativeEnum(SectionType),
  })
  .strip() satisfies ZodType<SectionDto>;