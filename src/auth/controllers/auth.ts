import { RestController } from '@libs/core';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('auth')
export class AuthController extends RestController {
  @Post('/login')
  login(@Body('email') email: string, @Body('password') password: string) {
    return { email, password };
  }

  @Post('/register')
  register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ) {
  return {email, password,role}
  }}