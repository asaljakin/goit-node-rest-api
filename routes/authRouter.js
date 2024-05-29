import express from "express";
import authControllers from "../controllers/authControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";
import {
  userRegisterSchema,
  userLoginSchema,
  userSubscriptionSchema,
} from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();
authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userRegisterSchema),
  authControllers.register
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userLoginSchema),
  authControllers.login
);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.patch(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(userSubscriptionSchema),
  authControllers.updateSubscription
);

export default authRouter;
