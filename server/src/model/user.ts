import { Document, Schema, model } from "mongoose";
import { userRole } from "../enums/userRole";

export interface ICart {
  productId: Schema.Types.ObjectId;
  quantity: number;
}

interface IOrder {
  orderId: Schema.Types.ObjectId;
}

export interface MUSER extends Document {
  name: string;
  mobileNumber: number;
  password: string;
  role: userRole;
  cart: ICart[];
  orders: IOrder[];
  isDeleted: boolean;
}

export const CartSchema = new Schema<ICart>({
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>({
  orderId: { type: Schema.Types.ObjectId, ref: "Order" },
});


export const USER = model<MUSER>(
  "USER",
  new Schema<MUSER>(
    {
      name: {
        type: String,
      },
      mobileNumber: {
        type: Number,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: userRole,
      },
      cart: [CartSchema],
      orders: [OrderSchema],

      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )
);
