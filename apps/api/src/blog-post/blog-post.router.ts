import { Injectable } from '@nestjs/common';
import {
  idSchema,
  createBlogPostSchema,
  updateBlogPostSchema,
  blogStatusSchema,
} from '@portfolio-builder/shared-validation';
import { BlogPostErrors } from '@portfolio-builder/shared-types';
import { TrpcService } from '../trpc';
import { BlogPostService } from './blog-post.service';
import { BlogPostMapper } from './blog-post.mapper';
import { TRPCError } from '@trpc/server';

@Injectable()
export class BlogPostRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly blogPostService: BlogPostService,
    private readonly blogPostMapper: BlogPostMapper
  ) {}

  public getRouter() {
    return this.trpcService.router({
      findAll: this.findAll(),
      findById: this.findById(),
      remove: this.remove(),
      create: this.create(),
      update: this.update(),
    });
  }

  private findAll() {
    return this.trpcService.procedure
      .input(blogStatusSchema)
      .query(async ({ input: { status } }) => {
        const blogPosts = await this.blogPostService.findAll(status);
        return blogPosts.map((blogPost) =>
          this.blogPostMapper.toExternalBlogPost(blogPost)
        );
      });
  }

  private findById() {
    return this.trpcService.procedure
      .input(idSchema)
      .query(async ({ input: { id } }) => {
        const blogPost = await this.blogPostService.findById(id);
        return this.blogPostMapper.toExternalBlogPost(blogPost);
      });
  }

  private create() {
    return this.trpcService.authProcedure
      .input(createBlogPostSchema)
      .mutation(async ({ input, ctx: { user } }) => {
        if (!user) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Not authenticated',
          });
        }

        const blogPost = await this.blogPostService.create(input, user);
        return this.blogPostMapper.toExternalBlogPost(blogPost);
      });
  }

  private update() {
    return this.trpcService.authProcedure
      .input(updateBlogPostSchema)
      .mutation(async ({ input: { id, details } }) => {
        try {
          const blogPost = await this.blogPostService.update(id, details);
          return this.blogPostMapper.toExternalBlogPost(blogPost);
        } catch (error: BlogPostErrors | unknown) {
          switch (error) {
            case BlogPostErrors.BlogPostDoesNotExist: {
              throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Blog post was not found',
              });
            }
            default: {
              throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Something went wrong',
              });
            }
          }
        }
      });
  }

  private remove() {
    return this.trpcService.authProcedure
      .input(idSchema)
      .mutation(
        async ({ input: { id } }) => await this.blogPostService.remove(id)
      );
  }
}
