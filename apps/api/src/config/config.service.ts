import { ConfigService } from "@nestjs/config";
import { AppConfig } from "@portfolio-builder/shared-types";

export type AppConfigService = ConfigService<AppConfig, true>;