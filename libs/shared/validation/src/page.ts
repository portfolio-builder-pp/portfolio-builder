import { ZodType, z } from 'zod';
import { CreatePageDto, PageDto, PageType, UpdatePageDto } from '@portfolio-builder/shared-types';
import { idSchema } from './utils';
import { propertySchema } from './property';
import { sectionSchema } from './section';

export const pageSchema = z
  .object({
    name: z.string().trim().min(1),
    slug: z.string().trim(),
    order: z.number(),
    enabled: z.boolean(),
    type: z.nativeEnum(PageType),
    properties: propertySchema.array(),
    sections: sectionSchema.array(),
  })
  .merge(idSchema)
  .strip() satisfies ZodType<PageDto>;

export const createPageSchema = pageSchema
  .omit({
    id: true,
  })
  .strip() satisfies ZodType<CreatePageDto>;

export const updatePageSchema = idSchema
  .extend({
    details: createPageSchema.partial(),
  })
  .strip() satisfies ZodType<UpdatePageDto>;
