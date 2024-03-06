import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import session from 'express-session';

import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { ConfigService } from '@nestjs/config';

import { Environments } from '@portfolio-builder/shared-types';

import { AppModule } from './app.module';
import { AppService } from './app.service';
import { renderTrpcPanel } from 'trpc-panel';
import { createContext } from './trpc/trpc.context';
import { AppConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get<AppConfigService>(ConfigService);

  const port = configService.get('general.port', { infer: true });
  const sessionSecret = configService.get('session.secret', { infer: true });
  const environment = configService.get('general.environment', { infer: true });
  const dashboardUrl = configService.get('cors.dashboardOrigin', {
    infer: true,
  });

  configureCors(app, dashboardUrl);
  configureHelmet(app);
  configureSession(app, sessionSecret);
  configureRoutes(app, port, environment);

  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

function configureCors(app: NestExpressApplication, dashboardUrl: string) {
  app.enableCors({
    origin: dashboardUrl,
    credentials: true,
  });

  Logger.log(`⚙️ CORS configured for: ${dashboardUrl}!`);
}

function configureSession(app: NestExpressApplication, secret: string) {
  app.use(
    session({
      secret,
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

function configureHelmet(app: NestExpressApplication) {
  // app.use(helmet());

  Logger.log('⚙️ Helmet configured!');
}

function configureRoutes(app: NestExpressApplication, port: number, environment: Environments) {
  const appService = app.get(AppService);
  const router = appService.combineRouters();

  const trpcEndpoint = 'trpc';
  const debugPanelEndpoint = 'panel';

  app.use(`/${trpcEndpoint}`, createExpressMiddleware({ router, createContext }));

  if (environment === Environments.Development) {
    app.use(`/${debugPanelEndpoint}`, (_, res) => res.send(renderTrpcPanel(router, { url: `http://localhost:${port}/${trpcEndpoint}` })));
  }

  Logger.log('⚙️ Routes configured!');
}

bootstrap();
