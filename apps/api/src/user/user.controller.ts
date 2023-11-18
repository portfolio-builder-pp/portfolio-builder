import { CreateUserDto } from '@portfolio-builder/shared-types';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserDto } from '@portfolio-builder/shared-types';
import { UserService } from './user.service';
import { UserMapper } from './user.mapper';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper,
  ) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    return users.map(this.userMapper.toExternalUser);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.findOne(+id);
    return this.userMapper.toExternalUser(user);
  }

  @Post()
  async create(@Body() userDetails: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.create({ ...userDetails, salt: '' });
    return this.userMapper.toExternalUser(user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<null> {
    await this.userService.remove(+id);
    return null;
  }
}