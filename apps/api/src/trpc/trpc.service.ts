import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { createContext } from './trpc.context';

type Context = ReturnType<typeof createContext>

@Injectable()
export class TrpcService {
  private readonly trpc = initTRPC.context<Context>().create();
  public readonly procedure = this.trpc.procedure;
  public readonly router = this.trpc.router;
  public readonly mergeRouters = this.trpc.mergeRouters;
}