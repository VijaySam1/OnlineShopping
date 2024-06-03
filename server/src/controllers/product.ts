import { Request, Response } from "express";

// import bcrypt from 'bcrypt';

import { ICart, USER } from "../model/user";
import { userRole } from "../enums/userRole";
import { PRODUCT } from "../model/product";
import { getUserId } from "../utils/getUserId";
import { ORDER } from "../model/order";

interface Iproduct {
  name: string;
  category: string;
  price: number;
  unitsAvailable: number;
  discription: string;
}

//controller to get all products
export const getProducts = async (req: Request, res: Response) => {
  const products = await PRODUCT.find({});
  if (!products) {
    res.status(400).send({ message: "Products not found" });
  }
  res.status(200).send({ message: "Success", data: products });
};

//controller to add products
export const addProduct = (req: Request, res: Response) => {
  const requestBody: Iproduct = req.body as Iproduct;
  const { name, category, price, unitsAvailable, discription } = requestBody;
  PRODUCT.create({ name, category, price, unitsAvailable, discription })
    .then((product) => {
      if (product) {
        res.status(200).send({ message: "New Product Added Successfully" });
      } else {
        res.status(400).send({ message: "Bad request" });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: "invalid Request" });
    });
};

//controller to update products
export const updateProduct = async (req: Request, res: Response) => {
  const requestBody: Iproduct = req.body as Iproduct;
  const { id } = req.params;
  let { price, unitsAvailable } = requestBody;
  const product: any = await PRODUCT.findById(id);
  price = price ? price : product.price;
  unitsAvailable = unitsAvailable ? unitsAvailable : product.unitsAvailable;
  PRODUCT.findByIdAndUpdate(id, { price, unitsAvailable })
    .then((product) => {
      if (product) {
        res.status(200).send({ message: "New Product Updated Successfully" });
      } else {
        res.status(400).send({ message: "Bad request" });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: "invalid Request" });
    });
};

//controller to get single product by id
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await PRODUCT.findById(id);
  if (!product) {
    res.status(400).send({ message: "Product not found" });
  }
  res.status(200).send({ message: "Success", data: product });
};
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await PRODUCT.findByIdAndDelete(id);
  if (!product) {
    res.status(400).send({ message: "Product not found" });
  }
  res.status(200).send({ message: "Product Deleted Successfully" });
};

//controller to get cart of the logged in user
export const getCart = (req: Request, res: Response) => {
  const authHeader: string = req.headers["authorization"] as string;
  const userId = getUserId(authHeader);

  USER.findById(userId)
    .then(async (user) => {
      if (user) {
        res.status(200).send({ message: "Success", data: user.cart });
      } else {
        res.status(400).send({ message: "user not found" });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: "Bad request" });
    });
};

//controller to add a product to cart with product id
export const addToCart = (req: Request, res: Response) => {
  const authHeader: string = req.headers["authorization"] as string;
  const userId = getUserId(authHeader);

  const requestBody: ICart = req.body as ICart;
  const { quantity } = requestBody;
  const { id } = req.params;

  USER.findById(userId)
    .then(async (user) => {
      const product = await PRODUCT.findById(id);
      if (product) {
        if (user) {
          const cartItem = user.cart.find((i) => i.productId == product.id);
          if (cartItem) {
            cartItem.quantity = quantity;
          } else {
            const cart: ICart = { productId: product.id, quantity: quantity };
            user.cart.push(cart);
          }
          user.save();
          res
            .status(200)
            .send({ message: "Product Added to cart Successfully" });
        } else {
          res.status(404).send({ message: "user not found" });
        }
      } else {
        res.status(400).send({ message: "Product not found" });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: "Bad request" });
    });
};

//controller to remove a product from cart with product id
export const removeFromCart = (req: Request, res: Response) => {
  const authHeader: string = req.headers["authorization"] as string;
  const userId = getUserId(authHeader);
  const { id } = req.params;

  USER.findById(userId)
    .then(async (user) => {
      const product = await PRODUCT.findById(id);
      if (product) {
        if (user) {
          const cartItemIndex = user.cart.findIndex(
            (i) => i.productId == product.id
          );
          if (cartItemIndex == -1) {
            res.status(404).send({ message: "product not found in cart" });
          } else {
            user.cart.splice(cartItemIndex, 1);
            user.save();
            res
              .status(200)
              .send({ message: "Product removed from cart Successfully" });
          }
        } else {
          res.status(404).send({ message: "user not found" });
        }
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: "Bad request" });
    });
};

//controller to get all orders
export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await ORDER.find({});
  if (!orders) {
    res.status(404).send({ message: "Orders not found" });
  }
  res.status(200).send({ message: "Success", data: orders });
};

//controller to get orders of logged in user
export const getOrders = (req: Request, res: Response) => {
  const authHeader: string = req.headers["authorization"] as string;
  const userId = getUserId(authHeader);

  USER.findById(userId)
    .then(async (user) => {
      if (user) {
        res.status(200).send({ message: "Success", data: user.orders });
      } else {
        res.status(404).send({ message: "user not found" });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: "Bad request" });
    });
};

//controller to place order it will get user cart and create a order and it will empty the cart
//after success full order i will reduce the product units
export const placeOrder = (req: Request, res: Response) => {
  const authHeader: string = req.headers["authorization"] as string;
  const userId = getUserId(authHeader);

  USER.findById(userId)
    .then(async (user) => {
      if (user) {
        if (user.cart.length === 0) {
          return res.status(400).json({ message: "Cart is empty" });
        }
        for (let item of user.cart) {
          const product = await PRODUCT.findById(item.productId);
          if (!product) {
            return res
              .status(404)
              .json({ message: `Product with ID ${item.productId} not found` });
          }

          if (product.unitsAvailable < item.quantity) {
            return res.status(400).json({
              message: `Not enough units for product ${product.name}. Available: ${product.unitsAvailable}, Requested: ${item.quantity}`,
            });
          }

          // Deduct the units
          product.unitsAvailable -= item.quantity;
          await product.save();
        }
        const newOrder = await ORDER.create({ userId, products: user.cart });
        user.orders.push({ orderId: newOrder.id });
        user.cart = [];
        await user.save();
        res.status(200).send({ message: "Order Placed Successfully" });
      } else {
        res.status(404).send({ message: "user not found" });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: "Bad request" });
    });
};

//controller to Cancel order it will delete the order.
//after success full delete it will incresse the product units of each product
export const CancelOrder = (req: Request, res: Response) => {
  const authHeader: string = req.headers["authorization"] as string;
  const userId = getUserId(authHeader);
  const { id } = req.params;

  USER.findById(userId)
    .then(async (user) => {
      if (user) {
        const order = await ORDER.findByIdAndDelete(id);
        if (order) {
          const orderIndex = user.orders.findIndex(
            (i) => i.orderId == order.id
          );
          if (orderIndex == -1) {
            res.status(404).send({ message: "Order not found" });
          } else {
            user.orders.splice(orderIndex, 1);
            for (let item of order.products) {
              const product = await PRODUCT.findById(item.productId);
              if (product) {
                // add the units
                product.unitsAvailable += item.quantity;
                await product.save();
              }
            }
            await user.save();
            res.status(200).send({ message: "Order Cancelled Successfully" });
          }
        } else {
          res.status(404).send({ message: "Order not found" });
        }
      } else {
        res.status(404).send({ message: "user not found" });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: "Bad request" });
    });
};
