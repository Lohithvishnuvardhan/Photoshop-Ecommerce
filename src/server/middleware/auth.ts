import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types/auth';

export const auth = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction

) => {
  try {
    // Your auth logic here
    // Make sure to set req.user._id
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
}; 