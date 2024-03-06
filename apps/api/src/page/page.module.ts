import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { Page } from './page.entity';
import { PageRouter } from './page.router';
import { TrpcModule } from '../trpc';

@Module({
  imports: [TypeOrmModule.forFeature([Page]), TrpcModule],
  providers: [PageService, PageRouter],
  exports: [PageService, PageRouter],
})
export class PageModule {}
