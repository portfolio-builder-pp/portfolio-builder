import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { InternalUserDto, UserRole } from '@portfolio-builder/shared-types';

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

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Moderator
  })
  role: UserRole
}