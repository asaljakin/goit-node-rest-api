import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import isEmptyBody from "../middlewares/isEmptyBody.js";
import validateBody from "../decorators/validateBody.js";
import {
  contactAddSchema,
  contactUpdateSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAllContacts);

contactsRouter.get("/:id", contactsControllers.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsControllers.createContact
);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsControllers.updateById
);

contactsRouter.delete("/:id", contactsControllers.deleteById);

export default contactsRouter;
