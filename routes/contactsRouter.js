import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateFavoriteContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";

import checkId from "../helpers/checkId.js";
import {
  createContactSchema,
  updateFavoriteSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import authentication from "../helpers/autentification.js";

const contactsRouter = express.Router();
contactsRouter.use("/:id*", authentication, checkId());

contactsRouter.get("/", authentication, getAllContacts);

contactsRouter.get("/:id", authentication, getOneContact);

contactsRouter.delete("/:id", authentication, deleteContact);

contactsRouter.post(
  "/",
  authentication,
  validateBody(createContactSchema),
  createContact
);

contactsRouter.put(
  "/:id",
  authentication,
  validateBody(updateContactSchema),
  updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  authentication,
  validateBody(updateFavoriteSchema),
  updateFavoriteContact
);

export default contactsRouter;
