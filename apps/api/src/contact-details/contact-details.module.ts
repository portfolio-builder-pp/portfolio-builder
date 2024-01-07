import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ContactDetailsService } from './contact-details.service';
import { ContactDetails } from './contact-details.entity';
import { ContactDetailsRouter } from './contact-details.router';
import { TrpcModule } from '../trpc';

@Module({
  imports: [TypeOrmModule.forFeature([ContactDetails]), TrpcModule],
  providers: [ContactDetailsService, ContactDetailsRouter],
  exports: [ContactDetailsService, ContactDetailsRouter],
})
export class ContactDetailsModule {}
