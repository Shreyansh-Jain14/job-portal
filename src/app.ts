import { Module } from '@nestjs/common';
import { EventModule } from '@squareboat/nest-events';
import { UserModule } from './user';
import { DbModule } from './_db';
import { CoreModule } from '@libs/core';
import { ConsoleModule } from '@squareboat/nest-console';
import { AuthModule } from './auth/module';

@Module({
  imports: [DbModule, CoreModule, UserModule, EventModule, ConsoleModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
