import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  AddressDto,
  ContactDetailsDto,
  SocialMediaLinksDto,
} from '@portfolio-builder/shared-types';

@Entity()
export class ContactDetails implements ContactDetailsDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column({ type: 'simple-json', nullable: true })
  socialMediaLinks: SocialMediaLinksDto;

  @Column({ type: 'simple-json', nullable: true })
  address: AddressDto;
}
