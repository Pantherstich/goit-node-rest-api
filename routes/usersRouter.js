import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  changeSubscriptionSchema,
  createUserSchema,
} from "../schemas/usersSchemas.js";
import {
  changeAvatar,
  changeSubscription,
  login,
  logout,
  refresh,
  register,
} from "../controllers/userControllers.js";
import authentication from "../helpers/autentification.js";

import uploader from "../helpers/uploader.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(createUserSchema), register);

usersRouter.post("/login", validateBody(createUserSchema), login);

usersRouter.post("/logout", authentication, logout);

usersRouter.post("/current", authentication, refresh);

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
