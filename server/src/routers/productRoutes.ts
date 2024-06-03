import express,{ Router } from "express";

import { authentication } from "../middleware/authn";
import { getProducts,addProduct, getProduct, deleteProduct, updateProduct, addToCart, getCart, removeFromCart, CancelOrder, getAllOrders, getOrders, placeOrder } from "../controllers/product";
const router:Router=express.Router();

//API routes related to products
router.route('/products')
.get(authentication,getProducts)
.post(authentication,addProduct)

router.route('/products/:id')
.get(authentication,getProduct)
.put(authentication,updateProduct)
.delete(authentication,deleteProduct)


//API routes related to cart
router.route('/products/:id/cart')
.post(authentication,addToCart)
.delete(authentication,removeFromCart)

router.route('/cart')
.get(authentication,getCart)


//API routes related to orders
router.route('/orders')
.get(authentication,getOrders)
.post(authentication,placeOrder)

router.route('/orders/:id')
.delete(authentication,CancelOrder)


router.route('/allorders')
.get(authentication,getAllOrders)


export default router;