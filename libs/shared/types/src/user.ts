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