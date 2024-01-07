import { ZodType, z } from 'zod';
import {
  CreateContactDetailsDto,
  ContactDetailsDto,
  UpdateContactDetailsDto,
} from '@portfolio-builder/shared-types';
import { idSchema } from './utils';
import { socialMediaLinksSchema } from './social-media-links';
import { addressSchema } from './address';

export const contactDetailsSchema = z
  .object({
    title: z.string().trim().min(1),
    order: z.number(),
    phoneNumber: z.string().trim().optional(),
    contactEmail: z.string().trim().email().optional(),
  })
  .merge(idSchema)
  .extend({
    socialMediaLinks: socialMediaLinksSchema.optional(),
    address: addressSchema.optional(),
  })
  .strip() satisfies ZodType<ContactDetailsDto>;

export const createContactDetailsSchema = contactDetailsSchema
  .omit({
    id: true,
  })
  .strip() satisfies ZodType<CreateContactDetailsDto>;

export const updateContactDetailsSchema = idSchema
  .extend({
    details: createContactDetailsSchema.partial(),
  })
  .strip() satisfies ZodType<UpdateContactDetailsDto>;
