import express from "express";
import {
  changeSubscriptionSchema,
  createUserSchema,
  verificationEmailSchema,
} from "../schemas/usersSchemas.js";
import authentication from "../helpers/autentification.js";
import validateBody from "../helpers/validateBody.js";
import {
  changeAvatar,
  changeSubscription,
  login,
  logout,
  refresh,
  register,
  resendVerify,
  verifyUser,
} from "../controllers/userControllers.js";

import uploader from "../helpers/uploader.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(createUserSchema), register);

usersRouter.get("/verify/:verificationToken", verifyUser);

usersRouter.post(
  "/verify",
  validateBody(verificationEmailSchema),
  resendVerify
);

usersRouter.post("/login", validateBody(createUserSchema), login);

usersRouter.post("/logout", authentication, logout);

usersRouter.get("/current", authentication, refresh);

usersRouter.patch(
  "/",
  authentication,
  validateBody(changeSubscriptionSchema),
  changeSubscription
);

usersRouter.patch(
  "/avatars",
  authentication,
  uploader.single("avatarURL"),
  changeAvatar
);

export default usersRouter;
