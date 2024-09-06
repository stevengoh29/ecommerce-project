import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SECRET_KEY } from 'src/config/application.config';
import { AuthenticationException } from 'src/exceptions/security';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: SECRET_KEY,
        })
    }

    async validate(payload: any) {
        const user = await this.usersService.getUserByUuid(payload.userId)
        if (!user) throw new AuthenticationException()
        return plainToClass(User, user) 
    }
}
