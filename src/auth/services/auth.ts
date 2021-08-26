 import * as bcrypt from 'bcrypt';
import { UserService } from '@app/user';
import { User$Model } from '@app/_common';
import { RestController } from '@libs/core';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { JWT_SECRET } from '../constants';
import { genRandomString, getTimeAfter } from '../utils/helpers';
import { RESET_PASSWORD_REPOSITORY } from '../constants';
import { IResetPasswordSecret } from '@app/_common/interfaces/resetPasswordSecret';
import { ResetPasswordRepository } from '../repositories';
import { Inject } from '@nestjs/common';
import { UserRepository } from '@app/user/repositories';

@Injectable()
export class AuthService extends RestController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private users:UserRepository,
    @Inject(RESET_PASSWORD_REPOSITORY)
    private readonly resetPasswordRepository: ResetPasswordRepository,
    
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
      access_token: this.jwtService.sign(payload, { secret:JWT_SECRET }),
    };
  }

  async register(user: User$Model): Promise<string | null> {
    try {
      await this.userService.getUserByEmail(user.email);
      return null;
    } catch (e) {
      user.password = await bcrypt.hash(user.password, 10);
      user.id = uuidv4();
      const { password, ...result } = await this.userService.createUser(user);
      return "registered successfully";
    }
  }

  async verify(token: string): Promise<User$Model> {
    const secret = this.configService.get('settings.jwtSecret');
    const decoded = this.jwtService.verify(token, { secret:JWT_SECRET });
    const user = this.userService.getUserByEmail(decoded.email);
    return user;
  }
    async forgetPassword(email: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      const resetPasswordData: IResetPasswordSecret = {
        id: uuidv4(),
        secret: genRandomString(100, user.email),
        expiresAt: getTimeAfter(
          this.configService.get('settings.resetExpiresIn'),
        ),
        userId: user.id,
      };

      const { secret, ...data } = await this.resetPasswordRepository.create(
        resetPasswordData,
      );

      return secret;
    } catch {
      return null;
    }
  }

  async getUserBySecret(secret: string) {
    try {
      const dbSecret = await this.resetPasswordRepository.firstWhere({
        secret,
        isUsed: false,
      });
      if (!dbSecret) return null;
      const { password, ...data } = await this.userService.getById(
        dbSecret.userId,
      );
      return data;
    } catch (e) {
      return null;
    }
  }

  async resetPassword(secret: string, password: string) {
    try {
      const dbSecret = await this.resetPasswordRepository.firstWhere({
        secret,
        isUsed: false,
      });
      if (!dbSecret) return null;
      if (dbSecret.expiresAt < new Date()) return null;

      const user = await this.userService.getById(dbSecret.userId);
      if (!user) return null;

      user.password = await bcrypt.hash(password, 10);
      const updated = await this.userService.updateUser(user);

      await this.resetPasswordRepository.updateWhere(
        { secret: dbSecret.secret },
        { isUsed: true },
      );

      delete user.password;
      if (!updated) return null;
      return user;
    } catch {
      return null;
    }
  }
}