import { AppService } from './app.service';

export type AppRouter = ReturnType<AppService['combineRouters']>;