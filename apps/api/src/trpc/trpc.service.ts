import { Injectable } from '@nestjs/common';
import { TRPCError, initTRPC } from '@trpc/server';
import { createContext } from './trpc.context';

type Context = ReturnType<typeof createContext>

@Injectable()
export class TrpcService {
  private readonly trpc = initTRPC.context<Context>().create();
  
  private readonly authMiddleware = this.trpc.middleware(({ ctx, next }) => {
    if (!ctx.isAuthenticated) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({ ctx });
  });

  private readonly adminMiddleware = this.trpc.middleware(({ ctx, next }) => {
    if (!ctx.isAdmin) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }

    return next({ ctx });
  });

  public readonly router = this.trpc.router;
  public readonly mergeRouters = this.trpc.mergeRouters;
  public readonly procedure = this.trpc.procedure;
  public readonly authProcedure = this.trpc.procedure.use(this.authMiddleware);
  public readonly adminProcedure = this.trpc.procedure.use(this.adminMiddleware);
}