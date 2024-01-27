import Contact from "../db/contacts";

const contactsPath = path.resolve("db/contacts.json");

export const listContactsService = async () => {
  const contacts = await Contact.find();

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

export const updateStatusContactService = async (id, data) => {
  const updatedContact = await Contact.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedContact || null;
};
