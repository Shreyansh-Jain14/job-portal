 import bcrypt from 'bcrypt';
import { UserService } from '@app/user';
import { User$Model } from '@app/_common';
import { RestController } from '@libs/core';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService extends RestController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async validate(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) return null;
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) return null;
    return user;
  }

  login(user: User$Model): { access_token: string } {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    const secret = this.configService.get('settings.jwtSecret');

    return {
      access_token: this.jwtService.sign(payload, { secret }),
    };
  }

  async register(user: User$Model): Promise<User$Model | null> {
    try {
      await this.userService.getUserByEmail(user.email);
      return null;
    } catch (e) {
      user.password = await bcrypt.hash(user.password, 10);
      user.id = uuidv4();
      const { password, ...result } = await this.userService.createUser(user);
      return result;
    }
  }

  async verify(token: string): Promise<User$Model> {
    const secret = this.configService.get('settings.jwtSecret');
    const decoded = this.jwtService.verify(token, { secret });
    const user = this.userService.getUserByEmail(decoded.email);
    return user;
  }
}