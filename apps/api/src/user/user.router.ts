import { Injectable } from '@nestjs/common';
import { createUserSchema, idSchema } from '@portfolio-builder/shared-validation';
import { UserService } from './user.service';
import { UserMapper } from './user.mapper';
import { TrpcService } from '../trpc/trpc.service';

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
      findOne: this.findOne(),
      create: this.create(),
      remove: this.remove(),
    })
  }

  private findAll() {
    return this.trpcService.procedure
      .query(async () => {
        const users = await this.userService.findAll();
        return users.map(this.userMapper.toExternalUser);
      });
  }

  private findOne() {
    return this.trpcService.procedure
      .input(idSchema)
      .query(async ({ input }) => {
        const user = await this.userService.findOne(input.id);
        return user ? this.userMapper.toExternalUser(user) : null;
      });
  }

  // This is temporary until the auth module gets created
  create() {
    return this.trpcService.procedure
      .input(createUserSchema)
      .mutation(async ({ input }) => {
        const user = await this.userService.create({ ...input, salt: '' });
        return this.userMapper.toExternalUser(user);
      });

  }

  remove() {
    return this.trpcService.procedure
      .input(idSchema)
      .mutation(async ({ input }) => {
        return await this.userService.remove(input.id);
      });
  }
}