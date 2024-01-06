import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { InternalUserDto, UserRole } from '@portfolio-builder/shared-types';
import { BlogPost } from '../blog-post';

@Entity()
export class User implements InternalUserDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Moderator,
  })
  role: UserRole;

  @OneToMany(() => BlogPost, (blogPost) => blogPost.author, {
    onDelete: 'SET NULL',
  })
  blogPosts: BlogPost[];
}
