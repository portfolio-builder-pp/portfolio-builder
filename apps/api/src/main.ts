/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { AppModule } from './app.module';
import { AppService } from './app.service';
import { renderTrpcPanel } from 'trpc-panel';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.API_DOCKER_PORT || 3000);

  const appService = app.get(AppService);
  const router = appService.combineRouters();

  app.use('/trpc', createExpressMiddleware({ router }));
  app.use('/panel', (_, res) => res.send(renderTrpcPanel(router, { url: `http://localhost:${port}/trpc` })));

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
