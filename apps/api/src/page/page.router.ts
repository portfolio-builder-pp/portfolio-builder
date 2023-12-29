import { Injectable } from '@nestjs/common';
import { createPageSchema, idSchema, updatePageSchema } from '@portfolio-builder/shared-validation';
import { PageErrors } from '@portfolio-builder/shared-types';
import { TrpcService } from '../trpc';
import { PageService } from './page.service';
import { TRPCError } from '@trpc/server';

@Injectable()
export class PageRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly pageService: PageService,
  ) {}

  public getRouter() {
    return this.trpcService.router({
      findAll: this.findAll(),
      findById: this.findById(),
      remove: this.remove(),
      create: this.create(),
      update: this.update(),
    })
  }

  private findAll() {
    return this.trpcService.procedure
      .query(async () => await this.pageService.findAll());
  }

  private findById() {
    return this.trpcService.procedure
      .input(idSchema)
      .query(async ({ input: { id } }) => await this.pageService.findById(id));
  }

  private create() {
    return this.trpcService.authProcedure
      .input(createPageSchema)
      .mutation(async ({ input }) => await this.pageService.create(input));
  }

  private update() {
    return this.trpcService.authProcedure
      .input(updatePageSchema)
      .mutation(async ({ input: { id, details } }) => {
        try {
          return await this.pageService.update(id, details);
        } catch (error: PageErrors | unknown) {
          switch (error) {
            case PageErrors.PageDoesNotExist: {
              throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Page was not found',
              });
            }
            default: {
              throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Something went wrong',
              })
            }
          }
        }
      })
  }

  private remove() {
    return this.trpcService.authProcedure
      .input(idSchema)
      .mutation(async ({ input: { id } }) => await this.pageService.remove(id));
  }
}