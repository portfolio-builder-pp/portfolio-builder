import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GlobalPropertyService } from './global-property.service';
import { GlobalProperty } from './global-property.entity';
import { GlobalPropertyRouter } from './global-property.router';
import { TrpcModule } from '../trpc';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalProperty]), TrpcModule],
  providers: [GlobalPropertyService, GlobalPropertyRouter],
  exports: [GlobalPropertyService, GlobalPropertyRouter],
})
export class GlobalPropertyModule {}
