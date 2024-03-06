import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { AuthErrors, InternalUserDto, LoginDto, RegisterDto } from '@portfolio-builder/shared-types';
import { UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async login(userDetails: LoginDto): Promise<InternalUserDto | null> {
    const user = await this.userService.findByEmail(userDetails.email);

    if (!user) throw AuthErrors.InvalidEmailOrPassword;

    const validPassword = await this.comparePassword(userDetails.password, user.password);

    if (!validPassword) throw AuthErrors.InvalidEmailOrPassword;

    return user;
  }

  async register(userDetails: RegisterDto): Promise<InternalUserDto> {
    const hashedPassword = await this.hashPassword(userDetails.password);

    const user = await this.userService.findByEmail(userDetails.email);

    if (user) throw AuthErrors.EmailAlreadyInUse;

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
