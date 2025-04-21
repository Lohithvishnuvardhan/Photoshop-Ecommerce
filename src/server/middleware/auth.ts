import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user'; // Make sure this exists and exports the User model
import { Types } from 'mongoose';

interface JwtPayload {
  id: string;
}

export interface IAuthRequest extends Request {
  user?: {
    _id: Types.ObjectId;
    email: string;
  };
}

export const isAuthenticated = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized: No token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;

    const user = await User.findById(decoded.id).select('_id email');
    if (!user) {
      res.status(401).json({ message: 'Unauthorized: User not found' });
      return;
    }

    req.user = { _id: user._id, email: user.email };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized: Invalid token', error: err });
  }
};
