import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { BlogPost } from './blog-post.entity';
import { BlogPostRouter } from './blog-post.router';
import { TrpcModule } from '../trpc';
import { UserModule } from '../user';
import { BlogPostMapper } from './blog-post.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogPost]),
    TrpcModule,
    forwardRef(() => UserModule),
  ],
  providers: [BlogPostService, BlogPostRouter, BlogPostMapper],
  exports: [BlogPostService, BlogPostRouter],
})
export class BlogPostModule {}
