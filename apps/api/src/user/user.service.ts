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

  findOne(id: number): Promise<InternalUserDto | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(userDetails: InternalUserDto): Promise<InternalUserDto> {
    return this.usersRepository.save(userDetails);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
