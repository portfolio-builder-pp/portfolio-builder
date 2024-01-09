import { Entity, Column, PrimaryColumn } from 'typeorm';
import {
  PropertyDto,
  PropertyName,
  PropertyType,
} from '@portfolio-builder/shared-types';

@Entity()
export class GlobalProperty implements PropertyDto {
  @PrimaryColumn({
    type: 'enum',
    enum: PropertyName,
  })
  name: PropertyName;

  @Column({
    length: 1000,
  })
  value: string;

  @Column({
    type: 'enum',
    enum: PropertyType,
    default: PropertyType.Custom,
  })
  type: PropertyType;
}
