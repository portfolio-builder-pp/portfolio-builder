import { Injectable } from "@nestjs/common";
import { TrpcService } from "./trpc";
import { UserRouter } from "./user";
import { AuthRouter } from './auth';

@Injectable()
export class AppService {
  constructor(
    private readonly trpc: TrpcService,
    private readonly userRouter: UserRouter,
    private readonly authRouter: AuthRouter,
  ) {}

  public combineRouters() {
    return this.trpc.router({
      users: this.userRouter.getRouter(),
      auth: this.authRouter.getRouter(),
    })
  }
}