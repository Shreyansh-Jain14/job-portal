import { Module, HttpModule } from '@nestjs/common';
import { AuthController } from './controllers';


@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [

  ],
})
export class AuthModule {}