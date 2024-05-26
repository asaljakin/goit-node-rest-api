import Contact from "../models/Contact.js";

export const listContacts = (search = {}) => {
  const { filter = {}, fields } = search;
  return Contact.find(filter, fields);
};

export const getContactById = async (_id) => {
  const result = await Contact.findById(_id);
};

export const removeContact = async (_id) => Contact.findByIdAndDelete(_id);

export const addContact = (data) => Contact.create(data);

export const updateContactById = async (id, data) =>
  Contact.findByIdAndUpdate(id, data);

export const toggleFavoriteByIdContact = (_id, favorite) => {
  return Contact.findByIdAndUpdate(_id, favorite);
};
