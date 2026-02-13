import { RequestHandler } from "express";
import { AnyZodObject, ZodError } from "zod";
import { HttpError } from "../utils/HttpError";

export const validateBody = (schema: AnyZodObject): RequestHandler => (req, _res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return next(new HttpError(400, "Invalid request data", err.flatten()));
    }
    return next(err);
  }
};
