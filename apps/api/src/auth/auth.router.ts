import { Injectable } from '@nestjs/common';
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
    });
  }

  private login() {
    return this.trpcService.procedure
      .input(loginSchema)
      .mutation(async ({ input, ctx }) => {
        const user = await this.authService.login(input);

        if (!user) return null;

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

  private logout() {
    return this.trpcService.procedure
      .query(async ({ ctx }) => {
        return ctx.session.user = null;
      });
  }
}