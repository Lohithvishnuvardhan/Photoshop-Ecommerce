import { Request } from 'express';

export interface AuthUser {
  _id: string;
  email: string;
  // Add other user properties as needed
}

export interface AuthRequest extends Request {
  user?: AuthUser;
} 