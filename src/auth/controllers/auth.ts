import { User$Model } from '@app/_common';
import { RestController } from '@libs/core';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { LocalAuthGuard } from '../guards/local.auth.guard';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController extends RestController {
  constructor(private authService: AuthService) {
    super();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request & { user: User$Model }) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() body) {
    const user = await this.authService.register({
      email: body.email,
      password: body.password,
      role: body.role,
      name: body.name,
    });
    if (!user) throw new HttpException('Email already exists', 409);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req: Request & { user: User$Model }) {
    return req.user;
  }

  @Post('resetPassword')
  resetPassword(
    @Body('password') password: string,
    @Body('secret') secret: string,
  ) {
    return { password, secret };
  }

  @Post('forgetPassword')
  forgetPassword(@Body('email') email: string) {
    return { email };
  }
}