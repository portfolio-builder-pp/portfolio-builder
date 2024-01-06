import { ZodType, z } from 'zod';
import {
  CreateBlogPostDto,
  BlogPostDto,
  BlogPostStatus,
  UpdateBlogPostDto,
} from '@portfolio-builder/shared-types';
import { dateSchema, idSchema } from './utils';
import { userSchema } from './user';

export const blogPostSchema = z
  .object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    content: z.string().trim(),
    order: z.number(),
    status: z.nativeEnum(BlogPostStatus),
    publishedAt: z.date(),
  })
  .extend({
    author: z.lazy(() => userSchema),
  })
  .merge(idSchema)
  .merge(dateSchema)
  .strip() satisfies ZodType<BlogPostDto>;

export const createBlogPostSchema = blogPostSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    publishedAt: true,
    author: true,
  })
  .strip() satisfies ZodType<CreateBlogPostDto>;

export const updateBlogPostSchema = idSchema
  .extend({
    details: createBlogPostSchema.partial(),
  })
  .strip() satisfies ZodType<UpdateBlogPostDto>;
