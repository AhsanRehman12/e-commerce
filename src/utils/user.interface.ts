import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    name: string;
    role: string;
    email:string
  };
}