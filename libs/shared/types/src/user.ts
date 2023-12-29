export enum UserRole {
  Moderator = 'Moderator',
  Admin = 'Admin',
}

export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface InternalUserDto extends UserDto {
  password: string;
}

export type LoginDto = Pick<InternalUserDto, 'email' | 'password'>

export type RegisterDto = Omit<InternalUserDto, 'id'>;