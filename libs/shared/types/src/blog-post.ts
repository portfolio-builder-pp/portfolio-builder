import { WithDefaultValues } from './helpers';
import { InternalUserDto, UserDto } from './user';

export enum BlogPostStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}

export interface BlogPostDto {
  id: string;
  title: string;
  description: string;
  content: string;
  order: number;
  status: BlogPostStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
  publishedAt?: Date | string;
  author: UserDto;
}

export interface InternalBlogPostDto extends BlogPostDto {
  author: InternalUserDto;
}

export type CreateBlogPostDto = WithDefaultValues<
  Omit<
    BlogPostDto,
    'id' | 'publishedAt' | 'createdAt' | 'updatedAt' | 'author'
  >,
  'status'
>;
export type UpdateBlogPostDto = {
  id: string;
  details: Partial<CreateBlogPostDto>;
};
