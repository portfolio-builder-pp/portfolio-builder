import { WithDefaultValues } from "./helpers";
import { PropertyDto } from "./property";
import { SectionDto } from "./section";

export enum PageType {
  Contact = 'contact',
  Home = 'home',
  Portfolio = 'portfolio',
  Blog = 'blog',
  Custom = 'custom',
}

export interface PageDto {
  id: string,
  name: string,
  slug: string,
  order: number,
  enabled: boolean,
  type: PageType,
  properties: PropertyDto[],
  sections: SectionDto[],
}

export type CreatePageDto = WithDefaultValues<Omit<PageDto, 'id'>, 'enabled' | 'type'>;
export type UpdatePageDto = { id: string; details: Partial<CreatePageDto> };