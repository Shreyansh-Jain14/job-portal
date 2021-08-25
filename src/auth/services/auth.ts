import { UserService } from '@app/user';
import { User$Model } from '@app/_common';
import { RestController } from '@libs/core';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from '../constants';

@Injectable()
export class AuthService extends RestController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async validate(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: User$Model): { access_token: string } {
    const payload = {
      email: user.email,
      id: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload, { secret: JWT_SECRET }),
    };
  }

  async verify(token: string): Promise<User$Model> {
    const decoded = this.jwtService.verify(token, { secret: JWT_SECRET });
    const user = this.userService.getUserByEmail(decoded.email);
    return user;
  }
}
