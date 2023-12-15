import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Environments } from '@portfolio-builder/shared-types';
import { AppConfigService, ConfigModule } from '../config';
import { User } from '../user/user.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: AppConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host', { infer: true }),
        port: configService.get('database.port', { infer: true }),
        username: configService.get('database.username', { infer: true }),
        password: configService.get('database.password', { infer: true }),
        database: configService.get('database.name', { infer: true }),
        synchronize: configService.get('general.environment', { infer: true }) === Environments.Development,
        entities: [User],
      }),
      inject: [ConfigService],
    })
  ]
})
export class DatabaseModule {}
