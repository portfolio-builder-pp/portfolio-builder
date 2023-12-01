import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { InternalUserDto, LoginDto, RegisterDto } from '@portfolio-builder/shared-types';
import { UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async login(userDetails: LoginDto): Promise<InternalUserDto | null> {
    const user = await this.userService.findByEmail(userDetails.email);

    if (!user) {
      return null;
    }

    const validPassword = this.comparePassword(userDetails.password, user.password);

    if (!validPassword) {
      return null;
    }

    return user;
  }

  async register(userDetails: RegisterDto): Promise<InternalUserDto> {
    const hashedPassword = await this.hashPassword(userDetails.password);

    return this.userService.create({
      ...userDetails,
      password: hashedPassword,
    });
  }

  private async hashPassword(password: string, rounds = 10): Promise<string> {
    return hash(password, rounds);
  }

  private async comparePassword(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
