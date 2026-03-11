import mongoose, { Document, Schema } from 'mongoose';

export interface ISneaker extends Document {
  name: string;
  brand: string;
  price: number;
  size: number[];
  color: string;
  description: string;
  image: string;
  stock: number;
  createdAt: Date;
}

const sneakerSchema = new Schema<ISneaker>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  size: {
    type: [Number],
    required: true
  },
  color: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Sneaker = mongoose.model<ISneaker>('Sneaker', sneakerSchema);
