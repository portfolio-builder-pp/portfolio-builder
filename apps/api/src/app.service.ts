import { Injectable } from "@nestjs/common";
import { TrpcService } from "./trpc";
import { UserRouter } from "./user";

@Injectable()
export class AppService {
  constructor(
    private readonly trpc: TrpcService,
    private readonly userRouter: UserRouter,
  ) {}

  public combineRouters() {
    return this.trpc.router({
      users: this.userRouter.getRouter(),
    })
  }
}