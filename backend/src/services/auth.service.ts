import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { HttpError } from "../utils/HttpError";

// Centralized JWT signing so expiry and payload are consistent.
const signToken = (userId: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set");
  }

  return jwt.sign(
    { sub: userId },
    secret,
    {
      expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] ?? "7d"
    }
  );
};

export const signupUser = async (name: string, email: string, password: string) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new HttpError(409, "Email already in use");
  }
  const user = await User.create({ name, email, password });
  const token = signToken(user.id);
  return { token, user: { id: user.id, name: user.name, email: user.email } };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new HttpError(401, "Invalid email or password");
  }
  // Compare bcrypt hash for secure password verification.
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new HttpError(401, "Invalid email or password");
  }
  const token = signToken(user.id);
  return { token, user: { id: user.id, name: user.name, email: user.email } };
};
