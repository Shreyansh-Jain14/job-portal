import { ResetPasswordSecretModel } from '../../models';
import { Injectable } from '@nestjs/common';
import { DatabaseRepository as DB, InjectModel } from '@libs/core';
import { ResetPasswordRepositoryContract } from './contract';
import { IResetPasswordSecret } from '@app/_common/';

@Injectable()
export class ResetPasswordRepository
  extends DB<IResetPasswordSecret>
  implements ResetPasswordRepositoryContract
{
  @InjectModel(ResetPasswordSecretModel)
  model: ResetPasswordSecretModel;
}