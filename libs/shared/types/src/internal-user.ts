import { UserDto } from "./user";

export interface InternalUserDto extends UserDto {
  salt: string;
  password: string;
}