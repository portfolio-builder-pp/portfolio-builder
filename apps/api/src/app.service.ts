import { Injectable } from "@nestjs/common";
import { TrpcService } from "./trpc";
import { UserRouter } from "./user";
import { AuthRouter } from './auth';
import { PageRouter } from "./page";
import { BlogPostRouter } from './blog-post/';

@Injectable()
export class AppService {
  constructor(
    private readonly trpc: TrpcService,
    private readonly userRouter: UserRouter,
    private readonly authRouter: AuthRouter,
    private readonly pageRouter: PageRouter,
    private readonly blogPostRouter: BlogPostRouter
  ) {}

  public combineRouters() {
    return this.trpc.router({
      users: this.userRouter.getRouter(),
      auth: this.authRouter.getRouter(),
      page: this.pageRouter.getRouter(),
      blogPost: this.blogPostRouter.getRouter(),
    });
  }
}