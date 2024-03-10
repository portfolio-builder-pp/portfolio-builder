import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configSchema } from '@portfolio-builder/shared-validation';
import { corsConfigLoader, databaseConfigLoader, generalConfigLoader, sessionConfigLoader } from './config.loaders';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [
        generalConfigLoader,
        databaseConfigLoader,
        sessionConfigLoader,
        corsConfigLoader,
      ],
      validate: (config) => configSchema.parse(config),
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),
  ],
})
export class ConfigModule {}
