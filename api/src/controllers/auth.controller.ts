import { asyncHandler } from "../utils/asyncHandler";
import { loginUser, signupUser } from "../services/auth.service";

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await signupUser(name, email, password);
  res.status(201).json(result);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  res.status(200).json(result);
});
