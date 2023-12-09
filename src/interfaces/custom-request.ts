import { Request } from 'express';

export interface CustomRequest extends Request {
  context: Map<string, unknown>;
  get: <T>(token: string) => T;
  set: (token: string, value: unknown) => void;
}
