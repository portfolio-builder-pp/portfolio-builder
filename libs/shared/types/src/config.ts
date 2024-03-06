export type AppConfig = {
  general: {
    environment: Environments,
    port: number;
  },
  database: {
    host: string,
    port: number,
    username: string,
    password: string,
    name: string,
  },
  session: {
    secret: string,
  },
  cors: {
    dashboardOrigin: string,
    publicOrigin: string,
  }
}

export enum Environments {
  Development = 'development',
  Production = 'production',
}