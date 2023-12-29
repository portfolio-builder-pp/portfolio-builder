import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PageDto, PageType, PropertyDto, SectionDto } from '@portfolio-builder/shared-types';

@Entity()
export class Page implements PageDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  order: number;

  @Column({ default: true })
  enabled: boolean;

  @Column({
    type: 'enum',
    enum: PageType,
    default: PageType.Custom
  })
  type: PageType;

  @Column({ type: 'simple-json' })
  sections: SectionDto[];

  @Column({ type: 'simple-json' })
  properties: PropertyDto[];
}