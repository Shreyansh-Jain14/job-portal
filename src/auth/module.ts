import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './controllers/auth';
import { AuthService } from './services';
import { LocalStrategy } from './strategies/local.strategy';
import { JWT_SECRET } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { ResetPasswordRepository } from './repositories/resetPasswordSecret/database';
import { RESET_PASSWORD_REPOSITORY } from './constants';
import { AdminAuthController } from './controllers/admin';
import { UserRepository } from '@app/user/repositories';
import { JobModel, JobModule, JobService } from '@app/job';

@Module({
  imports: [
    UserModule,
    JobModule,
    ConfigModule,
    UserRepository,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('settings.jwtSecret'),
          signOptions: { expiresIn: '30d' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, AdminAuthController],
  providers: [
    AuthService, JwtStrategy, LocalStrategy,{ provide: RESET_PASSWORD_REPOSITORY, useClass: ResetPasswordRepository },],
})
export class AuthModule {}