import * as contactsServices from "../services/contactsServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const checkResult = (result, res) => {
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const getAllContacts = async (_, res) => {
  const result = await contactsServices.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.getContactById(id);
  checkResult(result, res);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.removeContact(id);
  checkResult(result, res);
};

const createContact = async (req, res) => {
  const result = await contactsServices.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsServices.updateContactById(id, req.body);
  checkResult(result, res);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  createContact: ctrlWrapper(createContact),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
