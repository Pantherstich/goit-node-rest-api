import {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  changeContactService,
  updateStatusContactService,
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import checkId from "../helpers/checkId.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await listContactsService();
    res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    checkId(id);

    const result = await getContactByIdService(id);
    if (!result) throw HttpError(404, "Not found");

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const result = await addContactService(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    checkId(id);

    const result = await removeContactService(id);
    if (!result) throw HttpError(404, "Not found");

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    checkId(id);

    if (Object.keys(updates).length === 0)
      throw HttpError(400, "Body must have at least one field");

    const result = await changeContactService(id, updates);
    if (!result) throw HttpError(404, "Not found");

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateFavoriteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const result = await updateStatusContactService(id, updates);
    if (!result) throw HttpError(404, "Not found");

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
