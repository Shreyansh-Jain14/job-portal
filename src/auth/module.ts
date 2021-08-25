import { UserModule } from '@app/user';
import { Module, HttpModule } from '@nestjs/common';
import { AuthController } from './controllers';


@Module({
  imports: [HttpModule,UserModule],
  controllers: [AuthController],
  providers: [

  ],
})
export class AuthModule {}