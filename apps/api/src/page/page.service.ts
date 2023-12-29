import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePageDto, PageDto, PageErrors, UpdatePageDto } from '@portfolio-builder/shared-types';
import { Page } from './page.entity';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page) private readonly pagesRepository: Repository<Page>,
  ) {}

  findAll(): Promise<PageDto[]> {
    return this.pagesRepository.find({});
  }

  findById(id: string): Promise<PageDto | null> {
    return this.pagesRepository.findOneBy({ id });
  }

  count(): Promise<number> {
    return this.pagesRepository.count();
  }

  async create(pageDetails: CreatePageDto): Promise<PageDto> {
    return this.pagesRepository.save(pageDetails);
  }

  async update(id: UpdatePageDto['id'], updateDetails: UpdatePageDto['details']): Promise<PageDto | null> {
    const existingPage = await this.pagesRepository.findOneBy({ id });

    if (!existingPage) throw PageErrors.PageDoesNotExist;

    return this.pagesRepository.save({
      ...existingPage,
      ...updateDetails,
    })
  }

  async remove(id: string): Promise<number | null> {
    const { affected } = await this.pagesRepository.delete(id);
    return affected ?? null;
  }

  async clear(): Promise<void> {
    return this.pagesRepository.clear();
  }
}
