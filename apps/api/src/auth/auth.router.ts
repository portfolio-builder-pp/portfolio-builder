import { Injectable } from '@nestjs/common';
import { TRPCError } from '@trpc/server';
import { registerSchema, loginSchema } from '@portfolio-builder/shared-validation';
import { UserMapper } from '../user';
import { TrpcService } from '../trpc';
import { AuthService } from './auth.service';

@Injectable()
export class AuthRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly authService: AuthService,
    private readonly userMapper: UserMapper,
  ) {}

  public getRouter() {
    return this.trpcService.router({
      login: this.login(),
      register: this.register(),
      logout: this.logout(),
      userInfo: this.userInfo(),
    });
  }

  private login() {
    return this.trpcService.procedure
      .input(loginSchema)
      .mutation(async ({ input, ctx }) => {
        const user = await this.authService.login(input);

        if (!user) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid username or password',
          });
        }

        ctx.session.user = user;

        return this.userMapper.toExternalUser(user);
      });
  }

  private register() {
    return this.trpcService.procedure
      .input(registerSchema)
      .mutation(async ({ input }) => {
        const user = await this.authService.register(input);
        return user ? this.userMapper.toExternalUser(user) : null;
      });
  }

  private userInfo() {
    return this.trpcService.procedure
      .query(({ ctx }) => {
        const { user } = ctx;
        return user ? this.userMapper.toExternalUser(user) : null;
      })
  }

  private logout() {
    return this.trpcService.procedure
      .query(({ ctx }) => {
        ctx.session.user = null;

        return true;
      });
  }
}