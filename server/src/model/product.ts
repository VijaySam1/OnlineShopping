import { Document, Schema, model } from "mongoose";

export interface MPRODUCT extends Document {
  name: string;
  category: string;
  price: number;
  unitsAvailable: number;
  discription: string;
}

export const PRODUCT = model<MPRODUCT>(
  "PRODUCT",
  new Schema<MPRODUCT>(
    {
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      unitsAvailable: {
        type: Number,
        required: true,
      },
      discription: {
        type: String,
      },
    },
    { timestamps: true }
  )
);
