import { UserDto } from "./user";

export interface InternalUserDto extends UserDto {
  password: string;
}

export type LoginDto = Pick<InternalUserDto, 'email' | 'password'>

export type RegisterDto = Omit<InternalUserDto, 'id'>;