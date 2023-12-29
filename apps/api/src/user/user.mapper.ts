import { Injectable } from '@nestjs/common';
import { InternalUserDto, UserDto } from '@portfolio-builder/shared-types';

@Injectable()
export class UserMapper {
  toExternalUser(internalUser: InternalUserDto | null): UserDto | null {
    if (!internalUser) return null;

    return {
      id: internalUser.id,
      firstName: internalUser.firstName,
      lastName: internalUser.lastName,
      email: internalUser.email,
      role: internalUser.role,
    }
  }
}
