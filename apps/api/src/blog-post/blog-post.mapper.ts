import { Inject, Injectable, forwardRef } from '@nestjs/common';
import {
  BlogPostDto,
  InternalBlogPostDto,
} from '@portfolio-builder/shared-types';
import { UserMapper } from '../user';

@Injectable()
export class BlogPostMapper {
  constructor(
    @Inject(forwardRef(() => UserMapper))
    private readonly userMapper: UserMapper
  ) {}

  toExternalBlogPost(internalUser: null): null;
  toExternalBlogPost(internalUser: InternalBlogPostDto): BlogPostDto;
  toExternalBlogPost(
    internalUser: InternalBlogPostDto | null
  ): BlogPostDto | null;
  toExternalBlogPost(
    internalUser: InternalBlogPostDto | null
  ): BlogPostDto | null {
    if (!internalUser) return null;

    return {
      id: internalUser.id,
      title: internalUser.title,
      description: internalUser.description,
      content: internalUser.content,
      order: internalUser.order,
      status: internalUser.status,
      createdAt: internalUser.createdAt,
      updatedAt: internalUser.updatedAt,
      publishedAt: internalUser.publishedAt,
      author: this.userMapper.toExternalUser(internalUser.author),
    };
  }
}
