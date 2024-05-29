import * as contactsServices from "../services/contactsServices.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const checkResult = (result, res) => {
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const filter = { owner };
  const fields = "-createdAt -updatedAt";
  const { page = 1, limit = 20, favorite = undefined } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  if (favorite !== undefined) {
    filter.favorite = favorite;
  }

  const result = await contactsServices.listContacts({
    filter,
    fields,
    settings,
  });
  res.json(result);
};

const getById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  filter = { _id, owner };
  const result = await contactsServices.getContactById(filter);
  checkResult(result, res);
};

const deleteById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  filter = { _id, owner };
  const result = await contactsServices.removeContact(filter);
  checkResult(result, res);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contactsServices.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  filter = { _id, owner };
  const result = await contactsServices.updateContactById(filter, req.body);
  checkResult(result, res);
};

const toggleFavoriteContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  filter = { _id, owner };
  const result = await contactsServices.toggleFavoriteByIdContact(
    filter,
    req.body
  );
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getById: ctrlWrapper(getById),
  createContact: ctrlWrapper(createContact),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  toggleFavoriteContact: ctrlWrapper(toggleFavoriteContact),
};
