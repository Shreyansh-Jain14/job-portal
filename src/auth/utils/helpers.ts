import * as crypto from 'crypto';

export const genRandomString = (size: number, postfix: string) => {
  return crypto.randomBytes(size).toString('hex').slice(0, size) + postfix;
};

export const getTimeAfter = (minutes: number) => {
  return new Date(Date.now() + 1000 * 60 * minutes);
};