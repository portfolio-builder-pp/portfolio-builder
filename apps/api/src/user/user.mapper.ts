import { Injectable } from '@nestjs/common';
import { InternalUserDto, UserDto } from '@portfolio-builder/shared-types';

@Injectable()
export class UserMapper {
  toExternalUser(internalUser: InternalUserDto): UserDto {
    return {
      id: internalUser.id,
      firstName: internalUser.firstName,
      lastName: internalUser.lastName,
      email: internalUser.email,
    }
  }
}