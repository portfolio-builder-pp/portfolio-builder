import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createInterface } from 'readline';

import { RegisterDto, UserRole } from '@portfolio-builder/shared-types';

import { AppModule } from './app.module';
import { AuthService } from './auth';
import { UserService } from './user';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const counts = await getItemCounts(app);

  const nonEmptyCollections = getNonEmptyCollections(counts);

  const isDatabaseEmpty = !nonEmptyCollections.length;

  if (!isDatabaseEmpty) {
    const canClear = await canClearDatabase(nonEmptyCollections);

    if (!canClear) {
      return Logger.log('Initialization stopped');
    }

    Logger.log('Clearing database');
    await clearDatabase(app);
    Logger.log('Database cleared');
  }

  // Initialize app
  Logger.log('Initializing template')
  await populateDatabase(app);
  Logger.log(`Template initialized`);
}

bootstrap();

interface ItemCounts {
  users: number;
}

async function getItemCounts(app: NestExpressApplication): Promise<ItemCounts> {
  const userService = app.get(UserService);

  return {
    users: await userService.count(),
  }
}

async function clearDatabase(app: NestExpressApplication) {
  const userService = app.get(UserService);

  return {
    users: await userService.removeAll(),
  }
}

async function populateDatabase(app: NestExpressApplication) {
  const authService = app.get(AuthService);

  const desiredAdminCredentials = await obtainAdminCredentials();

  await authService.register(desiredAdminCredentials);
}

function getNonEmptyCollections(counts: ItemCounts): string[] {
  return Object.keys(counts).filter(entity => counts[entity] > 0);
}

async function canClearDatabase(nonEmptyCollections: string[]) {
  const response = await askQuestion(`
    Data already exists for the following collections: ${nonEmptyCollections.join(', ')}
    Are you sure that you want to delete it? [Y/n]
  `);

  const trimmedResponse = response.trim();

  const validAnswers = ['y', 'Y'];

  return validAnswers.includes(trimmedResponse);
}

async function obtainAdminCredentials(): Promise<RegisterDto> {
  const question = (field: string) => `Admin account ${field}: `;

  const firstNameResponse = await askQuestion(question('first name'));
  const lastNameResponse = await askQuestion(question('last name'));
  const emailResponse = await askQuestion(question('email'));
  const passwordResponse = await askQuestion(question('password [min 6 characters]'));

  return {
    firstName: firstNameResponse.trim(),
    lastName: lastNameResponse.trim(),
    role: UserRole.Admin,
    email: emailResponse.trim(),
    password: passwordResponse.trim(),
  }
}

function askQuestion(query: string): Promise<string> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}