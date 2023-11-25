import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalUserDto } from '@portfolio-builder/shared-types';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<InternalUserDto[]> {
    return this.usersRepository.find({});
  }

  findOne(id: string): Promise<InternalUserDto | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(userDetails: Omit<InternalUserDto, 'id'>): Promise<InternalUserDto> {
    return this.usersRepository.save(userDetails);
  }

  async remove(id: string): Promise<number | null> {
    const { affected } = await this.usersRepository.delete(id);
    return affected ?? null;
  }
}
