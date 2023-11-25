import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { InternalUserDto } from '@portfolio-builder/shared-types';

@Entity()
export class User implements InternalUserDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}