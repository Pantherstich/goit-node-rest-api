import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db/contacts.json");

export const listContactsService = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

export const getContactByIdService = async (contactId) => {
  const contacts = await listContactsService();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;
};

export const removeContactService = async (contactId) => {
  const contactById = await getContactByIdService(contactId);

  const contacts = await listContactsService();

  const putchContacts = contacts.filter(({ id }) => id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(putchContacts, null, 2));
  return contactById;
};

export const addContactService = async (data) => {
  const id = nanoid();
  const newContact = { id, ...data };
  const contacts = await listContactsService();
  const putchContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(putchContacts, null, 2));
  return newContact;
};

export const updateContactService = async (id, data) => {
  const contacts = await listContactsService();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const updatedContact = contacts.find((contact) => contact.id === id);
  contacts[index] = { id, ...updatedContact, ...data };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};
