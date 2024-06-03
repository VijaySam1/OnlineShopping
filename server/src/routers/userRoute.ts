import express, { Router } from "express";
import {
  loginSchema,
  registerSchema,
} from "../schema/validation-schema";
import { valError } from "../middleware/val-error";
import { authentication } from "../middleware/authn";
import { getUsers, login, register } from "../controllers/user";
const router: Router = express.Router();

// API routes related to User and authentication
router.route("/login").post(loginSchema, valError, login);

router.route("/register").post(registerSchema, valError, register);

router.route("/users").get(authentication, getUsers);

export default router;
