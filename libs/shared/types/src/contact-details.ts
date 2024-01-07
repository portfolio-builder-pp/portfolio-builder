import { SocialMediaLinksDto } from './social-media-links';
import { AddressDto } from './address';

export interface ContactDetailsDto {
  id: string;
  title: string;
  order: number;
  phoneNumber?: string;
  contactEmail?: string;
  socialMediaLinks?: SocialMediaLinksDto;
  address?: AddressDto;
}

export type CreateContactDetailsDto = Omit<ContactDetailsDto, 'id'>;
export type UpdateContactDetailsDto = {
  id: string;
  details: Partial<CreateContactDetailsDto>;
};
