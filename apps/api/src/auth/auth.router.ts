import { Injectable } from '@nestjs/common';
import { TRPCError } from '@trpc/server';
import {
  registerSchema,
  loginSchema,
} from '@portfolio-builder/shared-validation';
import { AuthErrors } from '@portfolio-builder/shared-types';
import { UserMapper } from '../user';
import { TrpcService } from '../trpc';
import { AuthService } from './auth.service';

@Injectable()
export class AuthRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly authService: AuthService,
    private readonly userMapper: UserMapper
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
        try {
          const user = await this.authService.login(input);

          ctx.session.user = user;

          return this.userMapper.toExternalUser(user);
        } catch (error: AuthErrors | unknown) {
          switch (error) {
            case AuthErrors.InvalidEmailOrPassword: {
              throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'Invalid username or password',
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

  private register() {
    return this.trpcService.adminProcedure
      .input(registerSchema)
      .mutation(async ({ input }) => {
        try {
          const user = await this.authService.register(input);
          return this.userMapper.toExternalUser(user);
        } catch (error: AuthErrors | unknown) {
          switch (error) {
            case AuthErrors.EmailAlreadyInUse: {
              throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Email already in use',
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

  private userInfo() {
    return this.trpcService.authProcedure.query(({ ctx }) => {
      const { user } = ctx;
      return this.userMapper.toExternalUser(user);
    });
  }

  private logout() {
    return this.trpcService.authProcedure.mutation(({ ctx }) => {
      ctx.session.user = null;

      return true;
    });
  }
}
