import { Module, HttpModule } from '@nestjs/common';
import { APPLICATION_REPOSITORY } from './constants';
import { ApplicationController } from './controllers';
import { ApplicationRepository } from './repositories';
import { ApplicationService } from './services';



@Module({
  imports: [HttpModule],
  controllers: [ApplicationController],
  providers: [
    ApplicationService,ApplicationRepository,
    { provide: APPLICATION_REPOSITORY, useClass: ApplicationRepository },
    
  ],
  exports: [ApplicationService],
})
export class ApplicationModule {}