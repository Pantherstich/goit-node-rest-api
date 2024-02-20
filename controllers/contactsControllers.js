import HttpError from "../helpers/HttpError.js";
import checkId from "../helpers/checkId.js";
import Contact from "../models/contact.js";

export const getAllContacts = async (res, next) => {
  try {
    const { page = 1, limit = 10, favorite } = req.query;
    const { _id: owner } = req.user;
    const skip = (page - 1) * limit;

    let query = { owner };

    if (favorite !== undefined) {
      query.favorite = favorite === "true";
    }

    const allContacts = await Contact.countDocuments(query);

    const result = await Contact.find(query, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email");
    res.status(200).json({
      total: allContacts,
      perPage: limit,
      currentPage: page,
      contacts: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    checkId(id);
    const { _id: owner } = req.user;

    const result = await Contact.findById(id).where("owner").equals(owner);

    if (!result) throw HttpError(404, "Not found");

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    checkId(id);
    const { _id: owner } = req.user;

    const result = await Contact.findByIdAndDelete(id)
      .where("owner")
      .equals(owner);

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
    const { _id: owner } = req.user;

    if (Object.keys(updates).length === 0)
      throw HttpError(400, "Body must have at least one field");

    const result = await Contact.findByIdAndUpdate(id, updates, { new: true })
      .where("owner")
      .equals(owner);

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
    const { _id: owner } = req.user;

    const result = awaitContact
      .findByIdAndUpdate(id, updates, { new: true })
      .where("owner")
      .equals(owner);

    if (!result) throw HttpError(404, "Not found");

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
