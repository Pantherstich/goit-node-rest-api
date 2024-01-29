// import Contact from "../db/contacts";

import Contact from "../db/contacts.js";

// const contactsPath = path.resolve("db/contacts.json");

export const listContactsService = async () => {
  const contacts = await Contact.find();
  console.log(contacts);
  return contacts;
};

export const getContactByIdService = async (contactId) => {
  const contactById = await Contact.findById(contactId);

  return contactById || null;
};

export const removeContactService = async (contactId) => {
  const contactById = await getContactByIdService(contactId);
  await Contact.findByIdAndDelete(contactId);

  return contactById;
};

export const addContactService = (data) => {
  const newContact = Contact.create(data);

  return newContact;
};

export const changeContactService = async (id, data) => {
  const changedContact = await Contact.findByIdAndUpdate(id, data, {
    new: true,
  });
  return changedContact || null;
};

export const updateStatusContactService = async (id, data) => {
  const updatedContact = await Contact.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedContact || null;
};
