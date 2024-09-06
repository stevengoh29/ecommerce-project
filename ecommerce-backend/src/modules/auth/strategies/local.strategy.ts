import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super()
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.usersService.validateUser(username, password)

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}