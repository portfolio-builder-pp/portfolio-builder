import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { BlogPostDto, BlogPostStatus } from '@portfolio-builder/shared-types';
import { User } from '../user';

@Entity()
export class BlogPost implements BlogPostDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'text',
  })
  content: string;

  @Column()
  order: number;

  @Column({
    type: 'enum',
    enum: BlogPostStatus,
    default: BlogPostStatus.Draft,
  })
  status: BlogPostStatus;

  @Column({ nullable: true })
  publishedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.blogPosts, { onDelete: 'SET NULL' })
  author: User;
}
