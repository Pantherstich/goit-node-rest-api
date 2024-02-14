import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import "dotenv/config";
import HttpError from "../helpers/HttpError.js";
import gravatar from "gravatar";
import path from "path";
import Jimp from "jimp";

const { SECRET_KEY } = process.env;

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const inUse = await User.findOne({ email });
    if (inUse) throw HttpError(409, "Email in use");

    const { password, ...otherUserData } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      password: hashedPassword,
      ...otherUserData,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { password, email } = req.body;

    const userEnter = await User.findOne({ email });
    if (!userEnter) throw HttpError(401, "Email or password is wrong");

    const passwordCompare = await bcrypt.compare(password, userEnter.password);

    if (!passwordCompare) throw HttpError(401, "Email or password is wrong");

    const payload = { id: userEnter._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(userEnter._id, { token });

    res.status(200).json({
      token,
      user: {
        email: userEnter.email,
        subscription: userEnter.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res) => {
  try {
    const { email, subscription } = req.user;
    res.status(200).json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

export const changeSubscription = async (req, res) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    await User.findByIdAndUpdate(_id, { subscription: subscription });

    res.status(200).json({ subscription, message: "Subscription changed" });
  } catch (error) {
    next(error);
  }
};

export const changeAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;

    if (!req.file) throw HttpError(400, "Avatar is required. Please, attach");

    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.resolve("public", "avatars", filename);
    const avatar = await Jimp.read(tempUpload);
    avatar.cover(250, 250).write(resultUpload);

    await fs.unlink(tempUpload);

    await User.findByIdAndUpdate(_id, { avatarURL: resultUpload });

    res.status(200).json({ avatarURL: resultUpload });
  } catch (error) {
    next(error);
  }
};
