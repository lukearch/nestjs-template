import { InternalServerErrorException } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { CustomRequest } from 'src/interfaces/custom-request';

export default function requestContext() {
  return (req: CustomRequest, _: Response, next: NextFunction): void => {
    req.context = new Map();
    req.set = (token: string, value: unknown): void => {
      req.context.set(token, value);
    };

    req.get = <T>(token: string): T => {
      if (!req.context.has(token)) {
        throw new InternalServerErrorException(
          `Attempting to request an unregistered data: Token -> ${token}`
        );
      }

      return req.context.get(token) as T;
    };

    return next();
  };
}
