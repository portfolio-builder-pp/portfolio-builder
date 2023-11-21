import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserMapper } from './user.mapper';
import { UserRouter } from './user.router';
import { TrpcModule } from '../trpc';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TrpcModule],
  providers: [UserService, UserMapper, UserRouter],
  exports: [UserService, UserRouter],
})
export class UserModule {}
