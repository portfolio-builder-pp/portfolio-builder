import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createInterface } from 'readline';

import {
  BlogPostStatus,
  PageType,
  PropertyName,
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
import { ContactDetailsService } from './contact-details';
import { GlobalPropertyService } from './global-properties';

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
  contactDetails: number;
  globalProperties: number;
}

async function getItemCounts(app: NestExpressApplication): Promise<ItemCounts> {
  const blogPostService = app.get(BlogPostService);
  const userService = app.get(UserService);
  const pageService = app.get(PageService);
  const contactDetailsService = app.get(ContactDetailsService);
  const globalPropertyService = app.get(GlobalPropertyService);

  return {
    blogPosts: await blogPostService.count(),
    users: await userService.count(),
    pages: await pageService.count(),
    contactDetails: await contactDetailsService.count(),
    globalProperties: await globalPropertyService.count(),
  };
}

async function clearDatabase(app: NestExpressApplication) {
  const blogPostService = app.get(BlogPostService);
  const userService = app.get(UserService);
  const pageService = app.get(PageService);
  const contactDetailsService = app.get(ContactDetailsService);
  const globalPropertyService = app.get(GlobalPropertyService);

  return {
    blogPosts: await blogPostService.clear(),
    users: await userService.clear(),
    pages: await pageService.clear(),
    contactDetails: await contactDetailsService.clear(),
    globalProperties: await globalPropertyService.clear(),
  };
}

async function populateDatabase(app: NestExpressApplication) {
  const authService = app.get(AuthService);
  const pageService = app.get(PageService);
  const blogPostService = app.get(BlogPostService);
  const contactDetailsService = app.get(ContactDetailsService);
  const globalPropertyService = app.get(GlobalPropertyService);

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
        name: PropertyName.FontColor,
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
    seoTitle: 'Home',
    seoDescription: '',
  });

  await pageService.create({
    name: 'Blog',
    slug: 'blog',
    order: 1,
    enabled: true,
    type: PageType.Blog,
    properties: [],
    sections: [],
    seoTitle: 'Blog',
    seoDescription: 'Welcome to the blog',
  });

  await pageService.create({
    name: 'Portfolio',
    slug: 'portfolio',
    order: 2,
    enabled: true,
    type: PageType.Portfolio,
    properties: [],
    sections: [],
    seoTitle: 'Portfolio',
    seoDescription: '',
  });

  await pageService.create({
    name: 'Contact',
    slug: 'contact',
    order: 3,
    enabled: true,
    type: PageType.Contact,
    properties: [],
    sections: [],
    seoTitle: 'Contact',
    seoDescription: 'Get in touch with us',
  });

  await blogPostService.create(
    {
      title: 'The Rise of AI Chefs: Cooking Revolutionized',
      description:
        'Explore how artificial intelligence is transforming the culinary world. From recipe creation to meal planning, AI is reshaping the way we cook and eat, making gourmet meals accessible to everyone.',
      content: '',
      order: 0,
      status: BlogPostStatus.Draft,
    },
    admin
  );

  await blogPostService.create(
    {
      title: 'Sous Vide with a Side of AI: Precision Cooking Unleashed',
      description:
        'Delve into the marriage of sous vide cooking and artificial intelligence. Discover how smart algorithms are elevating precision cooking, ensuring consistently delicious results with every dish.',
      content: '',
      order: 1,
      status: BlogPostStatus.Published,
    },
    admin
  );

  await blogPostService.create(
    {
      title: 'AI in the Kitchen: From Ingredient Pairing to Flavor Fusion',
      description:
        'Uncover the secrets of AI-powered flavor pairing. Learn how algorithms analyze ingredients, textures, and tastes to create unique and delightful flavor combinations, inspiring innovative culinary creations.',
      content: '',
      order: 2,
      status: BlogPostStatus.Published,
    },
    admin
  );

  await blogPostService.create(
    {
      title: 'Cooking in the Cloud: How AI Transforms Home Kitchens',
      description:
        'Take a journey into the cloud-connected kitchen. Explore how AI seamlessly integrates with smart appliances, offering personalized cooking experiences, automated grocery shopping, and real-time culinary assistance.',
      content: '',
      order: 3,
      status: BlogPostStatus.Published,
    },
    admin
  );

  await blogPostService.create(
    {
      title: 'MasterChef AI Edition: The Future of Culinary Competitions',
      description:
        'Dive into the realm of AI-driven cooking competitions. Witness how machines and human chefs collaborate, pushing the boundaries of creativity and culinary excellence in the ultimate gastronomic showdown.',
      content: '',
      order: 4,
      status: BlogPostStatus.Published,
    },
    admin
  );

  await blogPostService.create(
    {
      title: 'AI Nutritionist: Customized Meal Plans for a Healthier You',
      description:
        'Learn how AI is revolutionizing nutrition by crafting personalized meal plans. Discover how smart algorithms analyze dietary preferences, health goals, and nutritional needs to create balanced and delicious meals.',
      content: '',
      order: 5,
      status: BlogPostStatus.Published,
    },
    admin
  );

  await blogPostService.create(
    {
      title: "Digital Taste Test: AI's Role in Recipe Enhancement",
      description:
        'Explore how artificial intelligence is enhancing recipes. From optimizing ingredient quantities to suggesting unique twists, AI is revolutionizing the culinary landscape, ensuring your home-cooked meals are always a palate-pleasing experience.',
      content: '',
      order: 6,
      status: BlogPostStatus.Draft,
    },
    admin
  );

  await blogPostService.create(
    {
      title: 'The AI Pastry Chef: Baking Beyond Boundaries',
      description:
        'Indulge in the world of AI-driven baking. Witness how smart algorithms analyze textures, temperatures, and flavors to create mouthwatering pastries. From cupcakes to croissants, let AI redefine your baking experience.',
      content: '',
      order: 7,
      status: BlogPostStatus.Archived,
    },
    admin
  );

  await blogPostService.create(
    {
      title: 'Culinary Creativity Unleashed: AI-Generated Recipes',
      description:
        'Step into the future of cooking with AI-generated recipes. Explore how machine learning algorithms create innovative and surprising dishes, challenging traditional notions of what can be cooked and enjoyed.',
      content: '',
      order: 8,
      status: BlogPostStatus.Published,
    },
    admin
  );

  await blogPostService.create(
    {
      title: 'Smart Kitchen, Happy Cook: How AI Makes Cooking a Breeze',
      description:
        'Discover the joys of a smart kitchen powered by AI. From voice-activated assistants to predictive cooking, explore the technologies making cooking more efficient, enjoyable, and accessible for all skill levels.',
      content: '',
      order: 9,
      status: BlogPostStatus.Published,
    },
    admin
  );

  await contactDetailsService.create({
    title: 'John Doe',
    order: 0,
    phoneNumber: '123 456 789',
    socialMediaLinks: {
      instagram: 'https://www.instagram.com/politechnika.poznanska/',
      twitter: 'https://twitter.com/PUT_Poznan',
      facebook: 'https://www.facebook.com/Politechnika.Poznanska',
      youtube: 'https://www.youtube.com/channel/UC9jAyy-X65QOVZpyGu9AKHw',
      tiktok: '',
      onlyfans: '',
    },
  });

  await contactDetailsService.create({
    title: 'Jane Doe',
    order: 1,
    contactEmail: 'some-kind-of@email.com',
    address: {
      country: 'Polska',
      state: 'Wielkopolska',
      city: 'Poznan',
      streetName: 'plac Marii Sklodowskiej-Curie',
      streetNumber: '5',
      postCode: '60-965',
    },
  });

  await globalPropertyService.save({
    name: PropertyName.AppName,
    value: 'AI Cooking',
    type: PropertyType.Text,
  });

  await globalPropertyService.save({
    name: PropertyName.AppDescription,
    value:
      'Transform your culinary journey with the AI cooking. Tailored recipes meet real-time guidance, adapting to your tastes and dietary requirements. Experience a seamless kitchen adventure, where innovation meets flavor, making every meal a delightful and stress-free masterpiece, personalized just for you.',
    type: PropertyType.Text,
  });
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