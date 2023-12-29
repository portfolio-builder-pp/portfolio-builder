import { Module } from '@nestjs/common';

import { DatabaseModule } from './database';
import { TrpcModule } from './trpc';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { PageModule } from './page';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, TrpcModule, UserModule, AuthModule, PageModule],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
