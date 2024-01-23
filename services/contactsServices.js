import { nanoid } from "nanoid";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const contactsPath = join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  return contactById || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const putchContacts = contacts.filter(({ id }) => id !== contactId);
  await writeFile(contactsPath, JSON.stringify(putchContacts, null, 2));
  const contactById = await getContactById(contactId);
  return contactById;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const contacts = await listContacts();
  const putchContacts = [...contacts, newContact];
  await writeFile(contactsPath, JSON.stringify(putchContacts, null, 2));
  return newContact;
}

async function updateContactService(id, name, email, phone) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const updatedContact = contacts.find((contact) => contact.id === id);
  contacts[index] = { id, ...updatedContact, ...data };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactService,
};
