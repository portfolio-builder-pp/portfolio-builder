import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InternalUserDto, RegisterDto } from '@portfolio-builder/shared-types';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<InternalUserDto[]> {
    return this.usersRepository.find({});
  }

  findById(id: string): Promise<InternalUserDto | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<InternalUserDto | null> {
    return this.usersRepository.findOneBy({ email });
  }

  count(): Promise<number> {
    return this.usersRepository.count();
  }

  // Internal use only - user creation should only be handled by the auth service
  create(userDetails: RegisterDto): Promise<InternalUserDto> {
    return this.usersRepository.save(userDetails);
  }

  async remove(id: string): Promise<number | null> {
    const { affected } = await this.usersRepository.delete(id);
    return affected ?? null;
  }

  async clear(): Promise<void> {
    return await this.usersRepository.clear();
  }
}
