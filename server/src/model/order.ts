import { Document, Schema, model } from "mongoose";
import { CartSchema, ICart } from "./user";

export interface MOrder extends Document {
  userId: Schema.Types.ObjectId;
  products: ICart[];
}

export const ORDER = model<MOrder>(
  "ORDER",
  new Schema<MOrder>(
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      products: [CartSchema],
    },
    { timestamps: true }
  )
);
