import { Injectable } from '@nestjs/common';
import { emailSchema, idSchema } from '@portfolio-builder/shared-validation';
import { TrpcService } from '../trpc';
import { UserService } from './user.service';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  public getRouter() {
    return this.trpcService.router({
      findAll: this.findAll(),
      findById: this.findById(),
      findByEmail: this.findByEmail(),
      remove: this.remove(),
    })
  }

  private findAll() {
    return this.trpcService.adminProcedure
      .query(async () => {
        const users = await this.userService.findAll();
        return users.map(this.userMapper.toExternalUser);
      });
  }

  private findById() {
    return this.trpcService.adminProcedure
      .input(idSchema)
      .query(async ({ input }) => {
        const user = await this.userService.findById(input.id);
        return this.userMapper.toExternalUser(user);
      });
  }

  private findByEmail() {
    return this.trpcService.adminProcedure
      .input(emailSchema)
      .query(async ({ input }) => {
        const user = await this.userService.findById(input.email);
        return this.userMapper.toExternalUser(user);
      });
  }

  private remove() {
    return this.trpcService.adminProcedure
      .input(idSchema)
      .mutation(async ({ input }) => {
        return await this.userService.remove(input.id);
      });
  }
}