import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import session from 'express-session';

import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { AppModule } from './app.module';
import { AppService } from './app.service';
import { renderTrpcPanel } from 'trpc-panel';
import { createContext } from './trpc/trpc.context';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.API_DOCKER_PORT || 3000);

  configureSession(app);
  configureRoutes(app, port);

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

function configureSession(app: INestApplication) {
  app.use(
    session({
      secret: process.env.SESSION_SECRET ?? '',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 43200000, //1000ms * 60 * 60 * 12 = 12h
      },
      name: 'PORTFOLIO_BUILDER_SESSION',
    })
  );
  
  Logger.log('⚙️ Session configured!');
}

function configureRoutes(app: INestApplication, port: number) {
  const appService = app.get(AppService);
  const router = appService.combineRouters();

  const trpcEndpoint = 'trpc';
  const debugPanelEndpoint = 'panel';

  app.use(`/${trpcEndpoint}`, createExpressMiddleware({ router, createContext }));

  if (process.env.NODE_ENV === 'development') {
    app.use(`/${debugPanelEndpoint}`, (_, res) => res.send(renderTrpcPanel(router, { url: `http://localhost:${port}/${trpcEndpoint}` })));
  }

  Logger.log('⚙️ Routes configured!');
}

bootstrap();
