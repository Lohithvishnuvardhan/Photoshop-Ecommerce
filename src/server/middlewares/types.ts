import { Request } from 'express';
import mongoose from 'mongoose';

export interface IAuthRequest extends Request {
  user?: {
    _id: mongoose.Types.ObjectId;
    // Add other user properties as needed
  };
} 