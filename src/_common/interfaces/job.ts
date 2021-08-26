import { ObjectionModel } from '@libs/core';

export interface Job$Model extends ObjectionModel {
  id?: string;
  title?: string;
  location?: string;
  recruiterid?: string;
  ctc?: string;
  createdAt?: Date;
  updatedAt?: Date;
  
}