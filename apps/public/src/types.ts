import type {
  BlogPostDto,
  PageDto,
  PageType,
  PropertyDto,
} from '@portfolio-builder/shared-types';

export enum ExtendedPageType {
  BlogPost = 'blog-post',
}

export type AstroPageType = PageType | ExtendedPageType;

export type NavLink = { title: string; link: string };

export type PropertyMap = Map<PropertyDto['name'], PropertyDto>;

type BasePageProps = {
  page: PageDto;
  navLinks: NavLink[];
  properties: PropertyMap;
};

type ExtendedPageProps<T extends Record<string, unknown>> = BasePageProps & T;

export type PageProps =
  | ExtendedPageProps<{
      pageType:
        | PageType.Contact
        | PageType.Custom
        | PageType.Home
        | PageType.Portfolio;
    }>
  | ExtendedPageProps<{
      pageType: PageType.Blog;
      posts: BlogPostDto[];
    }>
  | ExtendedPageProps<{
      pageType: ExtendedPageType.BlogPost;
      post: BlogPostDto;
    }>;
