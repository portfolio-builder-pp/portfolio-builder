import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PropertyDto, PropertyName } from '@portfolio-builder/shared-types';
import { GlobalProperty } from './global-property.entity';

@Injectable()
export class GlobalPropertyService {
  constructor(
    @InjectRepository(GlobalProperty)
    private readonly propertiesRepository: Repository<GlobalProperty>
  ) {}

  findAll(): Promise<PropertyDto[]> {
    return this.propertiesRepository.find({});
  }

  findByName(name: PropertyName): Promise<PropertyDto | null> {
    return this.propertiesRepository.findOneBy({ name });
  }

  count(): Promise<number> {
    return this.propertiesRepository.count();
  }

  async save(property: PropertyDto): Promise<PropertyDto> {
    return this.propertiesRepository.save(property);
  }

  async batchSave(properties: PropertyDto[]): Promise<PropertyDto[]> {
    return this.propertiesRepository.save(properties);
  }

  async remove(name: string): Promise<number | null> {
    const { affected } = await this.propertiesRepository.delete(name);
    return affected ?? null;
  }

  async clear(): Promise<void> {
    this.propertiesRepository.delete({});
  }
}
