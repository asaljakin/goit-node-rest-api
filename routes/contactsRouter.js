import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactToggleFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", isValidId, contactsControllers.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsControllers.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(contactToggleFavoriteSchema),
  contactsControllers.toggleFavoriteContact
);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteById);

export default contactsRouter;
