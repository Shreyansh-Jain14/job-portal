import { Injectable } from '@nestjs/common';
import { DatabaseRepository as DB, InjectModel } from '@libs/core';
import { ApplicationRepositoryContract } from './contract';
import { ApplicationModel } from '@app/application/models/application';
import { Application$Model } from '@app/_common';

@Injectable()
export class ApplicationRepository
  extends DB<Application$Model>
  implements ApplicationRepositoryContract
{
  @InjectModel(ApplicationModel)
  model: ApplicationModel;
}
