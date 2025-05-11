import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
}

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

export const Product = mongoose.model<IProduct>('Product', productSchema); 