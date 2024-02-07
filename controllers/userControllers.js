import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../db/user";
import "dotenv/config";
import HttpError from "../helpers/HttpError";

const { SECRET_KEY } = process.env;

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const inUse = await User.findOne({ email });
    if (inUse) throw HttpError(409, "Email in use");

    const { password, ...otherUserData } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      password: hashedPassword,
      ...otherUserData,
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
