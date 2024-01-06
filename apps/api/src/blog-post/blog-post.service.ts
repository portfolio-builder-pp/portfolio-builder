import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateBlogPostDto,
  InternalBlogPostDto,
  BlogPostErrors,
  UpdateBlogPostDto,
  InternalUserDto,
  BlogPostStatus,
} from '@portfolio-builder/shared-types';
import { BlogPost } from './blog-post.entity';

@Injectable()
export class BlogPostService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostsRepository: Repository<BlogPost>
  ) {}

  findAll(): Promise<InternalBlogPostDto[]> {
    return this.blogPostsRepository.find({ relations: ['author'] });
  }

  findById(id: string): Promise<InternalBlogPostDto | null> {
    return this.blogPostsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  count(): Promise<number> {
    return this.blogPostsRepository.count();
  }

  async create(
    blogPostDetails: CreateBlogPostDto,
    author: InternalUserDto
  ): Promise<InternalBlogPostDto> {
    return this.blogPostsRepository.save({
      ...blogPostDetails,
      author,
      publishedAt:
        blogPostDetails.status === BlogPostStatus.Published
          ? new Date()
          : undefined,
    });
  }

  async update(
    id: UpdateBlogPostDto['id'],
    updateDetails: UpdateBlogPostDto['details']
  ): Promise<InternalBlogPostDto | null> {
    const existingBlogPost = await this.blogPostsRepository.findOneBy({ id });

    if (!existingBlogPost) throw BlogPostErrors.BlogPostDoesNotExist;

    return this.blogPostsRepository.save({
      ...existingBlogPost,
      ...updateDetails,
      publishedAt:
        updateDetails.status === BlogPostStatus.Published
          ? new Date()
          : undefined,
    });
  }

  async remove(id: string): Promise<number | null> {
    const { affected } = await this.blogPostsRepository.delete(id);
    return affected ?? null;
  }

  async clear(): Promise<void> {
    this.blogPostsRepository.delete({});
  }
}
