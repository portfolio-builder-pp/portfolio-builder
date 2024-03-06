export enum SectionType {
  Hero = 'hero',
  ContactDetails = 'contact-details',
  Carousel = 'carousel',
  LatestBlogs = 'latest-blogs',
  LatestPortfolioItems = 'latest-portfolio-items',
}

export interface SectionDto {
  title: string,
  content: string,
  type: SectionType;
}
