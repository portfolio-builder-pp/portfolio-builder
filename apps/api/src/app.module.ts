import { Module } from '@nestjs/common';

import { DatabaseModule } from './database';
import { TrpcModule } from './trpc';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, TrpcModule, UserModule, AuthModule],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
