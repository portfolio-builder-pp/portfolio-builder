import { Injectable } from '@nestjs/common';
import {
  propertyNameSchema,
  propertySchema,
} from '@portfolio-builder/shared-validation';
import { TrpcService } from '../trpc';
import { GlobalPropertyService } from './global-property.service';

@Injectable()
export class GlobalPropertyRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly propertyService: GlobalPropertyService
  ) {}

  public getRouter() {
    return this.trpcService.router({
      findAll: this.findAll(),
      findByName: this.findByName(),
      save: this.save(),
      batchSave: this.batchSave(),
      remove: this.remove(),
    });
  }

  private findAll() {
    return this.trpcService.procedure.query(
      async () => await this.propertyService.findAll()
    );
  }

  private findByName() {
    return this.trpcService.procedure
      .input(propertyNameSchema)
      .query(
        async ({ input: { name } }) =>
          await this.propertyService.findByName(name)
      );
  }

  private save() {
    return this.trpcService.authProcedure
      .input(propertySchema)
      .mutation(async ({ input }) => await this.propertyService.save(input));
  }

  private batchSave() {
    return this.trpcService.authProcedure
      .input(propertySchema.array())
      .mutation(
        async ({ input }) => await this.propertyService.batchSave(input)
      );
  }

  private remove() {
    return this.trpcService.authProcedure
      .input(propertyNameSchema)
      .mutation(
        async ({ input: { name } }) => await this.propertyService.remove(name)
      );
  }
}
