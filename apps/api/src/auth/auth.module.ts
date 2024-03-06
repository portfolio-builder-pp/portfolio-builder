import { Module } from '@nestjs/common';
import { TrpcModule } from '../trpc';
import { UserModule } from '../user';
import { AuthService } from './auth.service';
import { AuthRouter } from './auth.router';

@Module({
  imports: [UserModule, TrpcModule],
  providers: [AuthService, AuthRouter],
  exports: [AuthRouter],
})
export class AuthModule {}
