import { IResetPasswordSecret } from '@app/_common';
import { RepositoryContract } from '@libs/core';

export interface ResetPasswordRepositoryContract
  extends RepositoryContract<IResetPasswordSecret> {}