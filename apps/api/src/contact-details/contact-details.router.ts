import { Injectable } from '@nestjs/common';
import {
  createContactDetailsSchema,
  idSchema,
  updateContactDetailsSchema,
} from '@portfolio-builder/shared-validation';
import { ContactDetailsErrors } from '@portfolio-builder/shared-types';
import { TrpcService } from '../trpc';
import { ContactDetailsService } from './contact-details.service';
import { TRPCError } from '@trpc/server';

@Injectable()
export class ContactDetailsRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly contactDetailsService: ContactDetailsService
  ) {}

  public getRouter() {
    return this.trpcService.router({
      findAll: this.findAll(),
      findById: this.findById(),
      remove: this.remove(),
      create: this.create(),
      update: this.update(),
    });
  }

  private findAll() {
    return this.trpcService.procedure.query(
      async () => await this.contactDetailsService.findAll()
    );
  }

  private findById() {
    return this.trpcService.procedure
      .input(idSchema)
      .query(
        async ({ input: { id } }) =>
          await this.contactDetailsService.findById(id)
      );
  }

  private create() {
    return this.trpcService.authProcedure
      .input(createContactDetailsSchema)
      .mutation(
        async ({ input }) => await this.contactDetailsService.create(input)
      );
  }

  private update() {
    return this.trpcService.authProcedure
      .input(updateContactDetailsSchema)
      .mutation(async ({ input: { id, details } }) => {
        try {
          return await this.contactDetailsService.update(id, details);
        } catch (error: ContactDetailsErrors | unknown) {
          switch (error) {
            case ContactDetailsErrors.ContactDetailsDoesNotExist: {
              throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'ContactDetails was not found',
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

  private remove() {
    return this.trpcService.authProcedure
      .input(idSchema)
      .mutation(
        async ({ input: { id } }) => await this.contactDetailsService.remove(id)
      );
  }
}
