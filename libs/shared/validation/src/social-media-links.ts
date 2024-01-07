import { ZodType, z } from 'zod';
import { SocialMediaLinksDto } from '@portfolio-builder/shared-types';

export const socialMediaLinksSchema = z
  .object({
    instagram: z.string().trim(),
    twitter: z.string().trim(),
    facebook: z.string().trim(),
    youtube: z.string().trim(),
    tiktok: z.string().trim(),
    onlyfans: z.string().trim(),
  })
  .strip() satisfies ZodType<SocialMediaLinksDto>;
