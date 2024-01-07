import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateContactDetailsDto,
  ContactDetailsDto,
  ContactDetailsErrors,
  UpdateContactDetailsDto,
} from '@portfolio-builder/shared-types';
import { ContactDetails } from './contact-details.entity';

@Injectable()
export class ContactDetailsService {
  constructor(
    @InjectRepository(ContactDetails)
    private readonly contactDetailsRepository: Repository<ContactDetails>
  ) {}

  findAll(): Promise<ContactDetailsDto[]> {
    return this.contactDetailsRepository.find({});
  }

  findById(id: string): Promise<ContactDetailsDto | null> {
    return this.contactDetailsRepository.findOneBy({ id });
  }

  count(): Promise<number> {
    return this.contactDetailsRepository.count();
  }

  async create(
    contactDetailDetails: CreateContactDetailsDto
  ): Promise<ContactDetailsDto> {
    return this.contactDetailsRepository.save(contactDetailDetails);
  }

  async update(
    id: UpdateContactDetailsDto['id'],
    updateDetails: UpdateContactDetailsDto['details']
  ): Promise<ContactDetailsDto | null> {
    const existingContactDetails =
      await this.contactDetailsRepository.findOneBy({ id });

    if (!existingContactDetails)
      throw ContactDetailsErrors.ContactDetailsDoesNotExist;

    return this.contactDetailsRepository.save({
      ...existingContactDetails,
      ...updateDetails,
    });
  }

  async remove(id: string): Promise<number | null> {
    const { affected } = await this.contactDetailsRepository.delete(id);
    return affected ?? null;
  }

  async clear(): Promise<void> {
    this.contactDetailsRepository.delete({});
  }
}
