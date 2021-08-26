import { ObjectionModel } from '@libs/core';

export interface IResetPasswordSecret extends ObjectionModel {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  expiresAt?: Date;
  userId?: string;
  secret?: string;
  isUsed?: boolean;
}