import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createInterface } from 'readline';

import {
  BlogPostStatus,
  PageType,
  PropertyType,
  RegisterDto,
  SectionType,
  UserRole,
} from '@portfolio-builder/shared-types';

import { AppModule } from './app.module';
import { AuthService } from './auth';
import { UserService } from './user';
import { PageService } from './page';
import { BlogPostService } from './blog-post';

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
  Logger.log('Initializing template');
  await populateDatabase(app);
  Logger.log(`Template initialized`);
}

bootstrap();

interface ItemCounts {
  users: number;
  pages: number;
  blogPosts: number;
}

async function getItemCounts(app: NestExpressApplication): Promise<ItemCounts> {
  const blogPostService = app.get(BlogPostService);
  const userService = app.get(UserService);
  const pageService = app.get(PageService);

  return {
    blogPosts: await blogPostService.count(),
    users: await userService.count(),
    pages: await pageService.count(),
  };
}

async function clearDatabase(app: NestExpressApplication) {
  const blogPostService = app.get(BlogPostService);
  const userService = app.get(UserService);
  const pageService = app.get(PageService);

  return {
    blogPosts: await blogPostService.clear(),
    users: await userService.clear(),
    pages: await pageService.clear(),
  };
}

async function populateDatabase(app: NestExpressApplication) {
  const authService = app.get(AuthService);
  const pageService = app.get(PageService);
  const blogPostService = app.get(BlogPostService);

  const desiredAdminCredentials = await obtainAdminCredentials();

  const admin = await authService.register(desiredAdminCredentials);

  await pageService.create({
    name: 'Home',
    slug: '',
    order: 0,
    enabled: true,
    type: PageType.Home,
    properties: [
      {
        name: 'font-color',
        value: '#333',
        type: PropertyType.ColorHEX,
      },
    ],
    sections: [
      {
        title: 'Welcome',
        content: '',
        type: SectionType.Hero,
      },
    ],
  });

  await pageService.create({
    name: 'Blog',
    slug: 'blog',
    order: 1,
    enabled: true,
    type: PageType.Blog,
    properties: [],
    sections: [],
  });

  await pageService.create({
    name: 'Portfolio',
    slug: 'portfolio',
    order: 2,
    enabled: true,
    type: PageType.Portfolio,
    properties: [],
    sections: [],
  });

  await pageService.create({
    name: 'Contact',
    slug: 'contact',
    order: 3,
    enabled: true,
    type: PageType.Contact,
    properties: [],
    sections: [],
  });

  await blogPostService.create(
    {
      title: "AI's Future Impact: Transforming Lives",
      content: '',
      order: 0,
      status: BlogPostStatus.Draft,
    },
    admin
  );

  await blogPostService.create(
    {
      title: 'Cooking Made Simple - Kitchen Tips & Recipes',
      content: '',
      order: 0,
      status: BlogPostStatus.Draft,
    },
    admin
  );
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