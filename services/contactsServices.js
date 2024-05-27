import Contact from "../models/Contact.js";

export const listContacts = (search = {}) => {
  const { filter = {}, fields } = search;
  return Contact.find(filter, fields);
};

export const getContactById = (_id) => Contact.findById(_id);

export const removeContact = (_id) => Contact.findByIdAndDelete(_id);

export const addContact = (data) => Contact.create(data);

export const updateContactById = (id, data) =>
  Contact.findByIdAndUpdate(id, data);

export const toggleFavoriteByIdContact = (_id, favorite) =>
  Contact.findByIdAndUpdate(_id, favorite);
